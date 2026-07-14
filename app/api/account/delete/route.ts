// app/api/account/delete/route.ts
//
// GDPR-friendly full workspace deletion. Cascades via Prisma's onDelete:
// Cascade relations defined in schema.prisma — deleting the Company row
// removes all associated Users, Tickets, Connections, etc.
//
// TODO: gate behind real auth + require re-confirmation (e.g. typed
// company name) before wiring this into the Settings UI button.

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(req: NextRequest) {
  const { companyId } = await req.json();
  if (!companyId) {
    return NextResponse.json({ error: "companyId is required" }, { status: 400 });
  }

  // TODO: verify the requesting user is an OWNER of this companyId

  await db.company.delete({ where: { id: companyId } });

  return NextResponse.json({ deleted: true });
}
