// app/api/account/export/route.ts
//
// GDPR-friendly data export — returns everything stored for a company
// as JSON. Gate this behind real auth before deploying (only the
// company's own OWNER should be able to call this for their companyId).

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const companyId = req.nextUrl.searchParams.get("companyId");
  if (!companyId) {
    return NextResponse.json({ error: "companyId is required" }, { status: 400 });
  }

  // TODO: verify the requesting user is an OWNER of this companyId before returning data

  const company = await db.company.findUnique({
    where: { id: companyId },
    include: {
      users: true,
      helpdeskConnections: { select: { id: true, provider: true, status: true, externalDomain: true, createdAt: true } }, // omit tokens
      tickets: true,
      routingRules: true,
      knowledgeBaseDocs: true,
      subscription: true,
      auditLogs: true,
    },
  });

  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  return NextResponse.json(company, {
    headers: { "Content-Disposition": `attachment; filename="ticketpilot-export-${companyId}.json"` },
  });
}
