import { NextResponse } from 'next/server';
import { consumePasswordResetToken } from '@/lib/password-reset';
import { passwordResetConfirmSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = passwordResetConfirmSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid request' }, { status: 400 });

    const success = await consumePasswordResetToken(parsed.data.token, parsed.data.password);
    if (!success) return NextResponse.json({ error: 'Reset token is invalid or expired' }, { status: 400 });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unable to reset password' }, { status: 500 });
  }
}