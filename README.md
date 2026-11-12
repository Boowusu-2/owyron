# OWYRON

Official web application for **OWYRON** — an independent technology company focused on artificial intelligence, intelligent systems, software engineering, and emerging technologies.

## Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Linting:** oxlint

## Local Development

```bash
npm install
npm run dev
```

## Verification & Production Build

```bash
npm run lint
npm run build
npm run preview
```

## Vercel Deployment

The repository includes [vercel.json](./vercel.json) configured for Vite (`npm run build`, output directory `dist`, SPA rewrites, and security headers).

1. Push this repository to `https://github.com/Boowusu-2/owyron.git`.
2. Import the repository in **Vercel** — framework preset **Vite** and output directory `dist` will be picked up automatically.
3. Update the placeholder contact identifiers in `src/data/siteContent.ts` before going live.
