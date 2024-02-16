import { HttpException, HttpStatus } from '@nestjs/common';

import { CodeException, MessageException } from '../enums/exception.enum';

export class TokenMalformedException extends HttpException {
  readonly errorCode: CodeException;

  constructor() {
    super(MessageException.TOKEN_MALFORMED, HttpStatus.UNAUTHORIZED);

    this.errorCode = CodeException.TOKEN_MALFORMED;
  }
}
