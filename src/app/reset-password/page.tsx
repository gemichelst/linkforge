'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function ResetPasswordForm() {
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const token = params?.get('token') ?? '';

  async function requestReset(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch('/api/password-reset/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setMessage(data.devResetUrl ? `Development reset link: ${data.devResetUrl}` : 'If the account exists, a reset request has been created.');
  }

  async function confirmReset(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch('/api/password-reset/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    const data = await response.json();
    setMessage(response.ok ? 'Password updated. You can sign in now.' : data.error ?? 'Reset failed.');
  }

  return (
    <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h1 className="text-3xl font-semibold">Reset password</h1>
      <p className="mt-3 text-sm text-slate-300">Request a reset token or submit a new password when a token is present in the URL.</p>

      {!token ? (
        <form onSubmit={requestReset} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm"><span>Email</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" /></label>
          <button className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950">Request reset</button>
        </form>
      ) : (
        <form onSubmit={confirmReset} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm"><span>Token</span><input value={token} disabled className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none opacity-70" /></label>
          <label className="grid gap-2 text-sm"><span>New password</span><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" minLength={8} required className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" /></label>
          <button className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950">Set new password</button>
        </form>
      )}

      {message ? <p className="mt-6 break-all text-sm text-cyan-300">{message}</p> : null}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Suspense fallback={<div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}