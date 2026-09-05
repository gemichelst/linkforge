import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import * as bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'USER' | 'ADMIN';
      username?: string | null;
      forcePasswordChange?: boolean;
    } & DefaultSession['user'];
  }
}

const credentialsSchema = z.object({
  login: z.string(),
  password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        login: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;
        
        const login = parsed.data.login;
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: login },
              { username: login },
            ],
          },
        });
        
        if (!user?.passwordHash) return null;
        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!valid) return null;
        
        return { 
          id: user.id, 
          email: user.email, 
          name: user.name, 
          image: user.image, 
          role: user.role as "USER" | "ADMIN",
          username: user.username,
          forcePasswordChange: user.forcePasswordChange
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as 'USER' | 'ADMIN';
        session.user.username = token.username as string | undefined;
        session.user.forcePasswordChange = token.forcePasswordChange as boolean | undefined;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role;
        token.username = (user as any).username;
        token.forcePasswordChange = (user as any).forcePasswordChange;
      }
      if (trigger === "update" && session) {
        if (session.user?.username) token.username = session.user.username;
        if (session.user?.forcePasswordChange !== undefined) token.forcePasswordChange = session.user.forcePasswordChange;
      }
      return token;
    },
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;
      
      if (pathname.startsWith('/dashboard')) {
        if (!isLoggedIn) return false;
        
        // Force password change check
        if ((auth as any)?.user?.forcePasswordChange && pathname !== '/dashboard/setup-account') {
          return Response.redirect(new URL('/dashboard/setup-account', request.url));
        }
        
        // Admin route protection
        if (pathname.startsWith('/dashboard/admin') && (auth as any)?.user?.role !== 'ADMIN') {
          return Response.redirect(new URL('/dashboard', request.url));
        }
        
        return true;
      }
      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
});