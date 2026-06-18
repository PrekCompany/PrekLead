import { Context, Hono } from "hono";
import { query, queryOne, execute, hashPassword, verifyPassword, generateId, generateOTP } from "../db";
import { z } from "zod";
import type { CloudflareEnv, AppBindings } from "../types";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  lastname: z.string().optional(),
  business_name: z.string().optional(),
  business_type: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function generateSessionId() {
  return crypto.randomUUID().replace(/-/g, "");
}

function emailTemplate(title: string, body: string, otp: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px">
<table width="480" cellpadding="0" cellspacing="0" style="max-width:100%">
<tr><td style="background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:16px;padding:32px;border:1px solid rgba(99,102,241,0.2)">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding-bottom:24px">
<div style="font-size:28px;font-weight:700;background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent">PREKLEAD</div>
</td></tr>
<tr><td align="center" style="padding-bottom:8px">
<h1 style="margin:0;font-size:22px;font-weight:600;color:#f1f5f9">${title}</h1>
</td></tr>
<tr><td align="center" style="padding-bottom:24px">
<p style="margin:0;font-size:14px;color:#94a3b8;line-height:1.6">${body}</p>
</td></tr>
<tr><td align="center" style="padding-bottom:32px">
<div style="display:inline-block;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:16px 32px">
<span style="font-size:36px;font-weight:700;letter-spacing:8px;color:#6366f1;font-family:monospace">${otp}</span>
</div>
</td></tr>
<tr><td align="center">
<p style="margin:0;font-size:12px;color:#64748b">This code expires in 10 minutes. If you didn't request this, please ignore this email.</p>
</td></tr>
</table>
</td></tr>
<tr><td align="center" style="padding-top:24px">
<p style="margin:0;font-size:11px;color:#475569">&copy; 2025 PREKLEAD. All rights reserved.</p>
</td></tr>
</table>
</td></tr></table>
</body>
</html>`;
}

async function sendEmail(c: { env: Pick<CloudflareEnv, "SMTP_EMAIL" | "SMTP_PASSWORD"> }, to: string, subject: string, body: string) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = c.env;
  if (!SMTP_EMAIL || !SMTP_PASSWORD) {
    console.log(`[SMTP SKIP] To: ${to}, Subject: ${subject}`);
    return;
  }
  const trySend = async (): Promise<boolean> => {
    try {
      const response = await fetch("https://api.smtp-relay.workers.dev/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${SMTP_EMAIL}:${SMTP_PASSWORD}`)}`,
        },
        body: JSON.stringify({ to, subject, body: emailTemplate(subject, body, ""), from: SMTP_EMAIL }),
      });
      if (!response.ok) {
        console.error(`[SMTP ERROR] ${response.status} ${response.statusText}`);
        return false;
      }
      console.log(`[SMTP OK] To: ${to}, Subject: ${subject}`);
      return true;
    } catch (err) {
      console.error(`[SMTP ERROR]`, err);
      return false;
    }
  };
  const ok = await trySend();
  if (!ok) {
    console.log(`[SMTP RETRY] To: ${to} — retrying in 2s...`);
    await new Promise(r => setTimeout(r, 2000));
    await trySend();
  }
}

async function sendOTPEmail(c: { env: Pick<CloudflareEnv, "SMTP_EMAIL" | "SMTP_PASSWORD"> }, to: string, type: string, otp: string) {
  const titles: Record<string, string> = {
    verify_email: "Verify your email address",
    reset_password: "Reset your password",
  };
  const bodies: Record<string, string> = {
    verify_email: "Use the verification code below to confirm your email address and activate your PREKLEAD account.",
    reset_password: "We received a request to reset your password. Use the code below to proceed.",
  };
  const html = emailTemplate(titles[type] || "PREKLEAD", bodies[type] || "", otp);
  const { SMTP_EMAIL, SMTP_PASSWORD } = c.env;
  if (!SMTP_EMAIL || !SMTP_PASSWORD) {
    console.log(`[SMTP SKIP] To: ${to}, Type: ${type}, OTP: ${otp}`);
    return;
  }
  const trySend = async (): Promise<boolean> => {
    try {
      const response = await fetch("https://api.smtp-relay.workers.dev/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${SMTP_EMAIL}:${SMTP_PASSWORD}`)}`,
        },
        body: JSON.stringify({ to, subject: titles[type] || "PREKLEAD", body: html, from: SMTP_EMAIL }),
      });
      if (!response.ok) {
        console.error(`[SMTP ERROR] ${response.status} ${response.statusText}`);
        return false;
      }
      console.log(`[SMTP OK] OTP sent to ${to}`);
      return true;
    } catch (err) {
      console.error(`[SMTP ERROR]`, err);
      return false;
    }
  };
  const ok = await trySend();
  if (!ok) {
    console.log(`[SMTP RETRY] To: ${to} — retrying in 2s...`);
    await new Promise(r => setTimeout(r, 2000));
    await trySend();
  }
}

async function registerHandler(c: Context<AppBindings>) {
  try {
    const body = await c.req.json();
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: "Invalid input", details: parsed.error.flatten() }, 400);
    }
    const { email, password, name, lastname, business_name, business_type } = parsed.data;

    const existing = await queryOne(c, "SELECT id FROM users WHERE email = ?", [email.toLowerCase()]);
    if (existing) return c.json({ error: "User already exists" }, 409);

    const id = generateId();
    const hashedPassword = await hashPassword(password);
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await execute(c, "INSERT INTO users (id, email, password, name, lastname, business_name, business_type, email_verified) VALUES (?, ?, ?, ?, ?, ?, ?, 0)", [
      id,
      email.toLowerCase(),
      hashedPassword,
      name || null,
      lastname || null,
      business_name || null,
      business_type || "individual",
    ]);

    await execute(c, "INSERT INTO subscriptions (id, user_id, plan, status) VALUES (?, ?, 'starter', 'active')", [generateId(), id]);
    await execute(c, "INSERT INTO otp_codes (id, email, code, type, expires_at) VALUES (?, ?, ?, 'verify_email', ?)", [generateId(), email.toLowerCase(), otp, expiresAt]);

    await sendOTPEmail(c, email, "verify_email", otp);
    return c.json({ message: "User registered. Check email for verification code.", userId: id }, 201);
  } catch (err) {
    console.error("[REGISTER ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function loginHandler(c: Context<AppBindings>) {
  try {
    const body = await c.req.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: "Invalid input", details: parsed.error.flatten() }, 400);
    }
    const { email, password } = parsed.data;

    const user = await queryOne(c, "SELECT id, email, password, name, lastname, business_name, plan, email_verified FROM users WHERE email = ?", [email.toLowerCase()]);
    if (!user) return c.json({ error: "Invalid credentials" }, 401);

    const valid = await verifyPassword(password, user.password);
    if (!valid) return c.json({ error: "Invalid credentials" }, 401);

    const sessionId = generateSessionId();
    const sessionData = { id: user.id, email: user.email, plan: user.plan, email_verified: user.email_verified, name: user.name };

    await c.env.KV.put(`session:${sessionId}`, JSON.stringify(sessionData), { expirationTtl: 60 * 60 * 24 * 7 });
    await execute(c, "INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)", [sessionId, user.id, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()]);

    return c.json({
      message: "Login successful",
      token: sessionId,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        business_name: user.business_name,
        plan: user.plan,
        email_verified: user.email_verified,
      },
    });
  } catch (err) {
    console.error("[LOGIN ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function logoutHandler(c: Context<AppBindings>) {
  try {
    const authHeader = c.req.header("authorization");
    const sessionId = authHeader?.replace("Bearer ", "");
    if (sessionId) {
      await c.env.KV.delete(`session:${sessionId}`);
      await execute(c, "DELETE FROM sessions WHERE id = ?", [sessionId]);
    }
    return c.json({ message: "Logged out" });
  } catch (err) {
    console.error("[LOGOUT ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function verifyOTPHandler(c: Context<AppBindings>) {
  try {
    const body = await c.req.json();
    const { email, code } = body;
    if (!email || !code) return c.json({ error: "Email and code required" }, 400);

    const otpRecord = await queryOne(c, "SELECT id, expires_at FROM otp_codes WHERE email = ? AND code = ? AND type = 'verify_email' ORDER BY created_at DESC LIMIT 1", [email.toLowerCase(), code]);
    if (!otpRecord) return c.json({ error: "Invalid code" }, 400);
    if (new Date(otpRecord.expires_at) < new Date()) return c.json({ error: "Code expired" }, 400);

    await execute(c, "UPDATE users SET email_verified = 1 WHERE email = ?", [email.toLowerCase()]);
    await execute(c, "DELETE FROM otp_codes WHERE id = ?", [otpRecord.id]);
    return c.json({ message: "Email verified" });
  } catch (err) {
    console.error("[VERIFY OTP ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function resetPasswordRequestHandler(c: Context<AppBindings>) {
  try {
    const body = await c.req.json();
    const { email } = body;
    if (!email) return c.json({ error: "Email required" }, 400);

    const user = await queryOne(c, "SELECT id FROM users WHERE email = ?", [email.toLowerCase()]);
    if (user) {
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      await execute(c, "INSERT INTO otp_codes (id, email, code, type, expires_at) VALUES (?, ?, ?, 'reset_password', ?)", [generateId(), email.toLowerCase(), otp, expiresAt]);
      await sendOTPEmail(c, email, "reset_password", otp);
    }
    return c.json({ message: "If user exists, reset email sent" });
  } catch (err) {
    console.error("[RESET PASSWORD ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

async function resetPasswordConfirmHandler(c: Context<AppBindings>) {
  try {
    const body = await c.req.json();
    const { email, code, newPassword } = body;
    if (!email || !code || !newPassword) return c.json({ error: "All fields required" }, 400);

    const otpRecord = await queryOne(c, "SELECT id, expires_at FROM otp_codes WHERE email = ? AND code = ? AND type = 'reset_password' ORDER BY created_at DESC LIMIT 1", [email.toLowerCase(), code]);
    if (!otpRecord) return c.json({ error: "Invalid code" }, 400);
    if (new Date(otpRecord.expires_at) < new Date()) return c.json({ error: "Code expired" }, 400);

    const hashedPassword = await hashPassword(newPassword);
    await execute(c, "UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email.toLowerCase()]);
    await execute(c, "DELETE FROM otp_codes WHERE id = ?", [otpRecord.id]);
    return c.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("[RESET PASSWORD ERROR]", err);
    return c.json({ error: "Server error" }, 500);
  }
}

const app = new Hono<{ Bindings: CloudflareEnv }>();
app.post("/register", registerHandler);
app.post("/login", loginHandler);
app.post("/logout", logoutHandler);
app.post("/verify-otp", verifyOTPHandler);
app.post("/reset-password/request", resetPasswordRequestHandler);
app.post("/reset-password/confirm", resetPasswordConfirmHandler);
export default app;
