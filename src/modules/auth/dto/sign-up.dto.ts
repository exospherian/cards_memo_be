import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignUpUserDto {
  @IsEmail()
  @ApiProperty()
  @Expose()
  email: string;

  @IsString()
  @Length(3, 200)
  @ApiProperty()
  @Expose()
  nickname: string;

  @IsString()
  @ApiProperty()
  @Expose()
  @Length(8, 100)
  password: string;

  @IsString()
  @ApiProperty()
  @Expose()
  lang: string;
}
