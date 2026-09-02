import { mkdir, writeFile } from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';

const allowedMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
]);

export async function saveUploadedFile(file: File) {
  if (!allowedMimeTypes.has(file.type)) throw new Error('Unsupported file type');

  const maxSize = file.type.startsWith('video/') ? 30 * 1024 * 1024 : 8 * 1024 * 1024;
  if (file.size > maxSize) throw new Error('File too large');

  const ext = path.extname(file.name) || (file.type.startsWith('video/') ? '.mp4' : '.bin');
  const filename = `${crypto.randomUUID()}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadDir, { recursive: true });
  const bytes = await file.arrayBuffer();
  await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));

  return `/uploads/${filename}`;
}