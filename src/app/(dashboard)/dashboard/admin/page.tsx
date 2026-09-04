import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') return <div>Access Denied</div>;

  const usersCount = await prisma.user.count();
  const pagesCount = await prisma.page.count();
  const clicksCount = await prisma.clickEvent.count();

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">Manage users and URLs</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard" className="rounded-full bg-white/10 px-4 py-2 text-sm">Back to App</Link>
          </div>
        </header>
        
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Total Users</p>
            <p className="mt-2 text-3xl font-semibold">{usersCount}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Total Pages</p>
            <p className="mt-2 text-3xl font-semibold">{pagesCount}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Total Clicks</p>
            <p className="mt-2 text-3xl font-semibold">{clicksCount}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <Link href="/dashboard/admin/users" className="rounded-[2rem] border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
            <h2 className="text-xl font-semibold">User Management</h2>
            <p className="text-sm text-slate-400 mt-2">Add, edit, and list all users in the system.</p>
          </Link>
          <Link href="/dashboard/admin/urls" className="rounded-[2rem] border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
            <h2 className="text-xl font-semibold">URL Management & Stats</h2>
            <p className="text-sm text-slate-400 mt-2">View all created pages, their URLs, and click statistics.</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
