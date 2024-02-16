import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { TokenType } from '@common/enums';

@Exclude()
export class TokensDto {
  @Expose()
  @ApiProperty()
  accessToken!: string;

  @Expose()
  @ApiProperty()
  refreshToken!: string;

  @Expose()
  @ApiProperty()
  type!: TokenType;
}
