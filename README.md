# LinkForge

LinkForge is a self-hosted link-in-bio builder built with Next.js 15, TypeScript, Tailwind CSS 4, Prisma 6, PostgreSQL, and Auth.js.

## Features
- SSR public pages at `domain.com/title_123`
- Login, signup, logout, and password reset scaffolding
- Protected dashboard
- Media uploads for avatar, logo, images, and video
- Theme presets and custom CSS
- Click analytics tracking
- Publish workflow

## Setup
1. Copy `.env.example` to `.env`
2. Install dependencies
3. Generate Prisma client
4. Run migrations
5. Start development server

```bash
npm install --legacy-peer-deps
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Build
```bash
npm run build
npm start
```

## Deploy on Plesk
See `docs/PLESK-SETUP.md`.