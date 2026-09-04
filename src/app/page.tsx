import Link from 'next/link';

import { Logo } from '@/components/ui/logo';

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-white/10 px-4 py-2 text-sm">Login</Link>
            <Link href="/signup" className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Get started</Link>
          </div>
        </header>

        <section className="mt-8 grid gap-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200"><span className="h-4 w-4">✨</span> Self-hosted link-in-bio builder</div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight tracking-tight">Build stylish, SSR-powered link pages with video, themes, uploads, and custom branding.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">LinkForge is designed for creators, artists, DJs, labels, and developers who want more control than Linktree-style services offer.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950">Create your account <span className="h-4 w-4">→</span></Link>
              <Link href="/login" className="rounded-full border border-white/10 px-5 py-3 text-sm">Open dashboard</Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Included</p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-200">
                <li>SSR public pages and SEO fields</li>
                <li>Theme presets and custom CSS</li>
                <li>Background image or video support</li>
                <li>Foreground media blocks</li>
                <li>Protected dashboard and uploads</li>
                <li>Click analytics and publish flow</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Route pattern</p>
              <p className="mt-3 text-xl font-semibold">domain.com/title_123</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}