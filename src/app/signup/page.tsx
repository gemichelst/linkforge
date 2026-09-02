import Link from 'next/link';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Create account</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">Sign up to manage your own hosted bio pages.</p>
        <div className="mt-6"><SignupForm /></div>
        <p className="mt-6 text-sm text-slate-400">Already registered? <Link href="/login" className="text-cyan-300">Sign in</Link></p>
      </div>
    </main>
  );
}