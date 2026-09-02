import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { pageSchema } from '@/lib/validators';

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = pageSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }, { status: 400 });

    const existing = await prisma.page.findUnique({ where: { slug: parsed.data.slug } });
    if (existing) return NextResponse.json({ error: 'Slug already in use' }, { status: 409 });

    const page = await prisma.page.create({
      data: {
        userId: session.user.id,
        title: parsed.data.title,
        slug: parsed.data.slug,
        bio: parsed.data.bio || null,
        avatarUrl: parsed.data.avatarUrl || null,
        logoUrl: parsed.data.logoUrl || null,
        backgroundType: parsed.data.backgroundType,
        backgroundValue: parsed.data.backgroundValue || null,
        foregroundMedia: parsed.data.foregroundMedia || null,
        customCss: parsed.data.customCss || null,
        seoTitle: parsed.data.seoTitle || null,
        seoDescription: parsed.data.seoDescription || null,
        themePreset: parsed.data.themePreset,
        links: {
          create: parsed.data.links.map((link, index) => ({
            label: link.label,
            url: link.url,
            icon: link.icon || null,
            linkType: link.linkType,
            isFeatured: link.isFeatured,
            sortOrder: index,
          })),
        },
      },
    });

    return NextResponse.json({ id: page.id });
  } catch {
    return NextResponse.json({ error: 'Unable to create page.' }, { status: 500 });
  }
}