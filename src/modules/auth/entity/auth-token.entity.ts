import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { DB_TABLE_AUTH_TOKEN, IDX_TOKEN } from '@common/constants';
import { BaseEntity } from '@common/entity';
import { StringTransformer } from '@db/transformer';
import type { FullUser } from '@modules/user';

import { IAuthToken } from '../interface';

@Entity({ name: DB_TABLE_AUTH_TOKEN })
@Index(IDX_TOKEN)
export class AuthTokenEntity
  extends BaseEntity<IAuthToken>
  implements IAuthToken
{
  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer(),
  })
  browser?: string | null;

  @Column('timestamptz')
  expiredAt!: Date;

  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer(),
  })
  ip?: string | null;

  @Column('boolean', { default: false })
  isRevoked? = false;

  @Column('varchar')
  jti!: string;

  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer(),
  })
  os?: string | null;

  @ManyToOne('UserEntity', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: FullUser;

  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer(),
  })
  userAgent?: string | null;

  @Column('int')
  userId!: number;
}
