import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug }, include: { links: true } });
  if (!page || !page.isPublished) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(page);
}