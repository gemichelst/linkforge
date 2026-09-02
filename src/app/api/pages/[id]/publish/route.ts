import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const page = await prisma.page.findFirst({ where: { id, userId: session.user.id } });
  if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await prisma.page.update({ where: { id }, data: { isPublished: true, publishedAt: new Date() } });

  return NextResponse.redirect(new URL(`/dashboard/pages/${id}/edit`, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}