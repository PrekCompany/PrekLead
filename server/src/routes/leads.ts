import { Hono } from "hono";
import { query, queryOne, execute, generateId } from "../db";
import { requireAuth, AppContext } from "../middleware/auth";

async function getLeads(c: AppContext) {
  try {
    const { id } = await requireAuth(c);
    const status = c.req.query("status");
    const hot = c.req.query("hot");
    let where = "WHERE user_id = ?";
    const params: any[] = [id];
    if (status && status !== "all") { where += " AND status = ?"; params.push(status); }
    if (hot === "true") { where += " AND score >= 70"; }

    const leads = await query(c, `SELECT * FROM leads ${where} ORDER BY score DESC, created_at DESC`, params);
    return c.json({ leads });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[GET LEADS ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function createLead(c: AppContext) {
  try {
    const { id } = await requireAuth(c);
    const body = await c.req.json();
    const { name, email, phone, source, score, notes } = body;

    const leadId = generateId();
    let finalScore = score || 50;
    if (source && source.includes("telegram")) finalScore = Math.min(100, (finalScore || 50) + 10);
    if (source && source.includes("referral")) finalScore = Math.min(100, (finalScore || 50) + 15);
    let status: string = "new";
    if (finalScore >= 70) status = "hot";
    else if (finalScore >= 40) status = "warm";
    else status = "cold";

    await execute(c, "INSERT INTO leads (id, user_id, name, email, phone, source, status, score, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [leadId, id, name || null, email || null, phone || null, source || null, status, finalScore, notes || null]);

    if (status === "hot") {
      await execute(c, "UPDATE subscriptions SET leads_used = leads_used + 1 WHERE user_id = ?", [id]);
    }
    return c.json({ lead: { id: leadId, status } }, 201);
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[CREATE LEAD ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function updateLeadStatus(c: AppContext) {
  try {
    const { id: userId, sessionId } = await requireAuth(c);
    const body = await c.req.json();
    const { id, status, notes, score } = body;

    const allowedStatuses = ["new", "contacted", "qualified", "proposal", "won", "lost"];
    if (status && !allowedStatuses.includes(status)) return c.json({ error: "Invalid status" }, 400);

    const updates: string[] = [];
    const params: any[] = [];
    if (status) { updates.push("status = ?"); params.push(status); }
    if (typeof notes !== "undefined") { updates.push("notes = ?"); params.push(notes); }
    if (typeof score !== "undefined") { updates.push("score = ?"); params.push(score); }
    updates.push("updated_at = datetime('now')");
    params.push(id, userId);

    await execute(c, `UPDATE leads SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`, params);
    return c.json({ message: "Lead updated" });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[UPDATE LEAD ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function deleteLead(c: AppContext) {
  try {
    const { id: userId } = await requireAuth(c);
    const body = await c.req.json();
    const { id } = body;
    await execute(c, "DELETE FROM leads WHERE id = ? AND user_id = ?", [id, userId]);
    return c.json({ message: "Lead deleted" });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[DELETE LEAD ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

const app = new Hono();
app.get("/", getLeads);
app.post("/", createLead);
app.put("/status", updateLeadStatus);
app.delete("/", deleteLead);
export default app;
