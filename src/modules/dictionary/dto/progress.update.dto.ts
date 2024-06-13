import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProgressDto {
  @IsUUID('4', { each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty()
  @Expose()
  up: string[];

  @IsUUID('4', { each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty()
  @Expose()
  down: string[];
}
