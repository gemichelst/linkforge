'use server';

import * as bcrypt from 'bcryptjs';
import { z } from 'zod';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const userSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']),
});

export async function adminSaveUser(userId: string | null, formData: FormData) {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') return { error: 'Unauthorized' };

  const parsed = userSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  });

  if (!parsed.success) return { error: 'Invalid input' };

  const { username, email, password, role } = parsed.data;

  // Check unique constraints
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
      NOT: userId ? { id: userId } : undefined,
    }
  });

  if (existingUser) return { error: 'Email or Username is already in use.' };

  if (userId) {
    const dataToUpdate: any = { username, email, role };
    if (password) {
      dataToUpdate.passwordHash = await bcrypt.hash(password, 12);
      dataToUpdate.forcePasswordChange = true;
    }
    
    await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });
  } else {
    if (!password) return { error: 'Password is required for new users.' };
    const passwordHash = await bcrypt.hash(password, 12);
    
    await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        role,
        forcePasswordChange: true, // Force new user to change password on first login
      },
    });
  }

  revalidatePath('/dashboard/admin/users');
  redirect('/dashboard/admin/users');
}
