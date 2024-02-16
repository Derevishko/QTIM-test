import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { RepositoryCore } from '@core/repository.core';

import { UserEntity } from '../entity';
import { IUserRepository } from '../interface';

@Injectable()
export class UserRepository
  extends RepositoryCore<UserEntity>
  implements IUserRepository
{
  constructor(protected readonly dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}
