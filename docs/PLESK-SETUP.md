# Plesk setup for LinkForge

## Requirements
- Plesk with Node.js support
- PostgreSQL database
- SSH access recommended

## Steps
1. Upload the project to your application root.
2. Set the Node.js app root to the folder containing `package.json`.
3. Add environment variables from `.env.example`.
4. Run:

```bash
npm install --legacy-peer-deps
npx prisma generate
npx prisma migrate deploy
npm run build
```

5. Ensure `public/uploads` exists and is writable.
6. Use `server.js` as the startup file in Plesk.
7. Restart the app.

## Writable uploads directory
```bash
mkdir -p public/uploads
chmod 775 public/uploads
```

## Notes
- For production, replace local uploads with object storage for larger media.
- Add SMTP mail sending for password reset emails.
- Add rate limiting for auth, upload, and analytics endpoints.