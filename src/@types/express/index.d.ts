type UserPayload = {
  userId: MongoId;
};

type JwtPayload = {
  jti: string;
  sub: Id;
  typ: string;
};

type PaginationCtx = {
  limit: number;
  offset: number;
  page: number;
};

declare namespace Express {
  export interface Request {
    file?: FileCtx;
    user: UserPayload;
  }
}
