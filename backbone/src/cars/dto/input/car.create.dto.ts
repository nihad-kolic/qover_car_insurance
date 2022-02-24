import { IsString, IsNumber } from 'class-validator';

export class CarCreateDto {
    @IsString()
    manufacturer: string;

    @IsNumber()
    ageLimit: number;

    @IsNumber()
    globalPrice: number;

    @IsNumber()
    universalPercentage: number;

    constructor (
      manufacturer: string,
      ageLimit: number,
      globalPrice: number,
      universalPercentage: number
    ) {
      this.manufacturer = manufacturer;
      this.ageLimit = ageLimit;
      this.globalPrice = globalPrice;
      this.universalPercentage = universalPercentage;
    }
}
