import CarModel from '../../src/cars/car.model';
import UserModel from '../../src/user/user.model';

export const car1 = {
  manufacturer: 'AUDI',
  globalPrice: 250,
  ageLimit: 18,
  highRisk: false,
  universalPercentage: 0.03
};

export const car2 = {
  manufacturer: 'BMW',
  globalPrice: 150,
  ageLimit: 18,
  highRisk: false,
  universalPercentage: 0.04
};

export const car3 = {
  manufacturer: 'PORSCHE',
  globalPrice: 500,
  ageLimit: 25,
  highRisk: true,
  universalPercentage: 0.07
};

// Initialize db with 1 user and 3 cars
export const setupDB = async () => {
  await UserModel.deleteMany();
  await CarModel.deleteMany();

  await new UserModel({
    username: 'Qover',
    password: 'Ninja'
  }).save();

  await new CarModel(car1).save();
  await new CarModel(car2).save();
  await new CarModel(car3).save();
};
