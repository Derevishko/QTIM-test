import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AjvParams = createParamDecorator(
  (_schema: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ params: unknown }>();

    return request.params;
  },
);
