import { IsString, IsNumber } from 'class-validator';

export class CarOfferInputDto {
    @IsNumber()
    age: number;

    @IsNumber()
    price: number;

    @IsString()
    carId: string;

    constructor (
      age: number,
      price: number,
      carId: string
    ) {
      this.age = age;
      this.price = price;
      this.carId = carId;
    }
}
