import { Hono } from "hono";
import { requireAuth, AppContext } from "../middleware/auth";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_SIZE = 5 * 1024 * 1024;

async function uploadFile(c: AppContext) {
  try {
    const { sessionId } = await requireAuth(c);

    const formData = await c.req.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof File)) return c.json({ error: "No file provided" }, 400);
    if (!ALLOWED_TYPES.includes(file.type)) return c.json({ error: "Invalid file type" }, 400);
    if (file.size > MAX_SIZE) return c.json({ error: "File too large (max 5MB)" }, 400);

    const key = `uploads/${crypto.randomUUID()}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();
    await c.env.R2.put(key, arrayBuffer, {
      httpMetadata: { contentType: file.type },
      customMetadata: { uploadedBy: sessionId, originalName: file.name },
    });

    return c.json({ url: `/uploads/${key}`, key });
  } catch (err: any) {
    if (err?.message === "Unauthorized") return c.json({ error: "Unauthorized" }, 401);
    console.error("[UPLOAD ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

const app = new Hono();
app.post("/", uploadFile);
export default app;
