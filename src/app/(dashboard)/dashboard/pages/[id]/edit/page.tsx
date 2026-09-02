import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { PageForm } from '@/components/dashboard/page-form';
import { prisma } from '@/lib/prisma';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) notFound();

  const { id } = await params;
  const page = await prisma.page.findFirst({
    where: { id, userId: session.user.id },
    include: { links: { orderBy: { sortOrder: 'asc' } } },
  });

  if (!page) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Dashboard / Edit page</p>
          <h1 className="mt-2 text-3xl font-semibold">{page.title}</h1>
          <p className="mt-2 text-sm text-slate-400">Status: {page.isPublished ? `Published${page.publishedAt ? ` on ${page.publishedAt.toLocaleString()}` : ''}` : 'Draft'}</p>
        </div>
        <form action={`/api/pages/${page.id}/publish`} method="post">
          <button className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">{page.isPublished ? 'Republish' : 'Publish now'}</button>
        </form>
      </div>
      <PageForm endpoint={`/api/pages/${page.id}`} submitLabel="Save changes" initialValues={{ title: page.title, slug: page.slug, bio: page.bio ?? '', avatarUrl: page.avatarUrl ?? '', logoUrl: page.logoUrl ?? '', backgroundType: (page.backgroundType as 'gradient' | 'image' | 'video') ?? 'gradient', backgroundValue: page.backgroundValue ?? '', foregroundMedia: page.foregroundMedia ?? '', customCss: page.customCss ?? '', seoTitle: page.seoTitle ?? '', seoDescription: page.seoDescription ?? '', themePreset: page.themePreset, links: page.links.map((link: any) => ({ id: link.id, label: link.label, url: link.url, icon: link.icon ?? '', linkType: link.linkType, isFeatured: link.isFeatured, sortOrder: link.sortOrder })) }} />
    </main>
  );
}