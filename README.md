# Lumen — Photography Client Galleries

A lean, premium photography client gallery platform — admin studio + public client galleries.

Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn-style components · Lucide icons.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Routes

### Auth
- /login · /register · /forgot-password · /reset-password · /verify-email

### Admin
- /dashboard · /dashboard/storage · /dashboard/activity · /dashboard/downloads · /dashboard/favorites
- /collections · /collections/new · /collections/[id] (+ sets, media, settings, settings/privacy, settings/downloads, settings/design, favorites, downloads, activity)
- /folders · /folders/new · /folders/[id]
- /sets/[id] · /sets/[id]/media · /sets/[id]/upload
- /media · /media/[id]
- /favorites · /downloads · /activity
- /profile · /profile/stats

### Public gallery
- /galleries/[slug] · /galleries/[slug]/access · /galleries/[slug]/sets/[setSlug]
- /folders/[slug]/public
- /favorites/[token]
- /download-jobs/[id]

## Mock data

All data is mocked in `lib/mock-data.ts`. The API layer in `lib/api/*` returns promises so it is trivial to swap to a Django REST backend.
