import { FullUser } from '../user.type';

export interface IUserValidator {
  validateCredentials(
    user?: Partial<FullUser> | null,
    password?: string,
  ): Promise<void>;
}
