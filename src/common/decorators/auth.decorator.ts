import { UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { DecoratorUtil } from '@utils/decorator.util';

import { AuthGuard, OptionalAuthGuard } from '../guards';

export const Auth = (optional?: boolean) => {
  const decorators = [
    ApiBearerAuth(),
    ApiCookieAuth(),
    ApiUnauthorizedResponse(),
  ];

  const authGuard = optional ? OptionalAuthGuard : AuthGuard;

  decorators.push(UseGuards(authGuard));

  return DecoratorUtil.apply(...decorators);
};
