import { Hono } from "hono";
import { query, queryOne, execute, generateId } from "../db";
import { requireAuth, AppContext } from "../middleware/auth";

async function getCustomers(c: AppContext) {
  try {
    const { id } = await requireAuth(c);
    const leads = await query(c, "SELECT * FROM leads WHERE user_id = ? ORDER BY score DESC, created_at DESC", [id]);
    return c.json({ customers: leads });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[GET CUSTOMERS ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function getCustomerHistory(c: AppContext) {
  try {
    await requireAuth(c);
    const leadId = c.req.query("lead_id");
    if (!leadId) return c.json({ error: "lead_id required" }, 400);

    const messages = await query(c, "SELECT * FROM messages WHERE lead_id = ? ORDER BY created_at DESC", [leadId]);
    return c.json({ messages });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[GET HISTORY ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function addAINote(c: AppContext) {
  try {
    const session = await requireAuth(c);
    const body = await c.req.json();
    const { lead_id, note } = body;
    if (!lead_id || !note) return c.json({ error: "lead_id and note required" }, 400);

    const id = generateId();
    await execute(c, "INSERT INTO messages (id, user_id, lead_id, content, direction, channel) VALUES (?, ?, ?, ?, 'note', 'ai')", [
      id, session.id, lead_id, `[AI Note] ${note}`
    ]);
    return c.json({ message: "Note added", id });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[ADD NOTE ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function getStats(c: AppContext) {
  try {
    const { id } = await requireAuth(c);
    const leads = await query(c, "SELECT count(*) as total, sum(CASE WHEN status = 'hot' THEN 1 ELSE 0 END) as hot, sum(CASE WHEN status = 'warm' THEN 1 ELSE 0 END) as warm, sum(CASE WHEN status = 'cold' THEN 1 ELSE 0 END) as cold FROM leads WHERE user_id = ?", [id]);
    const messages = await query(c, "SELECT count(*) as total, sum(CASE WHEN direction = 'inbound' THEN 1 ELSE 0 END) as inbound, sum(CASE WHEN direction = 'outbound' THEN 1 ELSE 0 END) as outbound FROM messages WHERE user_id = ?", [id]);
    return c.json({ leads: leads[0], messages: messages[0] });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[GET STATS ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

const app = new Hono();
app.get("/customers", getCustomers);
app.get("/history", getCustomerHistory);
app.post("/notes", addAINote);
app.get("/stats", getStats);
export default app;
