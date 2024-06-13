import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignInUserDto {
  @IsEmail()
  @ApiProperty()
  @Expose()
  email: string;

  @IsString()
  @ApiProperty()
  @Expose()
  @Length(8, 100)
  password: string;
}
