import { UnprocessableEntityException } from '@nestjs/common';

import { ServiceCore } from '@core/service.core';
import { HashUtil } from '@utils/hash.util';

import { IUserValidator } from '../interface';
import { FullUser } from '../user.type';

export class UserValidator extends ServiceCore implements IUserValidator {
  async validateCredentials(
    user?: Partial<FullUser> | null,
    password?: string,
  ) {
    const isValid = await HashUtil.comparePasswords(password, user?.password);

    if (!isValid) {
      throw new UnprocessableEntityException({
        key: 'invalidCredentials',
        value: 'Invalid email or password.',
      });
    }
  }
}
