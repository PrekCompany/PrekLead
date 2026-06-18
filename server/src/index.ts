import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import subscriptionRoutes from "./routes/subscriptions";
import webhookRoutes from "./routes/webhooks";
import leadsRoutes from "./routes/leads";
import crmRoutes from "./routes/crm";
import telegramRoutes from "./routes/telegram";
import analyticsRoutes from "./routes/analytics";
import uploadRoutes from "./routes/upload";
import { authMiddleware } from "./middleware/auth";
import type { CloudflareEnv } from "./types";

const app = new Hono<{ Bindings: CloudflareEnv }>();

app.use("*", logger());
app.use(
  "/api/*",
  cors({
    origin: (origin) => origin,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

/** Attach auth user to all /api/* routes. */
app.use("/api/*", authMiddleware);

app.route("/api/auth", authRoutes);
app.route("/api/users", userRoutes);
app.route("/api/subscriptions", subscriptionRoutes);
app.route("/api/webhook", webhookRoutes);
app.route("/api/leads", leadsRoutes);
app.route("/api/crm", crmRoutes);
app.route("/api/telegram", telegramRoutes);
app.route("/api/analytics", analyticsRoutes);
app.route("/api/upload", uploadRoutes);

app.get("/api/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

app.onError((err, c) => {
  console.error(`[SERVER ERROR] ${err.message}`);
  return c.json({ error: "Internal Server Error", message: err.message }, 500);
});

export default app;
