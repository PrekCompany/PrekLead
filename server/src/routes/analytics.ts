import { Hono } from "hono";
import { query, queryOne, execute, generateId } from "../db";
import { requireAuth, AppContext } from "../middleware/auth";

async function getAnalyticsSummary(c: AppContext) {
  try {
    const { id } = await requireAuth(c);

    const totalMessages = await queryOne(c, "SELECT count(*) as cnt FROM messages WHERE user_id = ?", [id]);
    const totalLeads = await queryOne(c, "SELECT count(*) as cnt FROM leads WHERE user_id = ?", [id]);
    const hotLeads = await queryOne(c, "SELECT count(*) as cnt FROM leads WHERE user_id = ? AND score >= 70", [id]);
    const avgScore = await queryOne(c, "SELECT avg(score) as avg FROM leads WHERE user_id = ? AND score IS NOT NULL", [id]);

    const sub = await queryOne(c, "SELECT plan FROM subscriptions WHERE user_id = ?", [id]);
    const planLimits: any = { starter: 99, pro: 299, business: 499 };
    const avgRevenue = (totalLeads?.cnt || 0) * (planLimits[sub?.plan || "starter"] || 99) * 0.15;

    return c.json({
      messages: totalMessages?.cnt || 0,
      leads: totalLeads?.cnt || 0,
      hotLeads: hotLeads?.cnt || 0,
      avgScore: Math.round(avgScore?.avg || 0),
      estimatedRevenue: Math.round(avgRevenue),
      plan: sub?.plan || "starter",
    });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[ANALYTICS ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function getConversionRate(c: AppContext) {
  try {
    const { id } = await requireAuth(c);

    const won = await queryOne(c, "SELECT count(*) as cnt FROM leads WHERE user_id = ? AND status = 'won'", [id]);
    const lost = await queryOne(c, "SELECT count(*) as cnt FROM leads WHERE user_id = ? AND status = 'lost'", [id]);
    const total = (won?.cnt || 0) + (lost?.cnt || 0);
    const rate = total > 0 ? Math.round(((won?.cnt || 0) / total) * 100) : 0;
    return c.json({ rate, won: won?.cnt || 0, lost: lost?.cnt || 0 });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[CONVERSION ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

const app = new Hono();
app.get("/summary", getAnalyticsSummary);
app.get("/conversion", getConversionRate);
export default app;
