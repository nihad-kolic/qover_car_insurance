import { IsString, IsDate } from 'class-validator';

export class UserDto {
    @IsString()
    username: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updateAt: Date;

    constructor (
      username: string,
      createdAt: Date,
      updateAt: Date
    ) {
      this.username = username;
      this.createdAt = createdAt;
      this.updateAt = updateAt;
    }
}
