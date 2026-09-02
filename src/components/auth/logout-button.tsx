'use client';

import { useTransition } from 'react';
import { logoutAction } from '@/lib/auth-actions';

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button onClick={() => startTransition(async () => logoutAction())} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200" disabled={pending}>
      {pending ? 'Signing out…' : 'Logout'}
    </button>
  );
}