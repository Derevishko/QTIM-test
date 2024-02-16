import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { BaseDto } from '@common/dto';

@Exclude()
export class PostDto extends BaseDto {
  @ApiProperty()
  @Expose()
  description!: string;

  @ApiProperty()
  @Expose()
  title!: string;
}
