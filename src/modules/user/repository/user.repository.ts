import { DataSource } from 'typeorm';

import { RepositoryCore } from '@core/repository.core';

import { UserEntity } from '../entity';

export class UserRepository extends RepositoryCore<UserEntity> {
  constructor(protected readonly dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}
