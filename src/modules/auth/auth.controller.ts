import { Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AjvBody, Dto } from '@common/decorators';
import { ControllerCore } from '@core/controller.core';
import { CreateUserDto } from '@modules/user/dto';

import { AuthInject } from './auth.enum';
import { authSchema } from './auth.schema';
import {
  AuthPayloadDto,
  RefreshTokenRequestDto,
  SignInRequestDto,
} from './dto';
import { IAuthService } from './interface';

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends ControllerCore {
  constructor(
    @Inject(AuthInject.SERVICE) private readonly service: IAuthService,
  ) {
    super();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Dto(AuthPayloadDto)
  @ApiResponse({ type: () => AuthPayloadDto })
  @ApiOperation({ summary: 'Refresh auth tokens' })
  @ApiBody({ type: RefreshTokenRequestDto, required: false })
  async refreshToken(
    @AjvBody(authSchema.refreshToken())
    { refreshToken }: RefreshTokenRequestDto,
  ) {
    const data = await this.service.refreshTokens({ refreshToken });

    return { data };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @Dto(AuthPayloadDto)
  @ApiResponse({ type: () => AuthPayloadDto })
  @ApiOperation({
    summary: 'Logs user into the system by email and password',
    description: 'Required email.',
  })
  @ApiBody({ type: SignInRequestDto })
  async signin(@AjvBody(authSchema.signin()) body: SignInRequestDto) {
    const data = await this.service.signin(body);

    return { data };
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create new customer' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse()
  async signup(@AjvBody(authSchema.signup()) body: CreateUserDto) {
    await this.service.signup(body);
  }
}
