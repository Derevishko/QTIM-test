import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserPayloadDto {
  @Expose()
  @ApiProperty()
  email!: string;

  @Expose()
  @ApiProperty()
  id!: Id;
}
