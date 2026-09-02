import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LinkForge',
  description: 'A stylish self-hosted link-in-bio builder with SSR, media, and analytics.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}