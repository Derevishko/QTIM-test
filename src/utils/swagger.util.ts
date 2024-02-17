import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as pkg from '../../package.json';

export class SwaggerUtil {
  static setup(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('QTIM - OpenAPI 1.0')
      .setDescription('QTIM API')
      .setVersion(pkg.version)
      .addCookieAuth('accessToken')
      .addBearerAuth()
      .addTag('User', 'Operations about user')
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api/docs', app, document);
  }
}
