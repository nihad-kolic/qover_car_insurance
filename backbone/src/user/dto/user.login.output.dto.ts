import { IsObject, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class UserLoginOutputDto {
    @IsString()
    accessToken: string;

    @IsObject()
    user: UserDto;

    constructor (
      accessToken: string,
      user: UserDto
    ) {
      this.accessToken = accessToken;
      this.user = user;
    }
}
