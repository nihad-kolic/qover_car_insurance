import { logger } from '../logger';
import { Request, Response } from 'express';
import {
  calculateUniversalPrice,
  checkAgeLimit,
  createCar,
  getCar,
  getCars
} from './car.service';
import { CarCreateDto } from './dto/car.create.dto';
import { CarOfferInputDto } from './dto/car.offer.input.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import config from './../../config/config';
import { CarDocument } from './car.model';

export async function createCarHandler (req: Request, res: Response) {
  try {
    // validate input parameters
    const carDto: CarCreateDto = plainToInstance(CarCreateDto, req.body as object);
    await validateOrReject(carDto);

    const car: CarDocument = await createCar(carDto.manufacturer, carDto.ageLimit, carDto.highRisk, carDto.globalPrice, carDto.universalPercentage);
    return res.send(car);
  } catch (e) {
    logger.error(`carController::createCarHandler - error while creating car: ${e}`);
    return res.status(400).send(e);
  }
}

export async function getCarsHandler (req: Request, res: Response) {
  try {
    // TODO add pagination
    const cars: CarDocument[] = await getCars();
    return res.send(cars);
  } catch (e) {
    logger.error(`carController::createCarHandler - error while creating car: ${e}`);
    return res.status(400).send(e);
  }
}

export async function getCarOfferHandler (req: Request, res: Response) {
  try {
    // validate input parameters
    const carOfferInputDto: CarOfferInputDto = plainToInstance(CarOfferInputDto, {
      carId: req.params.carId,
      age: Number(req.query.age),
      price: Number(req.query.price)
    });
    await validateOrReject(carOfferInputDto, {
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true
    });

    // check is the car car bellow car offer limit
    if (carOfferInputDto.price < config.carOfferMinLimit) {
      return res.status(400).send({ message: 'Sorry! The price of the car is too low' });
    }
    // fetch car details
    const car: CarDocument | null = await getCar(carOfferInputDto.carId);
    if (!car) {
      return res.status(400).send({ message: 'Sorry! Requested car does not exist' });
    }

    // check age limit
    const ageLimitation = await checkAgeLimit(carOfferInputDto.age, car.ageLimit);
    if (!ageLimitation) {
      const carAgeLimitMessage = car.highRisk ? config.carTooHighRiskMessage : config.carAgeLimitMessage;
      return res.status(400).send({ message: carAgeLimitMessage });
    }
    // calculate universal car
    const universalPrice: number = calculateUniversalPrice(car.globalPrice, car.universalPercentage, carOfferInputDto.price);

    // return offer
    return res.send({ globalPrice: car.globalPrice.toFixed(2), universalPrice: universalPrice.toFixed(2) });
  } catch (e) {
    logger.error(`carController::getCarOfferHandler - error while creating car: ${e}`);
    return res.status(400).send(e);
  }
}
