/**
 * Tiny KV store: Upstash Redis REST when configured, in-memory fallback for dev.
 * Env: UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL + KV_REST_API_TOKEN).
 */

export interface StoredLetter {
  id: string;
  nicheId: string;
  nicheName: string;
  createdAt: number;
  text: string;
}

export interface UserRecord {
  email: string;
  credits: number;
  createdAt: number;
  letters: StoredLetter[];
}

const mem = (globalThis as unknown as { __akmem?: Map<string, string> }).__akmem ||
  new Map<string, string>();
(globalThis as unknown as { __akmem?: Map<string, string> }).__akmem = mem;

function redisConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function cmd(args: (string | number)[]): Promise<unknown> {
  const cfg = redisConfig();
  if (!cfg) return null;
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const data = await res.json();
  return data.result;
}

async function kvGet(key: string): Promise<string | null> {
  if (!redisConfig()) return mem.get(key) ?? null;
  const r = await cmd(["GET", key]);
  return typeof r === "string" ? r : null;
}

async function kvSet(key: string, value: string): Promise<void> {
  if (!redisConfig()) {
    mem.set(key, value);
    return;
  }
  await cmd(["SET", key, value]);
}

const norm = (email: string) => email.trim().toLowerCase();

export async function getUser(email: string): Promise<UserRecord | null> {
  const raw = await kvGet(`user:${norm(email)}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserRecord;
  } catch {
    return null;
  }
}

export async function saveUser(user: UserRecord): Promise<void> {
  // Keep the record bounded.
  if (user.letters.length > 50) user.letters = user.letters.slice(0, 50);
  await kvSet(`user:${norm(user.email)}`, JSON.stringify(user));
}

export async function getOrCreateUser(email: string): Promise<UserRecord> {
  const existing = await getUser(email);
  if (existing) return existing;
  const user: UserRecord = {
    email: norm(email),
    credits: 0,
    createdAt: Date.now(),
    letters: [],
  };
  await saveUser(user);
  return user;
}

export async function isSessionConsumed(sessionId: string): Promise<boolean> {
  return (await kvGet(`consumed:${sessionId}`)) !== null;
}

export async function markSessionConsumed(sessionId: string): Promise<void> {
  await kvSet(`consumed:${sessionId}`, String(Date.now()));
}
