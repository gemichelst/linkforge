'use client';
import { useState, useEffect } from 'react';
import { themePresets } from '@/lib/themes';
import { IconMap } from '@/lib/icons';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, X } from 'lucide-react';

type Page = any; 
type LinkModel = any;
type PublicPageProps = {
  page: Page & { links: LinkModel[] };
};

const DynamicIcon = ({ name }: { name: string }) => {
  if (!name) return null;
  const Icon = IconMap[name.toLowerCase()] || IconMap[name] || IconMap['Globe'];
  return Icon ? <Icon className="h-5 w-5" /> : null;
};

export function PublicPage({ page }: PublicPageProps) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setCurrentUrl(window.location.href);
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

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

  const activeLinks = page.links.filter((link: any) => {
    if (link.startDate && new Date(link.startDate) > now) return false;
    if (link.endDate && new Date(link.endDate) < now) return false;
    return true;
  }).sort((a: any, b: any) => a.sortOrder - b.sortOrder);

  const socialLinks = activeLinks.filter((link: any) => link.linkType === 'SOCIAL');
  const regularLinks = activeLinks.filter((link: any) => link.linkType !== 'SOCIAL');

  return (
    <div className="relative overflow-hidden rounded-[2rem] min-h-[600px]">
      {hasVideoBackground ? <video className="absolute inset-0 h-full w-full object-cover" src={page.backgroundValue ?? undefined} autoPlay muted loop playsInline /> : null}
      {hasImageBackground ? <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${page.backgroundValue})` }} /> : null}
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className={`relative mx-auto grid max-w-xl gap-6 rounded-[2rem] border p-6 ${preset.shell} min-h-[inherit]`}>
        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={() => setShowQrCode(true)} className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors backdrop-blur-md" title="Show QR Code">
            <QrCode className="h-5 w-5" />
          </button>
        </div>

        {page.avatarUrl ? <img src={page.avatarUrl} alt={page.title} className="mx-auto h-24 w-24 rounded-full object-cover" /> : null}
        {page.logoUrl ? <img src={page.logoUrl} alt={`${page.title} logo`} className="mx-auto max-h-12 object-contain" /> : null}
        {page.foregroundMedia ? <video src={page.foregroundMedia} className="w-full rounded-2xl border border-white/10" controls playsInline /> : null}
        <div className="text-center">
          <h1 className="text-3xl font-semibold">{page.title}</h1>
          {page.bio ? <p className="mt-3 text-sm opacity-80">{page.bio}</p> : null}
        </div>

        {socialLinks.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((link: any) => (
              <a key={link.id} href={link.url} target="_blank" rel="noreferrer" onClick={() => trackClick(link.id)} className="rounded-full bg-white/10 p-3 text-white transition hover:scale-110 hover:bg-white/20" title={link.label}>
                {link.icon ? <DynamicIcon name={link.icon} /> : <span className="text-sm font-medium">{link.label[0]}</span>}
              </a>
            ))}
          </div>
        )}

        <div className="grid gap-3">
          {regularLinks.map((link: any) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" onClick={() => trackClick(link.id)} className={`rounded-2xl border px-4 py-4 text-center text-sm font-medium transition hover:translate-y-[-1px] ${link.isFeatured ? preset.chip : preset.button}`}>
              {link.icon && (
                <span className="inline-block mr-2 align-middle">
                  <DynamicIcon name={link.icon} />
                </span>
              )}
              {link.label}
            </a>
          ))}
        </div>

        {page.customCss ? <style dangerouslySetInnerHTML={{ __html: page.customCss }} /> : null}

        {showQrCode && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-[2rem]">
            <div className="relative rounded-3xl bg-white p-8 text-center text-black shadow-2xl">
              <button onClick={() => setShowQrCode(false)} className="absolute top-3 right-3 rounded-full bg-slate-100 p-1 hover:bg-slate-200">
                <X className="h-5 w-5" />
              </button>
              <h3 className="mb-4 text-lg font-semibold">Scan QR Code</h3>
              {currentUrl && <QRCodeSVG value={currentUrl} size={200} className="mx-auto" />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
