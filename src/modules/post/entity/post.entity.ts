import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DB_TABLE_POST } from '@common/constants';
import { BaseCreatedByEntity } from '@common/entity';
import type { FullUser } from '@modules/user';
import { UserEntity } from '@modules/user/entity';

import { FullPost } from '../post.type';

@Entity({ name: DB_TABLE_POST })
export class PostEntity
  extends BaseCreatedByEntity<FullPost>
  implements FullPost
{
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'createdById' })
  author!: FullUser;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar' })
  title!: string;
}
