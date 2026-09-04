import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminUsersPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') return <div>Access Denied</div>;

  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-sm text-slate-400">All registered users</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/admin" className="rounded-full bg-white/10 px-4 py-2 text-sm">Back to Admin</Link>
            <Link href="/dashboard/admin/users/new" className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Add User</Link>
          </div>
        </header>

        <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10">
              <tr>
                <th className="pb-3 px-2">ID</th>
                <th className="pb-3 px-2">Username</th>
                <th className="pb-3 px-2">Email</th>
                <th className="pb-3 px-2">Role</th>
                <th className="pb-3 px-2">Created</th>
                <th className="pb-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className="border-b border-white/5">
                  <td className="py-3 px-2 text-slate-400">{user.id.slice(-6)}</td>
                  <td className="py-3 px-2">{user.username || '-'}</td>
                  <td className="py-3 px-2">{user.email}</td>
                  <td className="py-3 px-2"><span className="rounded bg-white/10 px-2 py-1 text-xs">{user.role}</span></td>
                  <td className="py-3 px-2 text-slate-400">{user.createdAt.toLocaleDateString()}</td>
                  <td className="py-3 px-2">
                    <Link href={`/dashboard/admin/users/${user.id}/edit`} className="text-cyan-400 hover:underline">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
