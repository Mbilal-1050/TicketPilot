// lib/rate-limit.ts
//
// Basic in-memory rate limiter — fine for a single-instance deploy.
// For multi-region/serverless at scale, swap this for a Redis-backed
// limiter (e.g. Upstash) since in-memory state won't be shared across
// function instances.

const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) {
    return false;
  }

  bucket.count += 1;
  return true;
}
