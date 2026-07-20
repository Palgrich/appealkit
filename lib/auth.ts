import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";

export const AUTH_COOKIE = "ak_auth";

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) {
    console.warn("AUTH_SECRET not set — using insecure dev secret");
    return "dev-secret-change-me";
  }
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Token format: base64url(email)|expiryMs|hmac */
export function makeToken(email: string, ttlDays: number): string {
  const exp = Date.now() + ttlDays * 24 * 60 * 60 * 1000;
  const body = `${Buffer.from(email.trim().toLowerCase()).toString("base64url")}|${exp}`;
  return `${body}|${sign(body)}`;
}

export function verifyToken(token: string): string | null {
  const parts = token.split("|");
  if (parts.length !== 3) return null;
  const [emailB64, expStr, mac] = parts;
  const body = `${emailB64}|${expStr}`;
  const expected = sign(body);
  try {
    if (
      mac.length !== expected.length ||
      !timingSafeEqual(Buffer.from(mac), Buffer.from(expected))
    ) {
      return null;
    }
  } catch {
    return null;
  }
  if (Number(expStr) < Date.now()) return null;
  try {
    return Buffer.from(emailB64, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

export function getAuthedEmail(req: NextRequest): string | null {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}
