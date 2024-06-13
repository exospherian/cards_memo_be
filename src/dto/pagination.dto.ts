import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, Min, Max } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  @Expose()
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @ApiProperty()
  @Expose()
  @IsInt()
  @Min(1)
  page: number;
}

export class ResponseWithPaginationViewDto {
  @ApiProperty()
  @Expose()
  page: number;

  @ApiProperty()
  @Expose()
  limit: number;

  @ApiProperty()
  @Expose()
  totalItems: number;
}
