import { PageForm } from '@/components/dashboard/page-form';

export default function NewPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm text-slate-400">Dashboard / New page</p>
        <h1 className="mt-2 text-3xl font-semibold">Create a new page</h1>
      </div>
      <PageForm
        endpoint="/api/pages"
        submitLabel="Create page"
        initialValues={{
          title: '',
          slug: '',
          bio: '',
          avatarUrl: '',
          logoUrl: '',
          backgroundType: 'gradient',
          backgroundValue: '',
          foregroundMedia: '',
          customCss: '',
          seoTitle: '',
          seoDescription: '',
          themePreset: 'MINIMAL',
          links: [{ label: '', url: '', icon: '', linkType: 'LINK', isFeatured: false, sortOrder: 0 }],
        }}
      />
    </main>
  );
}