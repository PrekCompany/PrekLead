import fs from 'fs';
import path from 'path';

const fixes = [
  // server/src/index.ts: missing Env type + add import
  {
    file: 'server/src/index.ts',
    replacements: [
      { from: 'import { Hono } from "hono";\nimport { cors } from "hono/cors";\nimport { logger } from "hono/logger";', to: 'import { Hono } from "hono";\nimport { cors } from "hono/cors";\nimport { logger } from "hono/logger";\n\ntype Env = {\n  Bindings: {\n    KV: KVNamespace;\n    DB: D1Database;\n  };\n};' },
    ]
  },
  // server/src/middleware/auth.ts: fix c.get/c.set type issues
  {
    file: 'server/src/middleware/auth.ts',
    replacements: [
      { from: 'export async function authMiddleware(c: any, next: () => Promise<void>) {', to: 'export async function authMiddleware(c: any & { get: (key: string) => unknown; set: (key: string, value: unknown) => void }, next: () => Promise<void>) {' },
    ]
  },
  // Add Hono import to each route file missing it
  {
    file: 'server/src/routes/analytics.ts',
    replacements: [{ from: 'export default app;', to: 'import { Hono } from "hono";\n\nexport default app;' }]
  },
  {
    file: 'server/src/routes/auth.ts',
    replacements: [{ from: 'export default app;', to: 'import { Hono } from "hono";\n\nexport default app;' }]
  },
  {
    file: 'server/src/routes/crm.ts',
    replacements: [{ from: 'export default app;', to: 'import { Hono } from "hono";\n\nexport default app;' }]
  },
  {
    file: 'server/src/routes/leads.ts',
    replacements: [{ from: 'export default app;', to: 'import { Hono } from "hono";\n\nexport default app;' }]
  },
  {
    file: 'server/src/routes/subscriptions.ts',
    replacements: [{ from: 'export default app;', to: 'import { Hono } from "hono";\n\nexport default app;' }]
  },
  {
    file: 'server/src/routes/telegram.ts',
    replacements: [
      { from: '    const session = JSON.parse(sessionStr);\n\n    const session = await query(c, "SELECT * FROM telegram_sessions WHERE user_id = ?", [session.id]);', to: '    const parsedSession = JSON.parse(sessionStr);\n\n    const session = await query(c, "SELECT * FROM telegram_sessions WHERE user_id = ?", [parsedSession.id]);' },
      { from: 'const app = new Hono();\napp.post("/connect", connectSession);\napp.post("/disconnect", disconnectSession);\napp.get("/status", getStatus);\n\nexport default app;', to: 'import { Hono } from "hono";\n\nconst app = new Hono();\napp.post("/connect", connectSession);\napp.post("/disconnect", disconnectSession);\napp.get("/status", getStatus);\n\nexport default app;' }
    ]
  },
  {
    file: 'server/src/routes/upload.ts',
    replacements: [
      { from: 'if (!file || !(file instanceof File))', to: 'if (!file) return c.json({ error: "No file provided" }, 400);' },
      { from: 'const app = new Hono();\napp.post("/upload", uploadFile);\n\nexport default app;', to: 'import { Hono } from "hono";\n\nconst app = new Hono();\napp.post("/upload", uploadFile);\n\nexport default app;' }
    ]
  },
  {
    file: 'server/src/routes/users.ts',
    replacements: [{ from: 'export default app;', to: 'import { Hono } from "hono";\n\nexport default app;' }]
  },
  {
    file: 'server/src/routes/webhooks.ts',
    replacements: [{ from: 'export default app;', to: 'import { Hono } from "hono";\n\nexport default app;' }]
  },
];

let fixed = 0;

for (const { file, replacements } of fixes) {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${file}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  let changed = false;

  for (const { from, to } of replacements) {
    if (content.includes(from)) {
      content = content.replace(from, to);
      changed = true;
    } else {
      console.log(`  WARN: pattern not found in ${file}: ${from.slice(0, 40)}...`);
    }
  }

  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`FIXED: ${file}`);
    fixed++;
  } else {
    console.log(`OK: ${file}`);
  }
}

console.log(`\nTotal files fixed: ${fixed}`);