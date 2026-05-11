# Gitkut API

Cloudflare Worker backend for Gitkut, built with TypeScript, Hono and Wrangler.

This is the source of truth for the Gitkut backend.

## Install

From the repository root:

```bash
pnpm install
```

Or inside this directory:

```bash
pnpm install
```

## GitHub OAuth App

Create a GitHub OAuth App:

```text
GitHub > Settings > Developer settings > OAuth Apps > New OAuth App
```

Use these local values:

```text
Homepage URL: http://localhost:5173
Authorization callback URL: http://localhost:8787/auth/github/callback
```

For the deployed Cloudflare Worker, use:

```text
Homepage URL: https://gitkut.com
Authorization callback URL: https://api.gitkut.com/auth/github/callback
```

## Local environment

Copy the Worker local variables file:

```bash
cd api
cp .env.example .env
```

Fill in:

```env
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GITHUB_CALLBACK_URL="http://localhost:8787/auth/github/callback"
FRONTEND_URL="http://localhost:5173"
CORS_ALLOWED_ORIGINS="http://localhost:5173,http://127.0.0.1:5173"
COOKIE_SECURE="false"
COOKIE_SAME_SITE="Lax"
```

Do not commit `.env`. This project uses `api/.env` as the only local backend
environment file, even when running through Wrangler.
`CORS_ALLOWED_ORIGINS` is a comma-separated allowlist for browser requests that
need credentials.

## Run locally

```bash
cd api
pnpm dev
```

Wrangler starts the Worker at `http://localhost:8787`.

Healthcheck:

```bash
curl http://localhost:8787/health
```

Expected response:

```json
{ "ok": true }
```

Start login:

```text
http://localhost:8787/auth/github
```

## Scripts

```bash
pnpm dev
pnpm typecheck
pnpm deploy
pnpm db:migrations:apply:local
pnpm db:migrations:apply:remote
```

From the repository root:

```bash
pnpm dev:api
pnpm typecheck:api
pnpm deploy:api
pnpm db:migrations:local
pnpm db:migrations:remote
```

Current deployed URL:

```text
https://api.gitkut.com
```

## D1 database

This Worker is bound to a Cloudflare D1 database named `gitkut-db` through the
`DB` binding in `wrangler.jsonc`.

The first migration creates the social data model for Gitkut:

- `users`: local Gitkut user linked to GitHub.
- `profiles`: editable Gitkut profile fields.
- `featured_repos`: repositories pinned by the user.
- `scraps`: guestbook-style messages.
- `communities` and `user_communities`: community catalog and memberships.
- `badges` and `user_badges`: trophy catalog and awards.
- `profile_views_daily`: daily aggregated profile views.

Apply migrations locally:

```bash
pnpm db:migrations:apply:local
```

Apply migrations to Cloudflare:

```bash
pnpm db:migrations:apply:remote
```

When OAuth succeeds, the callback syncs the GitHub user into `users` and
creates a default row in `profiles` if one does not exist yet.

Authenticated D1 profile endpoint:

```text
GET /api/profile
```

Public profile endpoint:

```text
GET /api/profiles/:slug
```

For example:

```text
GET /api/profiles/teles
```

This endpoint reads the public Gitkut profile from D1 and fetches recent public
repositories from GitHub by username.

Reserved profile slugs are handled in `src/slugs.ts`. Product routes such as
`api`, `auth`, `settings`, `profile`, `repos`, `communities`, `privacy`, and
`terms` are not treated as public usernames.

## Production variables

Configure these in Cloudflare:

```text
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
GITHUB_CALLBACK_URL
FRONTEND_URL
CORS_ALLOWED_ORIGINS
COOKIE_SECURE=true
COOKIE_SAME_SITE=Lax
```

Use Wrangler secrets for sensitive values:

```bash
cd api
pnpm wrangler secret put GITHUB_CLIENT_ID
pnpm wrangler secret put GITHUB_CLIENT_SECRET
```

Set public vars in `wrangler.jsonc` or in the Cloudflare dashboard:

```text
GITHUB_CALLBACK_URL=https://api.gitkut.com/auth/github/callback
FRONTEND_URL=https://gitkut.com
CORS_ALLOWED_ORIGINS=https://gitkut.com,https://www.gitkut.com
COOKIE_SECURE=true
COOKIE_SAME_SITE=Lax
```

## Security notes

- `GITHUB_CLIENT_SECRET` stays in the Worker.
- The frontend never receives the GitHub client secret.
- The access token is stored in an `httpOnly` cookie.
- Tokens are not stored in `localStorage`.
- The OAuth scope is `read:user`; private repository access is not requested.
- Access tokens are not logged.
- CORS uses an explicit origin allowlist and keeps credentials enabled only for
  the configured frontend origins.
