import { logger } from '../logger';
import { Request, Response } from 'express';
import { checkAgeLimitAndFetchCar, createCar, getCars } from './car.service';
import { CarCreateDto } from './dto/input/car.create.dto';
import { CarOfferInputDto } from './dto/input/car.offer.input.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import config from './../../config/config';

export async function createCarHandler (req: Request, res: Response) {
  try {
    // validate input parameters
    const carDto: CarCreateDto = plainToInstance(CarCreateDto, req.body as object);
    await validateOrReject(carDto);

    const car = await createCar(carDto.manufacturer, carDto.ageLimit, carDto.globalPrice, carDto.universalPercentage);
    return res.send(car);
  } catch (e: any) {
    logger.error(`carController::createCarHandler - error while creating car: ${e}`);
    return res.status(400).send(e);
  }
}

export async function getCarsHandler (req: Request, res: Response) {
  try {
    const cars = await getCars();
    return res.send(cars);
  } catch (e: any) {
    logger.error(`carController::createCarHandler - error while creating car: ${e}`);
    return res.status(400).send(e);
  }
}

export async function getCarOfferHandler (req: Request, res: Response) {
  try {
    // validate input parameters
    const carOfferDto: CarOfferInputDto = plainToInstance(CarOfferInputDto, req.body as object);
    await validateOrReject(carOfferDto);

    // check is the car price bellow car offer limit
    if (carOfferDto.price < config.carOfferMinLimit) {
      return res.status(400).send({ message: 'Sorry! The price of the car is too low' });
    }
    // checkAgeLimitAndFetchCarDetails
    const car = await checkAgeLimitAndFetchCar(carOfferDto.carId, carOfferDto.age);
    if (!car) {
      return res.status(400).send({ message: 'Sorry! The driver is too young' });
    }
    // computePrice(car)

    // return offer

    // const car = await createCar(carDto.manufacturer, carDto.ageLimit, carDto.globalPrice, carDto.universalPercentage);
    // return res.send(car);
    // const userToReturn = new UserLoginOutputDto(accessToken, new UserDto(user.username, user.createdAt, user.updatedAt));
    // return res.send(userToReturn);
  } catch (e: any) {
    logger.error(`carController::getCarOfferHandler - error while creating car: ${e}`);
    return res.status(400).send(e);
  }
}
