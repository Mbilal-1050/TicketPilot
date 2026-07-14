// lib/whop.ts
// Central Whop client + plan mapping used across the app.

import { WhopServerSdk } from "@whop/sdk";

if (!process.env.WHOP_API_KEY) {
  throw new Error("WHOP_API_KEY is not set");
}

export const whopApi = WhopServerSdk({
  appApiKey: process.env.WHOP_API_KEY,
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID,
});

// Maps Whop Product IDs -> internal plan tiers.
// Keep this in sync with the products created in the Whop dashboard.
export const PLAN_ID_MAP: Record<string, "STARTER" | "GROWTH" | "SCALE"> = {
  [process.env.WHOP_STARTER_PLAN_ID ?? ""]: "STARTER",
  [process.env.WHOP_GROWTH_PLAN_ID ?? ""]: "GROWTH",
  [process.env.WHOP_SCALE_PLAN_ID ?? ""]: "SCALE",
};

export const PLAN_LIMITS: Record<"FREE" | "STARTER" | "GROWTH" | "SCALE", { tickets: number; connections: number }> = {
  FREE: { tickets: 20, connections: 1 },       // trial / sample data mode
  STARTER: { tickets: 200, connections: 1 },
  GROWTH: { tickets: 1500, connections: 3 },
  SCALE: { tickets: Infinity, connections: Infinity },
};

export function planTierFromProductId(productId: string) {
  return PLAN_ID_MAP[productId] ?? null;
}

// Builds a checkout link for a given plan, redirecting back into the app after purchase.
export function getCheckoutUrl(planProductId: string, metadata?: Record<string, string>) {
  const params = new URLSearchParams({
    ...(metadata ?? {}),
  });
  // Whop checkout links follow: https://whop.com/checkout/{productId}
  return `https://whop.com/checkout/${planProductId}/?${params.toString()}`;
}
