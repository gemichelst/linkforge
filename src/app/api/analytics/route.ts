import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const analyticsSchema = z.object({
  pageId: z.string().min(1),
  linkId: z.string().optional(),
  referrer: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = analyticsSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

    const page = await prisma.page.findUnique({ where: { id: parsed.data.pageId } });
    if (!page || !page.isPublished) return NextResponse.json({ error: 'Page not available' }, { status: 404 });

    const headersList = await headers();
    const userAgent = headersList.get('user-agent') ?? undefined;

    await prisma.clickEvent.create({
      data: {
        pageId: parsed.data.pageId,
        linkId: parsed.data.linkId,
        referrer: parsed.data.referrer,
        userAgent,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Could not track click' }, { status: 500 });
  }
}