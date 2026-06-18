import type { Context } from "hono";

/**
 * Complete Cloudflare Workers bindings for PREKLEAD.
 * Maps 1:1 to wrangler.toml.
 */
export type CloudflareEnv = {
  DB: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
  AI: Ai;
  SMTP_EMAIL: string;
  SMTP_PASSWORD: string;
  TELEGRAM_API_ID: string;
  TELEGRAM_API_HASH: string;
  APP_URL: string;
};

/** Hono app bindings — combine env + custom variables. */
export type AppBindings = {
  Bindings: CloudflareEnv;
  Variables: {
    user?: {
      id: string;
      email: string;
      plan: string;
      email_verified?: number;
      name?: string;
    };
  };
};

/** Typed Hono context for PREKLEAD handlers. */
export type AppContext = Context<AppBindings>;
