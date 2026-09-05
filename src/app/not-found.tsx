import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold">404 - Not Found</h2>
      <p className="mt-2 text-slate-400">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950">Return Home</Link>
    </div>
  );
}
