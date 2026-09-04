import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminUrlsPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') return <div>Access Denied</div>;

  const pages = await prisma.page.findMany({
    include: { user: true, _count: { select: { clickEvents: true, links: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">URL Management</h1>
            <p className="text-sm text-slate-400">All user pages and statistics</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/admin" className="rounded-full bg-white/10 px-4 py-2 text-sm">Back to Admin</Link>
          </div>
        </header>

        <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10">
              <tr>
                <th className="pb-3 px-2">Page Slug</th>
                <th className="pb-3 px-2">Owner</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2">Links</th>
                <th className="pb-3 px-2">Clicks</th>
                <th className="pb-3 px-2">Created</th>
                <th className="pb-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page: any) => (
                <tr key={page.id} className="border-b border-white/5">
                  <td className="py-3 px-2 font-medium">/{page.slug}</td>
                  <td className="py-3 px-2 text-slate-400">{page.user.username || page.user.email}</td>
                  <td className="py-3 px-2">{page.isPublished ? 'Published' : 'Draft'}</td>
                  <td className="py-3 px-2">{page._count.links}</td>
                  <td className="py-3 px-2">{page._count.clickEvents}</td>
                  <td className="py-3 px-2 text-slate-400">{page.createdAt.toLocaleDateString()}</td>
                  <td className="py-3 px-2">
                    <Link href={`/${page.slug}`} target="_blank" className="text-cyan-400 hover:underline">View</Link>
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
