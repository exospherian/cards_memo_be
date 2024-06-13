import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SettingsUpdateDto {
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  @Expose()
  defaultFrom: string;

  @IsString()
  @Length(0, 500)
  @ApiProperty()
  @Expose()
  defaultTo: string;
}
