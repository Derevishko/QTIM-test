import { Global, Module } from '@nestjs/common';

import { TokenServiceProvider } from './token.provider';

@Global()
@Module({
  providers: [TokenServiceProvider],
  exports: [TokenServiceProvider],
})
export class TokenModule {}
