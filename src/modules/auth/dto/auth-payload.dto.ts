import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { TokensDto } from './tokens.dto';
import { UserPayloadDto } from './user-payload.dto';

@Exclude()
export class AuthPayloadDto {
  @Expose()
  @ApiProperty({ type: () => TokensDto })
  tokens!: TokensDto;

  @Expose()
  @ApiProperty({ type: () => UserPayloadDto })
  user!: UserPayloadDto;
}
