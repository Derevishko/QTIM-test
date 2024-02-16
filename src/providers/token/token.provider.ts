import { Provider } from '@nestjs/common';

import { TokenService } from './service';
import { TokenInject } from './token.enum';

export const TokenServiceProvider: Provider = {
  provide: TokenInject.SERVICE,
  useClass: TokenService,
};
