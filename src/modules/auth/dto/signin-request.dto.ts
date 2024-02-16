import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { FullUser } from '@modules/user';

export class SignInRequestDto
  implements Required<Pick<FullUser, 'email' | 'password'>>
{
  @ApiPropertyOptional()
  email!: string;

  @ApiProperty()
  password!: string;
}
