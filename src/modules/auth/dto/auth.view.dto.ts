import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthViewDto {
  @ApiProperty()
  @Expose()
  refresh: string;

  @ApiProperty()
  @Expose()
  access: string;
}
