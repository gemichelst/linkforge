import { z } from 'zod';

export const linkSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, 'Link label is required').max(80),
  url: z.string().min(1, 'URL is required').refine((value) => {
    if (value.startsWith('mailto:') || value.startsWith('tel:')) return true;
    return z.url().safeParse(value).success;
  }, 'Enter a valid URL, mailto:, or tel: value'),
  icon: z.string().max(40).optional().or(z.literal('')),
  linkType: z.enum(['LINK', 'EMAIL', 'PHONE', 'VIDEO', 'MUSIC', 'BOOKING', 'SHOP']),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().int().min(0),
});

export const pageSchema = z.object({
  title: z.string().min(2, 'Title is required').max(80),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/, 'Use lowercase letters, numbers, hyphens, and underscores only'),
  bio: z.string().max(280).optional().or(z.literal('')),
  avatarUrl: z.string().optional().or(z.literal('')).refine((value) => !value || z.url().safeParse(value).success || value.startsWith('/uploads/'), 'Avatar must be a valid URL or local upload path'),
  logoUrl: z.string().optional().or(z.literal('')).refine((value) => !value || z.url().safeParse(value).success || value.startsWith('/uploads/'), 'Logo must be a valid URL or local upload path'),
  backgroundType: z.enum(['gradient', 'image', 'video']),
  backgroundValue: z.string().optional().or(z.literal('')).refine((value) => !value || z.url().safeParse(value).success || value.startsWith('/uploads/'), 'Background value must be a valid URL or local upload path'),
  foregroundMedia: z.string().optional().or(z.literal('')).refine((value) => !value || z.url().safeParse(value).success || value.startsWith('/uploads/'), 'Foreground media must be a valid URL or local upload path'),
  customCss: z.string().max(12000).optional().or(z.literal('')),
  seoTitle: z.string().max(70).optional().or(z.literal('')),
  seoDescription: z.string().max(160).optional().or(z.literal('')),
  themePreset: z.enum(['MINIMAL', 'GLASS', 'NEON', 'EDITORIAL', 'BENTO']),
  links: z.array(linkSchema).min(1, 'Add at least one link').max(50),
});

export const passwordResetRequestSchema = z.object({
  email: z.email('Enter a valid email address'),
});

export const passwordResetConfirmSchema = z.object({
  token: z.string().min(20),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
});

export type PageInput = z.infer<typeof pageSchema>;