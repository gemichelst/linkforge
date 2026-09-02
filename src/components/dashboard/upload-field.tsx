'use client';

import { useState } from 'react';

export function UploadField({ label, onUploaded, accept = 'image/*,video/*' }: { label: string; onUploaded: (url: string) => void; accept?: string }) {
  const [status, setStatus] = useState('');

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setStatus('Uploading…');

    const response = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error ?? 'Upload failed');
      return;
    }

    onUploaded(data.url);
    setStatus('Uploaded');
  }

  return (
    <div className="grid gap-2 text-sm">
      <span className="text-slate-200">{label}</span>
      <input type="file" accept={accept} onChange={onChange} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3" />
      {status ? <p className="text-xs text-slate-400">{status}</p> : null}
    </div>
  );
}