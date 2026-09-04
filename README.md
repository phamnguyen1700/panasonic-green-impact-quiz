# Panasonic Green Impact Quiz

React + Vite + TypeScript campaign quiz microsite.

## Tech Stack

- Vite
- React
- TypeScript
- React Router DOM
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
  config/               # Campaign copy, assets, theme, motion config
  data/                 # Quiz questions and result rules
  features/             # Screen-level feature modules
  hooks/                # Reusable React logic
  lib/                  # Shared infrastructure helpers
  services/             # Analytics and submission integrations
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

Set `VITE_GOOGLE_SHEET_ENDPOINT` to an Apps Script or webhook URL to enable result submission.
