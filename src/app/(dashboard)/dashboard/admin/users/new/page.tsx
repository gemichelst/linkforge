import { auth } from '@/auth';
import { AdminUserForm } from '@/components/dashboard/admin-user-form';
import Link from 'next/link';

export default async function AdminNewUserPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') return <div>Access Denied</div>;

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Add New User</h1>
            <p className="text-sm text-slate-400">Create a new user account.</p>
          </div>
          <Link href="/dashboard/admin/users" className="text-sm text-slate-400 hover:text-white">Back</Link>
        </header>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <AdminUserForm />
        </div>
      </div>
    </main>
  );
}
