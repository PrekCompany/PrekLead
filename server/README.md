# PREKLEAD Server

Cloudflare Workers backend for the PREKLEAD AI Business OS.

## Tech Stack

- **Runtime:** Cloudflare Workers
- **Framework:** Hono.js (Express-like routing)
- **Database:** D1 (SQLite-compatible)
- **Cache/Sessions:** KV
- **Storage:** R2
- **AI:** Workers AI (Llama 3)

## Setup

```bash
npm install
```

## Local Development

```bash
# Start local dev server
npm run dev

# The server will be available at http://localhost:8787
```

## Database (D1)

```bash
# Create the database (first time only)
npm run db:create

# Generate a new migration
npm run db:generate "description"

# Apply migrations
npm run db:migrate

# For local dev, D1 runs automatically via wrangler
```

## KV & R2

```bash
# Create KV namespace
npm run kv:create

# Create R2 bucket
npm run r2:create
```

## Environment Variables

Copy `.env.example` to `.dev.vars` and fill in values:

```bash
cp .env.example .dev.vars
```

Required variables:
- `SMTP_EMAIL` / `SMTP_PASSWORD` — Email sending
- `TELEGRAM_API_ID` / `TELEGRAM_API_HASH` — Telegram integration
- `APP_URL` — Frontend URL for CORS

## Deployment

```bash
# Deploy to Cloudflare Workers
npm run deploy
```

## API Endpoints

| Prefix | Description |
|--------|-------------|
| `/api/auth` | Register, login, logout, verify email, reset password |
| `/api/users` | Profile management |
| `/api/subscriptions` | Plan management, usage tracking |
| `/api/leads` | Lead CRUD, status management |
| `/api/crm` | Customer profiles, message history, AI notes |
| `/api/telegram` | Telegram session management |
| `/api/analytics` | Dashboard analytics, conversion |
| `/api/upload` | File upload to R2 |
| `/api/webhook` | AI message processing |

## Project Structure

```
server/
├── src/
│   ├── index.ts          # App entry point, route registration
│   ├── db/
│   │   ├── index.ts      # DB helpers (query, execute, hash, OTP)
│   │   └── schema.sql    # Database schema
│   ├── middleware/
│   │   ├── auth.ts       # Auth middleware, requireAuth, error handler
│   │   └── index.ts      # Auth middleware wrapper
│   └── routes/
│       ├── auth.ts       # Authentication endpoints
│       ├── users.ts      # User profile endpoints
│       ├── subscriptions.ts
│       ├── leads.ts
│       ├── crm.ts
│       ├── telegram.ts
│       ├── analytics.ts
│       ├── upload.ts
│       └── webhooks.ts   # AI message processing
├── wrangler.toml         # Cloudflare Workers config
├── .dev.vars             # Local environment variables
└── package.json
```
