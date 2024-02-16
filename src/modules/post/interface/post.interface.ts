import type { FullUser } from '@modules/user';

export interface IPost {
  author: FullUser;
  description: string;
  title: string;
}
