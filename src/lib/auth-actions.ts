'use server';

import * as bcrypt from 'bcryptjs';
import { z } from 'zod';
import { signIn, signOut, auth } from '@/auth';
import { prisma } from '@/lib/prisma';

const signupSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.email(),
  password: z.string().min(8).max(100),
});

export async function registerUser(formData: FormData) {
  const parsed = signupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input' };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { error: 'User already exists' };

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
    },
  });

  await signIn('credentials', {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: '/dashboard',
  });
}

export async function loginWithCredentials(formData: FormData) {
  await signIn('credentials', {
    login: String(formData.get('login') ?? ''),
    password: String(formData.get('password') ?? ''),
    redirectTo: '/dashboard',
  });
}

export async function logoutAction() {
  await signOut({ redirectTo: '/' });
}
const setupAccountSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
});

export async function setupAccountAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  const parsed = setupAccountSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) return { error: 'Invalid input' };

  // Check if email or username is already taken by someone else
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: parsed.data.email },
        { username: parsed.data.username }
      ],
      NOT: { id: session.user.id }
    }
  });

  if (existingUser) return { error: 'Email or Username is already in use.' };

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      username: parsed.data.username,
      email: parsed.data.email,
      passwordHash,
      forcePasswordChange: false,
    }
  });
  
  // Update session? Or just force re-login? Let's sign out to make them login with new credentials
  await signOut({ redirectTo: '/login' });
}
