import { Hono } from "hono";
import { query, queryOne, execute, generateId } from "../db";
import { requireAuth, AppContext } from "../middleware/auth";

async function getProfile(c: AppContext) {
  try {
    const { id } = await requireAuth(c);

    const user = await queryOne(c, "SELECT id, email, name, lastname, business_name, business_type, plan, email_verified, created_at FROM users WHERE id = ?", [id]);
    if (!user) return c.json({ error: "User not found" }, 404);
    return c.json({ user });
  } catch (err) {
    console.error("[GET PROFILE ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function updateProfile(c: AppContext) {
  try {
    const { id } = await requireAuth(c);

    const body = await c.req.json();
    const { name, lastname, business_name, business_type } = body;

    await execute(
      c,
      "UPDATE users SET name = COALESCE(?, name), lastname = COALESCE(?, lastname), business_name = COALESCE(?, business_name), business_type = COALESCE(?, business_type), updated_at = datetime('now') WHERE id = ?",
      [name || null, lastname || null, business_name || null, business_type || null, id]
    );

    const updated = await queryOne(c, "SELECT id, email, name, lastname, business_name, business_type, plan FROM users WHERE id = ?", [id]);
    return c.json({ user: updated });
  } catch (err) {
    console.error("[UPDATE PROFILE ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function deleteAccount(c: AppContext) {
  try {
    const { id, sessionId } = await requireAuth(c);

    await execute(c, "DELETE FROM users WHERE id = ?", [id]);
    await c.env.KV.delete(`session:${sessionId}`);
    return c.json({ message: "Account deleted" });
  } catch (err) {
    console.error("[DELETE ACCOUNT ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

const app = new Hono();
app.get("/profile", getProfile);
app.put("/profile", updateProfile);
app.delete("/account", deleteAccount);
export default app;
