import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Sign in</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">Use credentials login or wire up GitHub OAuth with your environment variables.</p>
        <div className="mt-6"><LoginForm /></div>
        <p className="mt-6 text-sm text-slate-400">No account yet? <Link href="/signup" className="text-cyan-300">Create one</Link></p>
      </div>
    </main>
  );
}