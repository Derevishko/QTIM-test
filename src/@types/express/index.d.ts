type UserPayload = {
  userId: Id;
};

type JwtPayload = {
  jti: string;
  sub: Id;
  typ: string;
} & UserPayload;

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
