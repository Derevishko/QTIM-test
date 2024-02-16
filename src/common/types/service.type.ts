export type QueryType<T extends object> = Partial<T>;
export type CreateType<T extends object> = Partial<T>;
export type UpdateType<T extends object> = Partial<T>;

export type QueryCtx<T extends object> = {
  limit?: number;
  page?: number;
  sort?: SortType<T>;
  user: IdObject;
};

export type Sort = 'ASC' | 'DESC';
export type SortType<T extends object> = Partial<Record<keyof T, Sort>>;

export type OptionsType<T extends object> = {
  query: QueryType<T>;
} & Omit<QueryCtx<T>, 'user'>;
