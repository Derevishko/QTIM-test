import { HttpException, HttpStatus } from '@nestjs/common';

import { CodeException, MessageException } from '../enums/exception.enum';

export class TokenNotProvidedException extends HttpException {
  readonly errorCode: CodeException;

  constructor() {
    super(MessageException.TOKEN_NOT_PROVIDED, HttpStatus.UNAUTHORIZED);

    this.errorCode = CodeException.TOKEN_NOT_PROVIDED;
  }
}
