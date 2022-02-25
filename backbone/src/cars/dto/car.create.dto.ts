import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CarCreateDto {
    @IsString()
    manufacturer: string;

    @IsNumber()
    ageLimit: number;

    @IsBoolean()
    highRisk: boolean;

    @IsNumber()
    globalPrice: number;

    @IsNumber()
    universalPercentage: number;

    constructor (
      manufacturer: string,
      ageLimit: number,
      highRisk: boolean,
      globalPrice: number,
      universalPercentage: number
    ) {
      this.manufacturer = manufacturer;
      this.ageLimit = ageLimit;
      this.highRisk = highRisk;
      this.globalPrice = globalPrice;
      this.universalPercentage = universalPercentage;
    }
}
