import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPasswordResetToken } from '@/lib/password-reset';
import { passwordResetRequestSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = passwordResetRequestSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!user) return NextResponse.json({ ok: true });

    const token = await createPasswordResetToken(user.id);

    return NextResponse.json({
      ok: true,
      note: 'Mail sending is not wired yet. Use the token below only in development.',
      devResetUrl: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/reset-password?token=${token}`,
    });
  } catch {
    return NextResponse.json({ error: 'Unable to create reset request' }, { status: 500 });
  }
}