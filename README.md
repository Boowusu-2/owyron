# OWYRON

Official web application for **OWYRON** — an independent technology company focused on artificial intelligence, intelligent systems, software engineering, and emerging technologies.

## Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Linting:** oxlint

## Environment Configuration

Copy [.env.example](./.env.example) to `.env` (already created locally and gitignored) and configure the values you want active:

- `VITE_CONTACT_EMAIL` — Primary / General enquiries email address
- `VITE_PARTNERSHIP_EMAIL` — Partnership enquiries email address (defaults to `VITE_CONTACT_EMAIL` if unset)
- `VITE_COLLABORATION_EMAIL` — Project collaboration enquiries email address (defaults to `VITE_CONTACT_EMAIL` if unset)
- `VITE_CONTACT_FORM_ENDPOINT` — Optional HTTP POST endpoint (e.g., Formspree, Web3Forms, or a custom API) for direct form delivery
- `VITE_SITE_URL` — Canonical site URL (optional)

Add the same variables under **Vercel → Project Settings → Environment Variables**.

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
