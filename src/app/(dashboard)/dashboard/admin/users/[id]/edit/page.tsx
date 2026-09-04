import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { AdminUserForm } from '@/components/dashboard/admin-user-form';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function AdminEditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') return <div>Access Denied</div>;

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  
  if (!user) notFound();

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Edit User</h1>
            <p className="text-sm text-slate-400">Modify user account details.</p>
          </div>
          <Link href="/dashboard/admin/users" className="text-sm text-slate-400 hover:text-white">Back</Link>
        </header>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <AdminUserForm user={user} />
        </div>
      </div>
    </main>
  );
}
