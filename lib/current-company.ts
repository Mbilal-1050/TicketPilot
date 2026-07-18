// lib/current-company.ts
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

const DEMO_COMPANY_SLUG = "acme-outfitters";

export async function getCurrentCompanyId(): Promise<{ companyId: string; isDemo: boolean } | null> {
  const session = await getSession();
  if (session) {
    return { companyId: session.companyId, isDemo: false };
  }

  const demo = await db.company.findUnique({ where: { slug: DEMO_COMPANY_SLUG } });
  if (!demo) return null;

  return { companyId: demo.id, isDemo: true };
}
