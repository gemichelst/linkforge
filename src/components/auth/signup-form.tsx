'use client';

import { useActionState } from 'react';
import { registerUser } from '@/lib/auth-actions';

export function SignupForm() {
  const [state, action, pending] = useActionState(async (_: { error?: string } | undefined, formData: FormData) => {
    try {
      await registerUser(formData);
      return {};
    } catch {
      return { error: 'Signup failed.' };
    }
  }, undefined);

  return (
    <form action={action} className="grid gap-4">
      <label className="grid gap-2 text-sm"><span>Name</span><input name="name" required className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" /></label>
      <label className="grid gap-2 text-sm"><span>Email</span><input name="email" type="email" required className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" /></label>
      <label className="grid gap-2 text-sm"><span>Password</span><input name="password" type="password" minLength={8} required className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" /></label>
      {state?.error ? <p className="text-sm text-red-300">{state.error}</p> : null}
      <button disabled={pending} className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60">{pending ? 'Creating account…' : 'Create account'}</button>
    </form>
  );
}