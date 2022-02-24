import carModel from '../cars/car.model';

export async function createCar (manufacturer: string, ageLimit: number, globalPrice: number, universalPercentage: number) {
  return await carModel.create({ manufacturer, ageLimit, globalPrice, universalPercentage });
}

export async function getCars () {
  return await carModel.find({});
}

export async function checkAgeLimitAndFetchCar (carId: string, age: number) {
  const car = await carModel.findOne({ _id: carId });
}
