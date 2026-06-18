export async function query(c: any, sql: string, params: any[] = []) {
  const stmt = c.env.DB.prepare(sql);
  if (params.length === 0) {
    const result = await stmt.all();
    return result;
  }
  const bound = stmt.bind(...params);
  const result = await bound.all();
  return result;
}

export async function queryOne(c: any, sql: string, params: any[] = []) {
  const stmt = c.env.DB.prepare(sql);
  if (params.length === 0) {
    const result = await stmt.first();
    return result;
  }
  const bound = stmt.bind(...params);
  const result = await bound.first();
  return result;
}

export async function execute(c: any, sql: string, params: any[] = []) {
  const stmt = c.env.DB.prepare(sql);
  if (params.length === 0) {
    const result = await stmt.run();
    return result;
  }
  const bound = stmt.bind(...params);
  const result = await bound.run();
  return result;
}

export function generateId() {
  return crypto.randomUUID();
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  const h = await hashPassword(password);
  return h === hashed;
}

export function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
