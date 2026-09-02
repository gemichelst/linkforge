'use client';

import { useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLink, GripVertical, Plus, Trash2, WandSparkles } from 'lucide-react';
import { UploadField } from '@/components/dashboard/upload-field';
import { slugify } from '@/lib/utils';
import { pageSchema, type PageInput } from '@/lib/validators';

const presets = ['MINIMAL', 'GLASS', 'NEON', 'EDITORIAL', 'BENTO'] as const;
const linkTypes = ['LINK', 'EMAIL', 'PHONE', 'VIDEO', 'MUSIC', 'BOOKING', 'SHOP'] as const;

export function PageForm({ initialValues, submitLabel, endpoint }: { initialValues: PageInput; submitLabel: string; endpoint: string }) {
  const [status, setStatus] = useState('');
  const [isPending, setIsPending] = useState(false);

  const form = useForm<PageInput>({
    resolver: zodResolver(pageSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const { fields, append, remove, move } = useFieldArray({ control: form.control, name: 'links' });

  const watchTitle = form.watch('title');
  const watchSlug = form.watch('slug');
  const watchThemePreset = form.watch('themePreset');
  const watchBackgroundType = form.watch('backgroundType');
  const watchAvatar = form.watch('avatarUrl');
  const watchLogo = form.watch('logoUrl');
  const watchBio = form.watch('bio');
  const watchLinks = form.watch('links');
  const watchBackgroundValue = form.watch('backgroundValue');
  const watchForegroundMedia = form.watch('foregroundMedia');

  const linkCount = watchLinks?.length ?? 0;
  const featuredCount = watchLinks?.filter((link) => link.isFeatured).length ?? 0;

  const previewClasses = useMemo(() => {
    switch (watchThemePreset) {
      case 'GLASS':
        return 'bg-white/10 backdrop-blur-xl border-white/20';
      case 'NEON':
        return 'bg-slate-950/90 border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.18)]';
      case 'EDITORIAL':
        return 'bg-stone-100 text-stone-900 border-stone-300';
      case 'BENTO':
        return 'bg-slate-900/90 border-fuchsia-300/20';
      default:
        return 'bg-slate-950/70 border-white/10';
    }
  }, [watchThemePreset]);

  function normalizeLinks(values: PageInput) {
    return values.links.map((link, index) => ({ ...link, sortOrder: index, icon: link.icon ?? '' }));
  }

  async function onSubmit(values: PageInput) {
    setIsPending(true);
    setStatus('Saving…');

    const payload = { ...values, links: normalizeLinks(values) };
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setIsPending(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setStatus(data.error ?? 'Could not save page.');
      return;
    }

    const data = await response.json();
    setStatus('Saved. Opening editor…');
    window.location.href = `/dashboard/pages/${data.id}/edit`;
  }

  function moveLink(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= fields.length) return;
    move(index, target);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
      <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 md:grid-cols-2">
        <div className="md:col-span-2 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Page settings</h2>
            <p className="text-sm text-slate-400">Define branding, SEO, media, and theming for this profile page.</p>
          </div>
          <div className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300">{linkCount} links · {featuredCount} featured</div>
        </div>

        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">Page title</span>
          <input
            className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none"
            {...form.register('title')}
            onChange={(event) => {
              form.setValue('title', event.target.value);
              if (!watchSlug) form.setValue('slug', slugify(event.target.value));
            }}
          />
          {form.formState.errors.title ? <p className="text-xs text-red-300">{form.formState.errors.title.message}</p> : null}
        </label>

        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">Slug</span>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span className="text-xs text-slate-400">/</span>
            <input className="w-full bg-transparent outline-none" {...form.register('slug')} />
            <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs" onClick={() => form.setValue('slug', slugify(watchTitle || 'my-page'), { shouldValidate: true })}>
              <WandSparkles className="h-3 w-3" /> Auto
            </button>
          </div>
          {form.formState.errors.slug ? <p className="text-xs text-red-300">{form.formState.errors.slug.message}</p> : null}
        </label>

        <label className="grid gap-2 text-sm md:col-span-2">
          <span className="text-slate-200">Bio</span>
          <textarea className="min-h-28 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" {...form.register('bio')} />
          <div className="text-xs text-slate-400">{watchBio?.length ?? 0}/280</div>
        </label>

        <div className="grid gap-3">
          <label className="grid gap-2 text-sm"><span className="text-slate-200">Avatar URL</span><input className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" {...form.register('avatarUrl')} /></label>
          <UploadField label="Upload avatar" accept="image/*" onUploaded={(url) => form.setValue('avatarUrl', url, { shouldValidate: true })} />
        </div>

        <div className="grid gap-3">
          <label className="grid gap-2 text-sm"><span className="text-slate-200">Logo URL</span><input className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" {...form.register('logoUrl')} /></label>
          <UploadField label="Upload logo" accept="image/*" onUploaded={(url) => form.setValue('logoUrl', url, { shouldValidate: true })} />
        </div>

        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">Background mode</span>
          <select className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" {...form.register('backgroundType')}>
            <option value="gradient">Gradient</option>
            <option value="image">Background image</option>
            <option value="video">Background video</option>
          </select>
        </label>

        <div className="grid gap-3">
          <label className="grid gap-2 text-sm"><span className="text-slate-200">Background media URL</span><input className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" {...form.register('backgroundValue')} /></label>
          <UploadField label={watchBackgroundType === 'video' ? 'Upload background video' : 'Upload background image'} accept={watchBackgroundType === 'video' ? 'video/*' : 'image/*'} onUploaded={(url) => form.setValue('backgroundValue', url, { shouldValidate: true })} />
        </div>

        <div className="grid gap-3">
          <label className="grid gap-2 text-sm"><span className="text-slate-200">Foreground video URL</span><input className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" {...form.register('foregroundMedia')} /></label>
          <UploadField label="Upload foreground video" accept="video/*" onUploaded={(url) => form.setValue('foregroundMedia', url, { shouldValidate: true })} />
        </div>

        <label className="grid gap-2 text-sm"><span className="text-slate-200">Theme preset</span><select className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" {...form.register('themePreset')}>{presets.map((preset) => <option key={preset} value={preset}>{preset}</option>)}</select></label>
        <label className="grid gap-2 text-sm"><span className="text-slate-200">SEO title</span><input className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" {...form.register('seoTitle')} /></label>
        <label className="grid gap-2 text-sm md:col-span-2"><span className="text-slate-200">SEO description</span><textarea className="min-h-24 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" {...form.register('seoDescription')} /></label>
        <label className="grid gap-2 text-sm md:col-span-2"><span className="text-slate-200">Custom CSS</span><textarea className="min-h-40 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 font-mono text-sm outline-none" {...form.register('customCss')} /></label>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Links</h2>
            <p className="text-sm text-slate-400">Arrange, feature, and classify the outbound links shown on the page.</p>
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm" onClick={() => append({ label: '', url: '', linkType: 'LINK', icon: '', isFeatured: false, sortOrder: fields.length })}><Plus className="h-4 w-4" /> Add link</button>
        </div>

        <div className="grid gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:grid-cols-12">
              <input type="hidden" {...form.register(`links.${index}.sortOrder`, { valueAsNumber: true })} value={index} />
              <div className="md:col-span-1 flex items-start justify-between gap-2"><div className="mt-8 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400"><GripVertical className="h-4 w-4" /></div></div>
              <label className="grid gap-2 text-sm md:col-span-3"><span>Label</span><input className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2" {...form.register(`links.${index}.label`)} /></label>
              <label className="grid gap-2 text-sm md:col-span-4"><span>URL</span><input className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2" {...form.register(`links.${index}.url`)} /></label>
              <label className="grid gap-2 text-sm md:col-span-2"><span>Type</span><select className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2" {...form.register(`links.${index}.linkType`)}>{linkTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
              <label className="grid gap-2 text-sm md:col-span-2"><span>Icon name</span><input className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2" {...form.register(`links.${index}.icon`)} placeholder="music2, instagram..." /></label>
              <label className="md:col-span-2 flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4" {...form.register(`links.${index}.isFeatured`)} /> Featured</label>
              <div className="md:col-span-10 flex flex-wrap items-center gap-2">
                <button type="button" className="rounded-full border border-white/10 px-3 py-1 text-xs" onClick={() => moveLink(index, -1)}>Move up</button>
                <button type="button" className="rounded-full border border-white/10 px-3 py-1 text-xs" onClick={() => moveLink(index, 1)}>Move down</button>
                {watchLinks?.[index]?.url ? <a href={watchLinks[index].url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200"><ExternalLink className="h-3 w-3" /> Test</a> : null}
                <button type="button" className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-xs text-red-200" onClick={() => remove(index)}><Trash2 className="h-3 w-3" /> Remove</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Editor status</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3"><span>Slug preview</span><span className="text-slate-100">/{watchSlug || 'my-page'}</span></div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3"><span>Theme preset</span><span className="text-slate-100">{watchThemePreset}</span></div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3"><span>Background mode</span><span className="text-slate-100">{watchBackgroundType}</span></div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3"><span>Media assets</span><span className="text-slate-100">{[watchAvatar, watchLogo, watchBackgroundValue, watchForegroundMedia].filter(Boolean).length}</span></div>
          </div>
          {status ? <p className="mt-4 text-sm text-cyan-300">{status}</p> : null}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Live preview</h2>
          <div className={`mt-4 overflow-hidden rounded-[2rem] border p-5 ${previewClasses}`}>
            <div className="mx-auto grid max-w-sm gap-4 text-center">
              {watchAvatar ? <img src={watchAvatar} alt="Avatar preview" className="mx-auto h-20 w-20 rounded-full object-cover" /> : <div className="mx-auto h-20 w-20 rounded-full border border-white/10 bg-white/5" />}
              {watchLogo ? <img src={watchLogo} alt="Logo preview" className="mx-auto h-10 object-contain" /> : null}
              <div>
                <h3 className="text-2xl font-semibold">{watchTitle || 'Page title'}</h3>
                <p className="mt-2 text-sm opacity-80">{watchBio || 'Your bio preview will appear here.'}</p>
              </div>
              <div className="grid gap-3">
                {(watchLinks || []).slice(0, 4).map((link, index) => <div key={`${link.label}-${index}`} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm">{link.label || `Link ${index + 1}`}</div>)}
                {!watchLinks?.length ? <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm opacity-70">Add links to preview the stack.</div> : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3"><button type="submit" disabled={isPending} className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60">{isPending ? 'Saving…' : submitLabel}</button></div>
    </form>
  );
}