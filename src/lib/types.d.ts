import { User } from '@prisma/client';

declare module 'next-auth' {
  type Session = {
    user: User;
  };
}
declare module 'next-auth/jwt' {
  type JWT = {
    user: User;
  };
}
