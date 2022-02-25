import carModel, { CarDocument } from '../cars/car.model';
import mongoose from 'mongoose';

export async function createCar (manufacturer: string, ageLimit: number, highRisk: boolean, globalPrice: number, universalPercentage: number) {
  return await carModel.create({ manufacturer, ageLimit, highRisk, globalPrice, universalPercentage });
}

export async function getCars (): Promise<CarDocument[]> {
  return carModel.find({}).lean();
}

export async function getCar (carId: string): Promise<CarDocument | null> {
  const car = await carModel.findOne({ _id: new mongoose.Types.ObjectId(carId) }).lean();
  if (!car) {
    return null;
  } else {
    return car;
  }
}

export async function checkAgeLimit (age: number, ageLimit: number) {
  if (age < ageLimit) {
    return false;
  } else {
    return true;
  }
}

export function calculateUniversalPrice (globalPrice: number, universalPercentage: number, price: number) {
  let universalPrice = price * universalPercentage;
  universalPrice += globalPrice;
  return universalPrice;
}
