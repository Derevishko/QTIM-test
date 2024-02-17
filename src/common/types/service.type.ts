import { SortBy } from '@common/enums';

export type QueryType<T extends object> = Partial<T>;
export type CreateType<T extends object> = Partial<T>;
export type UpdateType<T extends object> = Partial<T>;

export type QueryCtx<T extends object> = {
  limit?: number;
  page?: number;
  sort?: SortType<T>;
  user?: UserPayload;
};

export type SortType<T extends object> = Partial<Record<keyof T, SortBy>>;

export type OptionsType<T extends object = object> = {
  query: QueryType<T>;
} & Omit<QueryCtx<T>, 'user'>;

export type RangeFilter<T> = {
  max?: T;
  min?: T;
};
