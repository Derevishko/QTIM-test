import {
  DecoderOptions,
  SignerOptions,
  TokenError,
  createDecoder,
  createSigner,
  createVerifier,
} from 'fast-jwt';

import {
  TokenExpiredException,
  TokenVerifyException,
} from '@common/exceptions';
import { ServiceCore } from '@core/service.core';
import { DateUtil } from '@utils/date.util';

import { ITokenService } from '../interface';

export class TokenService extends ServiceCore implements ITokenService {
  decodeJwt<T>(token: string, options?: Partial<DecoderOptions>): T {
    return createDecoder(options)(token) as T;
  }

  async signJwt<T>(
    payload: T,
    secret: string,
    options?: Partial<SignerOptions>,
  ): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/require-await
    const sign = createSigner({ ...options, key: async () => secret });

    try {
      return await sign({ ...payload, iat: DateUtil.toUnix() });
    } catch {
      throw new TokenVerifyException();
    }
  }

  async verifyJwt<T>(token: string, secret: string): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/require-await
    const verify = createVerifier({ key: async () => secret });

    try {
      return (await verify(token)) as T;
    } catch (err) {
      if (err && err?.code === TokenError.codes.expired) {
        throw new TokenExpiredException();
      }

      throw new TokenVerifyException();
    }
  }
}
