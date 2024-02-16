import { HttpException, HttpStatus } from '@nestjs/common';

import { CodeException, MessageException } from '../enums/exception.enum';

export class RefreshTokenExpiredException extends HttpException {
  readonly errorCode: CodeException;

  constructor() {
    super(MessageException.REFRESH_TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);

    this.errorCode = CodeException.REFRESH_TOKEN_EXPIRED;
  }
}
