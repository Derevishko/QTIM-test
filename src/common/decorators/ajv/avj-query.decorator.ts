import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AjvQuery = createParamDecorator(
  (_schema: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ query: unknown }>();

    return request.query;
  },
);
