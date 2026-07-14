// lib/plan-gate.ts
//
// Server-side plan gating. Never trust client-side checks alone —
// always call requirePlan() inside API routes / server actions
// before running gated logic.

import { db } from "@/lib/db";
import { PLAN_LIMITS } from "@/lib/whop";

export class PlanLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PlanLimitError";
  }
}

const TIER_RANK = { FREE: 0, STARTER: 1, GROWTH: 2, SCALE: 3 } as const;

/**
 * Throws if the company's current plan is below the required tier.
 * Usage: await requirePlan(companyId, "GROWTH")
 */
export async function requirePlan(companyId: string, minimumTier: keyof typeof TIER_RANK) {
  const company = await db.company.findUniqueOrThrow({ where: { id: companyId } });

  if (TIER_RANK[company.planTier] < TIER_RANK[minimumTier]) {
    throw new PlanLimitError(
      `This feature requires the ${minimumTier} plan or higher. Current plan: ${company.planTier}.`
    );
  }

  return company;
}

/**
 * Throws if the company has exceeded its monthly ticket allowance.
 */
export async function requireTicketQuota(companyId: string) {
  const company = await db.company.findUniqueOrThrow({ where: { id: companyId } });
  const limit = company.ticketLimitOverride ?? PLAN_LIMITS[company.planTier].tickets;

  if (company.ticketsUsedThisPeriod >= limit) {
    throw new PlanLimitError(
      `Monthly ticket limit reached (${limit}). Upgrade your plan to process more tickets.`
    );
  }

  return company;
}

/**
 * Throws if the company has reached its helpdesk connection limit.
 */
export async function requireConnectionQuota(companyId: string) {
  const company = await db.company.findUniqueOrThrow({
    where: { id: companyId },
    include: { helpdeskConnections: true },
  });
  const limit = PLAN_LIMITS[company.planTier].connections;

  if (company.helpdeskConnections.length >= limit) {
    throw new PlanLimitError(
      `Connection limit reached (${limit}). Upgrade your plan to connect more helpdesks.`
    );
  }

  return company;
}
