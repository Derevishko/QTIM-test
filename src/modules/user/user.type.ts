import { OptionsType, QueryCtx, QueryType } from '@common/types';

import { IUser } from './interface';

export type User = IUser;
export type FullUser = IdObject & User & DateInfo;
export type CreateUser = User;
export type UpdateUser = CreateUser;
export type UserQuery = QueryType<FullUser>;
export type UserOptions = OptionsType<FullUser>;
export type UserCtx = QueryCtx<FullUser>;
