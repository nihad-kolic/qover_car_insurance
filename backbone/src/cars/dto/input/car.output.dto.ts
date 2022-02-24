import { IsString, IsNumber } from 'class-validator';

export class CarOutputDto {
    @IsString()
    _id: string;

    @IsString()
    manufacturer: string;

    @IsNumber()
    ageLimit: number;

    @IsNumber()
    globalPrice: number;

    @IsNumber()
    universalPercentage: number;

    constructor (
      _id: string,
      manufacturer: string,
      ageLimit: number,
      globalPrice: number,
      universalPercentage: number
    ) {
      this._id = _id;
      this.manufacturer = manufacturer;
      this.ageLimit = ageLimit;
      this.globalPrice = globalPrice;
      this.universalPercentage = universalPercentage;
    }
}
