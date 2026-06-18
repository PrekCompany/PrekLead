import { Context, Hono } from "hono";
import type { CloudflareEnv } from "../types";

async function handleIncomingMessage(c: Context<{ Bindings: CloudflareEnv }>) {
  try {
    const body = await c.req.json();
    const { text, lead_id, user_id, channel } = body;

    let classification = "message";
    let intent = "general";
    let score = 50;
    let reply = "";

    if (c.env.AI && text) {
      try {
        const aiResponse = await c.env.AI.run("@cf/meta/llama-3-8b-instruct", {
          prompt: JSON.stringify({
            task: "classify",
            input: text,
            instruction: "Return JSON with: classification (lead_message|question|complaint|spam|general), intent (buy|support|price|demo|other), score (0-100), reply (short response)"
          }),
        });
        const aiText = typeof aiResponse === "string" ? aiResponse : (aiResponse as any).response || "";
        try {
          const parsed = JSON.parse(aiText.match(/\{[\s\S]*\}/)?.[0] || "{}");
          classification = parsed.classification || "general";
          intent = parsed.intent || "general";
          score = typeof parsed.score === "number" ? parsed.score : 50;
          reply = parsed.reply || "";
        } catch {
          const lower = text.toLowerCase();
          if (lower.includes("купить") || lower.includes("цена") || lower.includes("сколько")) { classification = "lead_message"; intent = "buy"; score = 80; reply = "Спасибо за интерес! Подскажите, что именно вас интересует?"; }
          else if (lower.includes("демо") || lower.includes("пробный")) { classification = "lead_message"; intent = "demo"; score = 70; reply = "Отлично! Расскажите, пожалуйста, о вашем бизнесе."; }
          else if (lower.includes("помощь") || lower.includes("проблема")) { classification = "question"; intent = "support"; score = 40; reply = "Понял вас, давайте разберемся. Опишите подробнее."; }
          else { score = 30; reply = "Спасибо за сообщение! Чем могу помочь?"; }
          if (lower.includes("дорого") || lower.includes("дешево") || lower.includes("скидка")) score = 60;
        }
      } catch {
        score = 50;
        reply = "Спасибо за сообщение!";
      }
    }

    if (c.env.DB) {
      const stmt = c.env.DB.prepare(
        "INSERT INTO messages (id, user_id, lead_id, direction, channel, content, ai_classification, ai_intent, ai_score, ai_reply) VALUES (?, ?, ?, 'inbound', ?, ?, ?, ?, ?, ?)"
      );
      await stmt.bind(
        crypto.randomUUID(), user_id || "", lead_id || null,
        channel || "telegram", text || "", classification, intent, score, reply
      ).run();
    }

    return c.json({ classification, intent, score, reply });
  } catch (err) {
    console.error("[WEBHOOK ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function generateAIReply(c: Context<{ Bindings: CloudflareEnv }>) {
  try {
    const body = await c.req.json();
    const { message, context } = body;
    if (!c.env.AI) return c.json({ reply: "AI unavailable" });

    const prompt = `You are a business assistant. Message: "${message}". Context: ${JSON.stringify(context || {})}. Generate a professional short reply.`;
    const response = await c.env.AI.run("@cf/meta/llama-3-8b-instruct", { prompt });
    const reply = typeof response === "string" ? response : (response as any).response || "";
    return c.json({ reply });
  } catch (err) {
    console.error("[AI REPLY ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

const app = new Hono<{ Bindings: CloudflareEnv }>();
app.post("/message", handleIncomingMessage);
app.post("/reply", generateAIReply);
export default app;
