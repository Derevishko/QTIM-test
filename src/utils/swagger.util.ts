import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as pkg from '../../package.json';

export class SwaggerUtil {
  static setup(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('Training - OpenAPI 3.0')
      .setDescription('Training API')
      .setVersion(pkg.version)
      .addCookieAuth('accessToken')
      .addBearerAuth()
      .addTag('User', 'Operations about user')
      // TODO: add contacts
      // .setContact('Training', 'https://training.com', 'info@training.com')
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api/docs', app, document);
  }
}
