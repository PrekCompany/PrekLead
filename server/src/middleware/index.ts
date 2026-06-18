import { getAuthUser } from "./auth";

export async function authMiddleware(c: any, next: () => Promise<void>) {
  const user = await getAuthUser(c);
  if (user) c.set("user", user);
  await next();
}