// lib/whop.ts
// Central Whop client + plan mapping used across the app.

import Whop from "@whop/sdk";

if (!process.env.WHOP_API_KEY) {
  throw new Error("WHOP_API_KEY is not set");
}

export const whopApi = new Whop({
  apiKey: process.env.WHOP_API_KEY,
});

export const PLAN_ID_MAP: Record<string, "STARTER" | "GROWTH" | "SCALE"> = {
  [process.env.WHOP_STARTER_PLAN_ID ?? ""]: "STARTER",
  [process.env.WHOP_GROWTH_PLAN_ID ?? ""]: "GROWTH",
  [process.env.WHOP_SCALE_PLAN_ID ?? ""]: "SCALE",
};

export const PLAN_LIMITS: Record<"FREE" | "STARTER" | "GROWTH" | "SCALE", { tickets: number; connections: number }> = {
  FREE: { tickets: 20, connections: 1 },
  STARTER: { tickets: 200, connections: 1 },
  GROWTH: { tickets: 1500, connections: 3 },
  SCALE: { tickets: Infinity, connections: Infinity },
};

export function planTierFromProductId(productId: string) {
  return PLAN_ID_MAP[productId] ?? null;
}

export function getCheckoutUrl(planId: string, metadata?: Record<string, string>) {
  const params = new URLSearchParams({
    ...(metadata ?? {}),
  });
  const query = params.toString();
  return `https://whop.com/checkout/${planId}${query ? `?${query}` : ""}`;
}
