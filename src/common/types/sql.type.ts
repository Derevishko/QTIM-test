import { TableUniqueOptions } from 'typeorm';

export type DbClient = 'postgres';

export type UniqueOptions = Required<
  Pick<TableUniqueOptions, 'name' | 'columnNames'>
> &
  Partial<Omit<TableUniqueOptions, 'name' | 'columnNames'>>;
