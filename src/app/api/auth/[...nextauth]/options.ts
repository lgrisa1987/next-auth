import prisma from '@/lib/prisma';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

export const authOptions: AuthOptions = {
  pages: { signIn: '/auth/signin' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'User Name',
          type: 'text',
          placeholder: 'Your User Name',
        },
        password: {
          label: 'User Password',
          type: 'password',
          placeholder: 'Your Password',
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.username },
        });
        if (!user) throw new Error('User name or password is not correct');
        if (!credentials?.password)
          throw new Error('Please provide your password');
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) throw new Error('Password is not correct');
        const { password, ...userWithOutPass } = user;
        return userWithOutPass;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      /* console.log('token:', token); */
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      /* console.log('session:', session); */
      return session;
    },
  },
};
