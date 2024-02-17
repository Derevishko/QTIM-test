type Id = number;
type IdObject = { id: Id };
type DateInfo = { createdAt: Date; updatedAt: Date };
type DateCtx = string | number | Date;

type QueryPayload<T = any> = Partial<{
  [key: string]: T;
  search: string;
}>;
