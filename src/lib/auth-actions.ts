'use server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { signIn, signOut } from '@/auth';
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
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
    redirectTo: '/dashboard',
  });
}

export async function logoutAction() {
  await signOut({ redirectTo: '/' });
}