import { Hono } from "hono";
import { query, execute, generateId } from "../db";
import { requireAuth, AppContext } from "../middleware/auth";

async function connectSession(c: AppContext) {
  try {
    const session = await requireAuth(c);
    const body = await c.req.json();
    const { phone, sessionData } = body;
    if (!phone || !sessionData) return c.json({ error: "phone and sessionData required" }, 400);

    const id = generateId();
    await execute(c, "INSERT OR REPLACE INTO telegram_sessions (id, user_id, phone, session_data, connected, last_sync) VALUES (?, ?, ?, ?, 1, datetime('now'))", [id, session.id, phone, JSON.stringify(sessionData)]);
    return c.json({ message: "Telegram connected", id });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[TELEGRAM CONNECT ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function disconnectSession(c: AppContext) {
  try {
    const { id } = await requireAuth(c);
    await execute(c, "UPDATE telegram_sessions SET connected = 0 WHERE user_id = ?", [id]);
    return c.json({ message: "Telegram disconnected" });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[TELEGRAM DISCONNECT ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function getStatus(c: AppContext) {
  try {
    const { id } = await requireAuth(c);
    const rows = await query(c, "SELECT * FROM telegram_sessions WHERE user_id = ?", [id]);
    return c.json({ connected: rows.length > 0 && rows[0].connected === 1, phone: rows.length > 0 ? rows[0].phone : null });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[TELEGRAM STATUS ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

const app = new Hono();
app.post("/connect", connectSession);
app.post("/disconnect", disconnectSession);
app.get("/status", getStatus);
export default app;
