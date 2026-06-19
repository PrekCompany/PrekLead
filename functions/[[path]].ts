/**
 * Combined Cloudflare Pages Function — single project, single deployment.
 *
 *   /api/*  → Hono server (auth, leads, crm, analytics, etc.)
 *   assets/* → served directly from Pages as static files
 *   /*       → index.html (SPA fallback — TanStack Router handles client routing)
 */
import app from "../server/src/index";

export async function onRequest(context: EventContext<unknown, string, unknown>) {
  const { request, env } = context;
  const url = new URL(request.url);
  const { pathname } = url;

  // ── 1. API routes → Hono ─────────────────────────────────────────
  if (pathname.startsWith("/api/")) {
    return app.fetch(request, env, context);
  }

  // ── 2. Static assets (CSS, JS, images) → serve from Pages ───────
  if (pathname.startsWith("/assets/") || pathname.startsWith("/robots.txt")) {
    try {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) return asset;
    } catch {
      // ASSETS.fetch may throw for missing files — fall through to SPA
    }
  }

  // ── 3. SPA fallback — every non-API, non-asset path serves index.html ──
  try {
    const index = await env.ASSETS.fetch(new URL("/index.html", request.url));
    if (index.status !== 404) return index;
  } catch {
    // Fallback if ASSETS isn't available
  }

  return new Response(
    "<!DOCTYPE html><html><head><title>PREKLEAD</title></head><body><h1>Not Found</h1></body></html>",
    {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    },
  );
}
