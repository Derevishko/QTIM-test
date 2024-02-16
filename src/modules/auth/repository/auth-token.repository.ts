import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { RepositoryCore } from '@core/repository.core';

import { AuthTokenEntity } from '../entity';
import { IAuthTokenRepository } from '../interface';

@Injectable()
export class AuthTokenRepository
  extends RepositoryCore<AuthTokenEntity>
  implements IAuthTokenRepository
{
  constructor(protected readonly dataSource: DataSource) {
    super(AuthTokenEntity, dataSource);
  }
}
