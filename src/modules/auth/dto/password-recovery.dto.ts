import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class PasswordRecoveryDto {
  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;
}
