import { Column, Entity } from 'typeorm';

import { DB_TABLE_USER } from '@common/constants';
import { BaseEntity } from '@common/entity';

import { FullUser } from '../user.type';

@Entity({ name: DB_TABLE_USER })
export class UserEntity extends BaseEntity implements FullUser {
  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;
}
