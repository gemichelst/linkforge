export function Logo() {
  return (
    <div className="inline-flex items-center gap-3">
      <svg aria-label="LinkForge logo" viewBox="0 0 64 64" className="h-10 w-10 text-cyan-300" fill="none">
        <rect x="8" y="8" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="4" />
        <rect x="36" y="36" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="4" />
        <path d="M24 40 40 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="text-lg font-semibold tracking-tight">LinkForge</span>
    </div>
  );
}