# EUREKA — Ignite: Discovery

Official web application for **EUREKA**, designed around a winter aurora and frozen-discovery visual language.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Motion & Lucide Icons

## Local Development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

## Production Build & Verification

```bash
npm run lint
npm run build
npm run preview
```

## Editing Event Content

All editable content—including tracks, sample prize tiers, sponsor placeholder slots, draft FAQs, contact placeholders, and external registration URLs—is centralized in:

- `src/config/eventData.ts`

Static visual assets live in `public/assets/`:

- `public/assets/eureka-bg.png`
- `public/assets/eureka-hero-typography.png`
- `public/assets/eureka-frost-edge.png`

All asset URLs resolve through `import.meta.env.BASE_URL` via `src/utils/assets.ts`, ensuring assets load properly both at root (`/`) and under GitHub Pages repository subpaths (`/<repo-name>/`).

## GitHub Pages Deployment

This repository includes `.github/workflows/deploy.yml`, which automatically builds and deploys the `dist/` bundle to GitHub Pages on every push to `main` and supports manual runs via `workflow_dispatch`.

### Dynamic Base Path

`vite.config.ts` automatically determines the `base` path:
- In GitHub Actions (`GITHUB_ACTIONS=true`), it reads `GITHUB_REPOSITORY` and sets `base` to `/<repo-name>/` (or `/` for `<username>.github.io` user/org sites).
- You can also override it explicitly with `VITE_BASE_PATH=/custom-path/ npm run build`.

### One-Time Repository Setup on GitHub

1. Push this codebase to the `main` branch of your GitHub repository.
2. Open your repository **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Wait for the **Deploy EUREKA to GitHub Pages** workflow to finish (or trigger it manually under **Actions → Deploy EUREKA to GitHub Pages → Run workflow**).
