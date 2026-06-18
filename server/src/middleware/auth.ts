import type { Context } from "hono";
import type { CloudflareEnv, AppBindings } from "../types";

export interface JWTPayload {
  id: string;
  email: string;
  plan: string;
  email_verified?: number;
  name?: string;
}

export type AppContext = Context<AppBindings>;

/**
 * Extracts the Bearer session token from the Authorization header.
 */
function extractToken(c: Context): string | null {
  const authHeader = c.req.header("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.substring(7);
}

/**
 * Reads and parses a session from KV using the Bearer token.
 */
export async function getAuthUser(c: Context): Promise<JWTPayload | null> {
  const sessionId = extractToken(c);
  if (!sessionId) return null;

  const session = await c.env.KV.get(`session:${sessionId}`);
  if (!session) return null;

  try {
    return JSON.parse(session) as JWTPayload;
  } catch {
    await c.env.KV.delete(`session:${sessionId}`);
    return null;
  }
}

/**
 * Middleware that attaches the authenticated user to the context.
 * Does NOT block unauthenticated requests — use requireAuth() in handlers.
 */
export async function authMiddleware(c: AppContext, next: () => Promise<void>) {
  const user = await getAuthUser(c);
  if (user) c.set("user", user);
  await next();
}

/**
 * Requires a valid authenticated session.
 * Call this at the top of any protected route handler.
 * Returns the session payload or throws a 401 response.
 */
export async function requireAuth(c: Context): Promise<{ id: string; email: string; plan: string; sessionId: string }> {
  const sessionId = extractToken(c);
  if (!sessionId) throw new Error("Unauthorized");

  const sessionStr = await c.env.KV.get(`session:${sessionId}`);
  if (!sessionStr) throw new Error("Unauthorized");

  const session = JSON.parse(sessionStr) as JWTPayload;
  return { ...session, sessionId };
}

/**
 * Catch wrapper for route handlers that returns proper error responses.
 */
export function handleErrors(fn: (c: AppContext) => Promise<Response>) {
  return async (c: AppContext) => {
    try {
      return await fn(c);
    } catch (err: any) {
      if (err?.message === "Unauthorized") {
        return c.json({ error: "Unauthorized" }, 401);
      }
      console.error(`[HANDLER ERROR]`, err);
      return c.json({ error: "Server error" }, 500);
    }
  };
}

export function getSessionId(c: Context): string | null {
  return extractToken(c);
}
