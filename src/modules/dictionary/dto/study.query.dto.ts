import {
  IsOptional,
  IsInt,
  ArrayMinSize,
  ArrayMaxSize,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class StudyQueryDto {
  @IsInt({ each: true })
  @IsOptional()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @Transform((value) => {
    if (value.value) {
      if (Array.isArray(value.value)) {
        return value.value.map((val) => +val);
      } else {
        return [+value.value];
      }
    }
  })
  @ApiProperty({ type: Number, isArray: true, required: false })
  @Expose()
  tags?: number[];

  @IsString()
  @ApiProperty()
  @Expose()
  from: string;

  @IsString()
  @ApiProperty()
  @Expose()
  to: string;
}
