import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SoundQueryDto {
  @IsString()
  @ApiProperty()
  @Expose()
  from: string;

  @IsString()
  @Length(1, 500)
  @ApiProperty()
  @Expose()
  text: string;
}
