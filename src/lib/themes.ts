export const themePresets = {
  MINIMAL: {
    shell: 'bg-slate-950/70 border-white/10',
    chip: 'bg-white/10 text-white',
    button: 'border-white/10 bg-white/5 text-white hover:bg-white/10',
  },
  GLASS: {
    shell: 'bg-white/10 border-white/20 backdrop-blur-xl',
    chip: 'bg-white/20 text-white',
    button: 'border-white/20 bg-white/10 text-white hover:bg-white/15',
  },
  NEON: {
    shell: 'bg-slate-950/90 border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.16)]',
    chip: 'bg-cyan-400/15 text-cyan-200',
    button: 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/15',
  },
  EDITORIAL: {
    shell: 'bg-stone-100 border-stone-300 text-stone-900',
    chip: 'bg-stone-200 text-stone-900',
    button: 'border-stone-300 bg-white text-stone-900 hover:bg-stone-50',
  },
  BENTO: {
    shell: 'bg-slate-900/90 border-fuchsia-300/20',
    chip: 'bg-fuchsia-400/15 text-fuchsia-100',
    button: 'border-fuchsia-300/20 bg-white/5 text-white hover:bg-white/10',
  },
} as const;