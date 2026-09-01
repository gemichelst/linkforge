/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] font-sans overflow-hidden">
      <header className="flex justify-between items-end p-8 border-b border-[#1A1A1A]/10">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">LinkForge</h1>
          <p className="text-xs font-bold uppercase tracking-widest mt-2 text-[#1A1A1A]/50">
            Self-Hosted Link Identity System
          </p>
        </div>
        <div className="text-right">
          <div className="inline-block px-3 py-1 bg-[#FF4F00] text-white text-[10px] font-bold uppercase tracking-tighter mb-1">
            Live Production
          </div>
          <p className="text-xs font-mono opacity-60">tools.doerd.de/linkforge</p>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        <aside className="col-span-3 border-r border-[#1A1A1A]/10 p-8 flex flex-col justify-between bg-[#F2F1ED]">
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-[#1A1A1A]/40">
              System Configuration
            </h2>
            <div className="space-y-6">
              <div className="group">
                <label className="block text-[10px] font-bold uppercase mb-1">Environment Path</label>
                <div className="p-3 bg-white border border-[#1A1A1A]/10 font-mono text-xs">/linkforge</div>
                <p className="text-[10px] mt-2 leading-relaxed opacity-60">
                  Auto-detects subdirectory and subdomain routing for portable deployment.
                </p>
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold uppercase mb-1">Active Theme</label>
                <div className="flex items-center gap-2 p-3 bg-white border border-[#1A1A1A]/10">
                  <div className="w-3 h-3 rounded-full bg-[#1A1A1A]"></div>
                  <span className="text-xs font-medium uppercase">Brutalist Noir</span>
                </div>
              </div>
            </div>
          </section>
          <nav className="flex flex-col gap-4">
            <a href="#" className="text-sm font-bold uppercase border-b-2 border-[#1A1A1A] pb-1 w-fit">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium uppercase opacity-40 hover:opacity-100">
              Appearance
            </a>
            <a href="#" className="text-sm font-medium uppercase opacity-40 hover:opacity-100">
              Analytics
            </a>
            <a href="#" className="text-sm font-medium uppercase opacity-40 hover:opacity-100">
              Settings
            </a>
          </nav>
        </aside>

        <section className="col-span-5 p-8 overflow-hidden flex flex-col">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Link Management</h2>
            <button className="text-[10px] font-bold uppercase border border-[#1A1A1A] px-4 py-2 hover:bg-[#1A1A1A] hover:text-white transition-colors">
              + Add New Entry
            </button>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            <div className="border border-[#1A1A1A]/10 p-4 bg-white flex items-center gap-4 group">
              <div className="w-10 h-10 bg-[#FF4F00]/10 flex items-center justify-center text-[#FF4F00] font-bold">
                01
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase">Official Website</div>
                <div className="text-[10px] font-mono opacity-50">doerd.de</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold">1,240 clicks</div>
                <div className="w-16 h-1 bg-[#1A1A1A]/10 mt-1">
                  <div className="h-full bg-[#FF4F00] w-[80%]"></div>
                </div>
              </div>
            </div>
            <div className="border border-[#1A1A1A]/10 p-4 bg-white flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-[#1A1A1A]/5 flex items-center justify-center text-[#1A1A1A] font-bold">
                02
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase">Latest Release</div>
                <div className="text-[10px] font-mono opacity-50">forge.io/v2</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold">856 clicks</div>
                <div className="w-16 h-1 bg-[#1A1A1A]/10 mt-1">
                  <div className="h-full bg-[#1A1A1A] w-[45%]"></div>
                </div>
              </div>
            </div>
            <div className="border border-[#1A1A1A]/10 p-4 bg-white flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-[#1A1A1A]/5 flex items-center justify-center text-[#1A1A1A] font-bold">
                03
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase">Twitter / X</div>
                <div className="text-[10px] font-mono opacity-50">@doerd_tools</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold">412 clicks</div>
                <div className="w-16 h-1 bg-[#1A1A1A]/10 mt-1">
                  <div className="h-full bg-[#1A1A1A] w-[20%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10 shrink-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#FF4F00] text-white">
                <div className="text-[10px] font-bold uppercase opacity-80">Unique Visitors</div>
                <div className="text-2xl font-black">24.8k</div>
              </div>
              <div className="p-4 bg-[#1A1A1A] text-white">
                <div className="text-[10px] font-bold uppercase opacity-80">Avg. CTR</div>
                <div className="text-2xl font-black">14.2%</div>
              </div>
            </div>
          </div>
        </section>

        <section className="col-span-4 bg-[#EBE9E4] flex items-center justify-center p-8 border-l border-[#1A1A1A]/10">
          <div className="relative w-full max-w-[280px] aspect-[9/18.5] bg-white rounded-[40px] shadow-2xl border-[8px] border-[#1A1A1A] overflow-hidden flex flex-col">
            <div className="h-6 w-1/3 bg-[#1A1A1A] mx-auto rounded-b-xl mb-6 shrink-0"></div>
            <div className="px-6 text-center mb-6 shrink-0">
              <div className="w-20 h-20 bg-[#1A1A1A] mx-auto rounded-full mb-4 flex items-center justify-center text-white text-2xl font-black">
                LF
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight">Doerd Tools</h3>
              <p className="text-[10px] opacity-60 leading-relaxed font-medium mt-1">
                Crafting open-source systems for the modern web architect.
              </p>
            </div>
            <div className="px-4 space-y-2 flex-1 overflow-y-auto">
              <div className="w-full py-3 border-2 border-[#1A1A1A] text-[10px] font-black uppercase tracking-widest text-center hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer">
                Official Website
              </div>
              <div className="w-full py-3 border-2 border-[#1A1A1A] text-[10px] font-black uppercase tracking-widest text-center hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer">
                Latest Release
              </div>
              <div className="w-full py-3 border-2 border-[#1A1A1A] text-[10px] font-black uppercase tracking-widest text-center hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer">
                Twitter / X
              </div>
              <div className="w-full py-3 border-2 border-[#1A1A1A] text-[10px] font-black uppercase tracking-widest text-center hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer">
                GitHub Source
              </div>
            </div>
            <div className="p-6 text-center shrink-0">
              <div className="text-[8px] font-bold uppercase tracking-widest opacity-30">
                Powered by LinkForge
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="h-12 bg-[#1A1A1A] text-white flex items-center justify-between px-8 shrink-0">
        <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 italic">
          Next.js 15 &bull; Tailwind 4 &bull; Prisma 6
        </div>
        <div className="flex gap-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF4F00]">
            V 2.1.0-STABLE
          </span>
        </div>
      </footer>
    </div>
  );
}
