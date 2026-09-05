'use client';

type Page = any; type LinkModel = any;
import { themePresets } from '@/lib/themes';

type PublicPageProps = {
  page: Page & { links: LinkModel[] };
};

export function PublicPage({ page }: PublicPageProps) {
  async function trackClick(linkId: string) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId: page.id, linkId, referrer: document.referrer || '' }),
      });
    } catch {}
  }

  const preset = themePresets[page.themePreset as keyof typeof themePresets] || themePresets.MINIMAL;
  const hasVideoBackground = page.backgroundType === 'video' && page.backgroundValue;
  const hasImageBackground = page.backgroundType === 'image' && page.backgroundValue;

  return (
    <div className="relative overflow-hidden rounded-[2rem]">
      {hasVideoBackground ? <video className="absolute inset-0 h-full w-full object-cover" src={page.backgroundValue ?? undefined} autoPlay muted loop playsInline /> : null}
      {hasImageBackground ? <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${page.backgroundValue})` }} /> : null}
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className={`relative mx-auto grid max-w-xl gap-6 rounded-[2rem] border p-6 ${preset.shell}`}>
        {page.avatarUrl ? <img src={page.avatarUrl} alt={page.title} className="mx-auto h-24 w-24 rounded-full object-cover" /> : null}
        {page.logoUrl ? <img src={page.logoUrl} alt={`${page.title} logo`} className="mx-auto max-h-12 object-contain" /> : null}
        {page.foregroundMedia ? <video src={page.foregroundMedia} className="w-full rounded-2xl border border-white/10" controls playsInline /> : null}
        <div className="text-center">
          <h1 className="text-3xl font-semibold">{page.title}</h1>
          {page.bio ? <p className="mt-3 text-sm opacity-80">{page.bio}</p> : null}
        </div>
        <div className="grid gap-3">
          {page.links.sort((a: any, b: any) => a.sortOrder - b.sortOrder).map((link: any) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" onClick={() => trackClick(link.id)} className={`rounded-2xl border px-4 py-4 text-center text-sm font-medium transition hover:translate-y-[-1px] ${link.isFeatured ? preset.chip : preset.button}`}>
              {link.label}
            </a>
          ))}
        </div>
        {page.customCss ? <style dangerouslySetInnerHTML={{ __html: page.customCss }} /> : null}
      </div>
    </div>
  );
}