import Link from 'next/link';
import { Plus, Sparkles } from 'lucide-react';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Logo } from '@/components/ui/logo';
import { LogoutButton } from '@/components/auth/logout-button';

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const pages = userId ? await prisma.page.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' }, include: { links: true, clickEvents: true }, take: 20 }) : [];

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3"><Logo /><div><p className="text-sm text-slate-400">Dashboard</p><h1 className="text-2xl font-semibold">{session?.user?.name ? `${session.user.name}'s pages` : 'Your link-in-bio pages'}</h1></div></div>
          <div className="flex items-center gap-3"><LogoutButton /><Link href="/dashboard/pages/new" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950"><Plus className="h-4 w-4" /> New page</Link></div>
        </header>
        <section className="mt-6 grid gap-4 md:grid-cols-4"><div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"><p className="text-sm text-slate-400">Pages</p><p className="mt-2 text-3xl font-semibold">{pages.length}</p></div><div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"><p className="text-sm text-slate-400">Published</p><p className="mt-2 text-3xl font-semibold">{pages.filter((page) => page.isPublished).length}</p></div><div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"><p className="text-sm text-slate-400">Median links</p><p className="mt-2 text-3xl font-semibold">{pages.length ? Math.round(pages.reduce((acc, page) => acc + page.links.length, 0) / pages.length) : 0}</p></div><div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"><p className="text-sm text-slate-400">Total clicks</p><p className="mt-2 text-3xl font-semibold">{pages.reduce((acc, page) => acc + page.clickEvents.length, 0)}</p></div></section>
        <section className="mt-6 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]"><div className="rounded-[2rem] border border-white/10 bg-white/5 p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-xl font-semibold">Pages</h2><p className="text-sm text-slate-400">Only your own pages are visible here.</p></div></div><div className="grid gap-4">{pages.length ? pages.map((page) => <article key={page.id} className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-4 md:flex-row md:items-center md:justify-between"><div><p className="text-lg font-semibold">{page.title}</p><p className="mt-1 text-sm text-slate-400">/{page.slug} · {page.links.length} links · {page.clickEvents.length} clicks · {page.themePreset}</p></div><div className="flex flex-wrap gap-2"><Link href={`/${page.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm">View</Link><Link href={`/dashboard/pages/${page.id}/edit`} className="rounded-full bg-white/10 px-4 py-2 text-sm">Edit</Link></div></article>) : <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-slate-950/40 p-10 text-center"><p className="text-lg font-medium">No pages yet</p><p className="mt-2 text-sm text-slate-400">Create your first link-in-bio page with custom theme, media, uploads, and SEO.</p></div>}</div></div><aside className="rounded-[2rem] border border-white/10 bg-white/5 p-5"><div className="inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-cyan-200"><Sparkles className="h-5 w-5" /></div><h2 className="mt-4 text-xl font-semibold">Production features</h2><ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-300"><li>Auth.js credentials plus GitHub-ready setup.</li><li>Real page ownership via session user id.</li><li>Protected dashboard with middleware.</li><li>Upload endpoint for image and video assets.</li><li>Publish action with published timestamp.</li><li>Analytics click tracking route.</li><li>Password reset scaffolding.</li></ul></aside></section>
      </div>
    </main>
  );
}