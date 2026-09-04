import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { SetupAccountForm } from '@/components/dashboard/setup-account-form';

export default async function SetupAccountPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  
  if (!(session.user as any).forcePasswordChange) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold mb-2">Setup Your Account</h1>
        <p className="text-sm text-slate-400 mb-6">Please update your account details to continue.</p>
        <SetupAccountForm user={{ email: session.user.email ?? '', username: (session.user as any).username ?? '' }} />
      </div>
    </main>
  );
}
