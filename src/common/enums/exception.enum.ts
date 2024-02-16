export enum MessageException {
  EXTERNAL = 'External service error',
  OK = 'Ok',
  REFRESH_TOKEN_EXPIRED = 'Refresh token expired',
  REFRESH_TOKEN_VERIFY = 'Refresh token verify error',
  TOKEN_EXPIRED = 'Token expired',
  TOKEN_MALFORMED = 'Trying get data from token. Something wrong',
  TOKEN_NOT_PROVIDED = 'Token not provided',
  TOKEN_VERIFY = 'Token verify error',
}

export enum CodeException {
  EXTERNAL = 'EXTERNAL',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  OK = 'OK',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  REFRESH_TOKEN_VERIFY = 'REFRESH_TOKEN_VERIFY',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_MALFORMED = 'TOKEN_MALFORMED',
  TOKEN_NOT_PROVIDED = 'TOKEN_NOT_PROVIDED',
  TOKEN_VERIFY = 'TOKEN_VERIFY',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
}
