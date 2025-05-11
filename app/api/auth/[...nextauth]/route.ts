'use server';

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import prisma from '@/lib/prisma';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          userId: user.id,
          provider: account.provider,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        const email = user.email;
        if (!email) return false;

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (!existingUser) {
          try {
            const newUser = await prisma.user.create({
              data: {
                email,
                name: user.name || '',
                password: '',
                provider: account.provider,
                providerId: account.providerAccountId,
              },
            });
            user.id = newUser.id;
          } catch (error) {
            console.error('Error creating user:', error);
            return false;
          }
        } else {
          if (!existingUser.providerId) {
            try {
              await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                  provider: account.provider,
                  providerId: account.providerAccountId,
                },
              });
            } catch (error) {
              console.error('Error updating user:', error);
            }
          }
          user.id = existingUser.id;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
