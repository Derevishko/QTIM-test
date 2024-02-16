import { HttpException, HttpStatus } from '@nestjs/common';

import { CodeException, MessageException } from '../enums/exception.enum';

export class TokenExpiredException extends HttpException {
  readonly errorCode: CodeException;

  constructor() {
    super(MessageException.TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);

    this.errorCode = CodeException.TOKEN_EXPIRED;
  }
}
