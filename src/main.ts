import { ConfigType } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ResponseToDtoInterceptor } from '@common/interceptors';
import { AjvValidationPipe } from '@common/pipes';
import { AppConfig } from '@configs/app.config';

import { AppModule } from './app.module';
import { SwaggerUtil } from './utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const appConfig: ConfigType<typeof AppConfig> = app.get(AppConfig.KEY);

  app.useGlobalPipes(new AjvValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.useBodyParser('urlencoded', { extended: true });
  app.enableCors({
    maxAge: 3600,
    credentials: true,
    origin: new RegExp(appConfig.domain),
  });
  app.useGlobalInterceptors(new ResponseToDtoInterceptor(app.get(Reflector)));

  SwaggerUtil.setup(app);

  await app.listen(appConfig.port);
}

void bootstrap();
