import { CreateUser, FullUser, UserCtx, UserQuery } from '../user.type';

export interface IUserService {
  create(body: CreateUser, ctx?: UserCtx): Promise<FullUser>;
  delete(query: UserQuery, ctx?: UserCtx): Promise<void>;
  getCount(query: UserQuery, ctx?: UserCtx): Promise<number>;
  getList(options: UserQuery, ctx?: UserCtx): Promise<FullUser[]>;
  getListAndCount(
    options: UserQuery,
    ctx?: UserCtx,
  ): Promise<[FullUser[], number]>;
  getOne(query: UserQuery, ctx?: UserCtx): Promise<FullUser | null>;
  getOneWithException(query: UserQuery, ctx?: UserCtx): Promise<FullUser>;
  update(query: UserQuery, body: CreateUser, ctx?: UserCtx): Promise<FullUser>;
}
