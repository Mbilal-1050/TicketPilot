// app/(dashboard)/knowledge-base/page.tsx
export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentCompanyId } from "@/lib/current-company";

export default async function KnowledgeBasePage() {
  const resolved = await getCurrentCompanyId();
  if (!resolved) {
    return <div className="p-6 md:p-10 text-steel">No workspace found. Run the seed script first.</div>;
  }

  const docs = await db.knowledgeBaseDocument.findMany({
    where: { companyId: resolved.companyId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-mono text-steel uppercase tracking-wide mb-1">Grounding</p>
          <h1 className="text-2xl font-display font-semibold text-runway-900">Knowledge base</h1>
          <p className="text-steel text-sm mt-1">What the AI reads before drafting a reply.</p>
        </div>
        <Button size="sm">+ Add document</Button>
      </header>

      <div className="space-y-3">
        {docs.map((doc) => (
          <Card key={doc.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-runway-900 text-sm">{doc.title}</p>
                <span className="text-xs font-mono text-steel bg-runway-100 px-1.5 py-0.5 rounded-sm mt-1 inline-block">
                  {doc.sourceType}
                </span>
              </div>
            </div>
            <p className="text-steel text-sm mt-3 line-clamp-3">{doc.content}</p>
          </Card>
        ))}

        {docs.length === 0 && (
          <div className="border border-dashed border-runway-200 rounded-DEFAULT p-10 text-center text-steel text-sm">
            No documents yet. Upload FAQs, policies, or past resolved tickets so the AI can draft grounded replies.
          </div>
        )}
      </div>
    </div>
  );
}
