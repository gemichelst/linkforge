'use client';

import { useActionState } from 'react';
import { setupAccountAction } from '@/lib/auth-actions';

export function SetupAccountForm({ user }: { user: { email: string; username: string } }) {
  const [state, action, pending] = useActionState(async (_: any, formData: FormData) => {
    return await setupAccountAction(formData);
  }, undefined);

  return (
    <form action={action} className="grid gap-4">
      <label className="grid gap-2 text-sm">
        <span>Username</span>
        <input name="username" type="text" defaultValue={user.username} required className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" />
      </label>
      <label className="grid gap-2 text-sm">
        <span>Email</span>
        <input name="email" type="email" defaultValue={user.email} required className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" />
      </label>
      <label className="grid gap-2 text-sm">
        <span>New Password</span>
        <input name="password" type="password" required className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" />
      </label>
      {state?.error ? <p className="text-sm text-red-300">{state.error}</p> : null}
      <button disabled={pending} className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60">
        {pending ? 'Saving...' : 'Save and Continue'}
      </button>
    </form>
  );
}
