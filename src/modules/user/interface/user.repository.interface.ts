import { SqlContext } from '@common/types';

import { CreateUser, FullUser, UserOptions, UserQuery } from '../user.type';

export interface IUserRepository {
  create(body: CreateUser, ctx?: SqlContext): Promise<FullUser>;
  delete(query: UserQuery, ctx?: SqlContext): Promise<void>;
  getCount(query: UserQuery, ctx?: SqlContext): Promise<number>;
  getList(options: UserOptions, ctx?: SqlContext): Promise<FullUser[]>;
  getListAndCount(
    options: UserOptions,
    ctx?: SqlContext,
  ): Promise<Promise<[FullUser[], number]>>;
  getOne(query: UserQuery, ctx?: SqlContext): Promise<FullUser | null>;
  getOneWithException(query: UserQuery, ctx?: SqlContext): Promise<FullUser>;
  update(
    query: UserQuery,
    body: CreateUser,
    ctx?: SqlContext,
  ): Promise<FullUser>;
}
