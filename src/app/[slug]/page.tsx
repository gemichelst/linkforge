import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PublicPage } from '@/components/public/public-page';

export default async function PublicSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug }, include: { links: true } });

  if (!page || !page.isPublished) notFound();

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <PublicPage page={page} />
      </div>
    </main>
  );
}