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
  app/                  # App routes, flow, metadata, providers, page wrappers
    App.tsx             # Root app composition and route declarations
  assets/               # Imported image assets
  components/           # Shared campaign UI and layout primitives
  components/ui/        # Reusable low-level UI controls
  config/               # Env, API endpoints, campaign copy, assets, theme, motion config
  data/                 # Quiz questions and result rules
  features/             # Screen-level feature modules and feature components
  hooks/                # React logic grouped by domain
    admin/              # Admin auth, players query/export hooks, admin query keys
    app/                # App flow and responsive viewport hooks
    player/             # Player input/form hooks
    quiz/               # Quiz engine and timer hooks
    result/             # Result capture, sharing, and retry-safe submit hooks
  lib/                  # Shared infrastructure helpers
  services/             # API/integration services grouped by domain
    admin/              # Admin auth, players management, export download
    analytics/          # Analytics event wrapper
    api/                # Axios client and TanStack Query client
    player/             # Public player submit API and local avatar helpers
    result/             # Result payload mapping and retry-safe submit service
  store/                # Zustand client state
  styles/               # Global Tailwind entry, theme, fonts, and campaign styles
  types/                # Shared TypeScript models
  utils/                # Storage, className, image, and submission id helpers
```

Routes are declared in `src/app/App.tsx`:

- `/`
- `/info`
- `/quiz`
- `/result`

Screen navigation is centralized in `src/app/screenFlow.ts`, and route metadata is applied by `src/app/RouteMeta.tsx`.

Responsive sizing tokens live in `src/config/theme.config.ts` and are mirrored to `src/styles/theme.css`.
Shared layout wrappers should use these tokens instead of page-level hardcoded container sizes.

## Planned Backend Queue Architecture

This section is planning documentation only. It describes the intended backend
shape for high-volume campaign submissions and has not been implemented in this
frontend repository.

The backend should keep the existing layered architecture style while grouping
files by domain inside each layer. Queue adapters and worker entrypoints should
live in separate layers.

```txt
src/app/
  api/
    routes/
      auth/
        admin_auth.py
      players/
        admin_players.py
      submissions/
        players.py
  services/
    auth/
      auth_service.py
    players/
      player_query_service.py
      player_export_service.py
    submissions/
      ingestion_service.py
      processing_service.py
      idempotency_service.py
  repositories/
    auth/
      admin_repository.py
    players/
      player_repository.py
  queue/
    client.py
    common/
      retry.py
      dead_letter.py
      serialization.py
    submissions/
      submission_queue.py
      messages.py
  workers/
    submissions/
      submission_worker.py
  schemas/
    auth/
      auth.py
    players/
      player.py
    submissions/
      submission.py
  models/
    auth/
      admin.py
    players/
      player.py
  db/
    base.py
    session.py
  core/
    config.py
    pii.py
    security.py
    rate_limit.py
    exception_handlers.py
```

Planned submission flow:

```txt
Client
  -> POST /players
  -> api/routes/submissions/players.py
  -> services/submissions/ingestion_service.py
  -> queue/submissions/submission_queue.py
  -> durable queue
  -> workers/submissions/submission_worker.py
  -> services/submissions/processing_service.py
  -> repositories/players/player_repository.py
  -> PostgreSQL
```

Layer responsibilities:

- `api/routes`: HTTP boundary, request/response mapping, dependency injection.
- `services`: business use cases such as submission ingestion, processing,
  idempotency, admin querying, and export orchestration.
- `repositories`: database access only.
- `queue`: infrastructure adapters for publishing, consuming, retrying, and
  dead-lettering queued messages. Queue files are grouped by domain/use case.
- `workers`: long-running background process entrypoints that consume queued
  jobs and call services.
- `core`: shared configuration, security, PII handling, rate limiting, and
  exception handling.

The planned high-volume submit path should use idempotency keys, durable queue
messages, worker retries, dead-letter handling, short database transactions,
connection pool tuning, and indexes for `submission_id`, `created_at`, `id`,
`result`, and `name_search_hash`.

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

## Submission Idempotency

Each completed quiz run generates a `submissionId` UUID and sends it with
`POST /players`. Retry attempts reuse the same `submissionId`, allowing the
backend to return the existing record with `alreadySubmitted=true` instead of
creating duplicate campaign submissions.

Submit retries are limited to transient failures only:

- network errors / no response
- `429 Too Many Requests`
- `5xx` server errors

Validation and auth-style errors are not retried.
