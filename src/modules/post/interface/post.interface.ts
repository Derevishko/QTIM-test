import type { FullUser } from '@modules/user';

export interface IPost {
  author: FullUser;
  authorId: number;
  description: string;
  title: string;
}
