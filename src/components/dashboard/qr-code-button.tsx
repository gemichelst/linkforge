'use client';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, X } from 'lucide-react';

export function QrCodeButton({ slug }: { slug: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const url = typeof window !== 'undefined' ? `${window.location.origin}/${slug}` : `https://example.com/${slug}`;

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="rounded-full border border-white/10 px-4 py-2 text-sm">
        QR Code
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative rounded-3xl bg-white p-8 text-center text-black shadow-2xl">
            <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3 rounded-full bg-slate-100 p-1 hover:bg-slate-200">
              <X className="h-5 w-5" />
            </button>
            <h3 className="mb-4 text-lg font-semibold">Scan QR Code</h3>
            <QRCodeSVG value={url} size={200} className="mx-auto" />
            <p className="mt-4 text-sm text-slate-500 break-all">{url}</p>
          </div>
        </div>
      )}
    </>
  );
}
