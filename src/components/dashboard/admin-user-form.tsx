'use client';

import { useActionState } from 'react';
import { adminSaveUser } from '@/lib/admin-actions';
import Link from 'next/link';

type UserData = { id?: string; username: string | null; email: string; role: string };

export function AdminUserForm({ user }: { user?: UserData }) {
  const [state, action, pending] = useActionState(async (_: any, formData: FormData) => {
    return await adminSaveUser(user?.id || null, formData);
  }, undefined);

  return (
    <form action={action} className="grid gap-4">
      <label className="grid gap-2 text-sm">
        <span>Username</span>
        <input name="username" type="text" defaultValue={user?.username || ''} required className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" />
      </label>
      <label className="grid gap-2 text-sm">
        <span>Email</span>
        <input name="email" type="email" defaultValue={user?.email || ''} required className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" />
      </label>
      <label className="grid gap-2 text-sm">
        <span>{user ? 'New Password (leave empty to keep current)' : 'Password'}</span>
        <input name="password" type="password" required={!user} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" />
      </label>
      <label className="grid gap-2 text-sm">
        <span>Role</span>
        <select name="role" defaultValue={user?.role || 'USER'} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none appearance-none">
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </label>
      {state?.error ? <p className="text-sm text-red-300">{state.error}</p> : null}
      
      <div className="flex gap-4 mt-4">
        <button disabled={pending} className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60">
          {pending ? 'Saving...' : (user ? 'Update User' : 'Create User')}
        </button>
        <Link href="/dashboard/admin/users" className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold flex items-center justify-center">
          Cancel
        </Link>
      </div>
    </form>
  );
}
