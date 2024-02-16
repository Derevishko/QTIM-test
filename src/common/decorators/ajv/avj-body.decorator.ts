import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AjvBody = createParamDecorator(
  (_schema: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ body: unknown }>();

    return request.body;
  },
);
