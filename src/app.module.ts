import { Module } from '@nestjs/common';

import { ConfigModule } from './configs';

@Module({
  imports: [ConfigModule],
})
export class AppModule {}
