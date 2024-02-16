import { HttpException, HttpStatus } from '@nestjs/common';

import { CodeException, MessageException } from '@common/enums';

export class TokenVerifyException extends HttpException {
  readonly errorCode: CodeException;

  constructor() {
    super(MessageException.TOKEN_VERIFY, HttpStatus.UNAUTHORIZED);

    this.errorCode = CodeException.TOKEN_VERIFY;
  }
}
