import { DecoderOptions, SignerOptions, VerifierOptions } from 'fast-jwt';

import { Token } from '@common/types';

export interface ITokenService {
  decodeJwt<T>(token: string, options?: Partial<DecoderOptions>): T;
  signJwt<T>(
    payload: T,
    secret: string,
    options?: Partial<SignerOptions>,
  ): Promise<Token>;
  verifyJwt<T>(
    token: string,
    secret: string,
    options?: Partial<VerifierOptions>,
  ): Promise<T>;
}
