import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TgwDto {
  @ApiProperty()
  @Expose()
  @IsString()
  initDataRaw: string;
}
