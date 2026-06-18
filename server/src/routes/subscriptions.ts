import { Hono } from "hono";
import { query, queryOne, execute, generateId } from "../db";
import { requireAuth, AppContext } from "../middleware/auth";

async function getSubscription(c: AppContext) {
  try {
    const { id } = await requireAuth(c);
    const sub = await queryOne(c, "SELECT * FROM subscriptions WHERE user_id = ?", [id]);
    return c.json({ subscription: sub });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[GET SUBSCRIPTION ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function updateSubscription(c: AppContext) {
  try {
    const { id } = await requireAuth(c);
    const body = await c.req.json();
    const { plan } = body;
    const allowedPlans = ["starter", "pro", "business"];
    if (!allowedPlans.includes(plan)) return c.json({ error: "Invalid plan" }, 400);

    await execute(c, "UPDATE subscriptions SET plan = ?, updated_at = datetime('now') WHERE user_id = ?", [plan, id]);
    await execute(c, "UPDATE users SET plan = ?, updated_at = datetime('now') WHERE id = ?", [plan, id]);

    const sub = await queryOne(c, "SELECT * FROM subscriptions WHERE user_id = ?", [id]);
    return c.json({ subscription: sub });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[UPDATE SUBSCRIPTION ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function getUsage(c: AppContext) {
  try {
    const { id } = await requireAuth(c);
    const sub = await queryOne(c, "SELECT messages_used, leads_used, plan FROM subscriptions WHERE user_id = ?", [id]);
    const limits: any = { starter: { messages: 100, leads: 20 }, pro: { messages: 1000, leads: 200 }, business: { messages: -1, leads: -1 } };
    const planLimits = limits[sub?.plan || "starter"] || limits.starter;
    return c.json({
      usage: {
        messages: sub?.messages_used || 0,
        leads: sub?.leads_used || 0,
        plan: sub?.plan || "starter",
        limits: planLimits,
      },
    });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[GET USAGE ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function trackUsage(c: AppContext) {
  try {
    const { id } = await requireAuth(c);
    const body = await c.req.json();
    const { type, count = 1 } = body;
    if (type === "message") {
      await execute(c, "UPDATE subscriptions SET messages_used = messages_used + ? WHERE user_id = ?", [count, id]);
    } else if (type === "lead") {
      await execute(c, "UPDATE subscriptions SET leads_used = leads_used + ? WHERE user_id = ?", [count, id]);
    }
    return c.json({ message: "Usage tracked" });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[TRACK USAGE ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

const app = new Hono();
app.get("/", getSubscription);
app.put("/plan", updateSubscription);
app.get("/usage", getUsage);
app.post("/track", trackUsage);
export default app;
