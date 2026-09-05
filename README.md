# Panasonic Green Impact Quiz

React + Vite + TypeScript campaign quiz microsite.

## Tech Stack

- Vite
- React
- TypeScript
- React Router DOM
- Axios
- TanStack Query
- Zustand
- Tailwind CSS
- Framer Motion
- Radix UI primitives for reusable UI controls

## Architecture

```txt
src/
  main.tsx              # Vite browser entry
  App.tsx               # App routes and global providers
  app/                  # App-level flow, metadata, providers, page wrappers
  assets/               # Imported image assets
  components/           # Shared campaign UI and layout primitives
  components/ui/        # Reusable low-level UI controls
  config/               # Env, API endpoints, campaign copy, assets, theme, motion config
  data/                 # Quiz questions and result rules
  features/             # Screen-level feature modules and feature components
  hooks/                # React logic and TanStack Query hooks
  lib/                  # Shared infrastructure helpers
  services/             # Axios API client, API services, analytics
  store/                # Zustand client state
  styles/               # Global theme and campaign styles
  types/                # Shared TypeScript models
  utils/                # Storage, className, and image helpers
```

Routes are declared in `src/App.tsx`:

- `/`
- `/info`
- `/quiz`
- `/result`

Screen navigation is centralized in `src/app/screenFlow.ts`, and route metadata is applied by `src/app/RouteMeta.tsx`.

Responsive sizing tokens live in `src/config/theme.config.ts` and are mirrored to `src/styles/theme.css`.
Shared layout wrappers should use these tokens instead of page-level hardcoded container sizes.

## Development

```sh
npm install
npm run dev
```

## Production Build

```sh
npm run build
npm run preview
```

The build output is generated in `dist/`.

## Environment Variables

```env
VITE_API_BASE_URL=/api
VITE_ENABLE_API_SUBMIT=true
```

The default `/api` base URL is proxied by Vite to `http://127.0.0.1:8000` during local development, keeping admin cookies same-origin in the browser. Public quiz submission is enabled by default; set `VITE_ENABLE_API_SUBMIT=false` to temporarily skip `POST /players` during UI-only work.
