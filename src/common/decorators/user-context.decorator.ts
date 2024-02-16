import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { Request as RequestType } from 'express';

export const UserContext = createParamDecorator<
  unknown,
  ExecutionContext,
  UserPayload
>((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<RequestType>();

  return req?.user;
});
