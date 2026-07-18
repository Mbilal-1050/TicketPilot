// app/(dashboard)/routing/page.tsx
export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { StatusTag } from "@/components/ui/status-tag";
import { Button } from "@/components/ui/button";
import { getCurrentCompanyId } from "@/lib/current-company";

export default async function RoutingPage() {
  const resolved = await getCurrentCompanyId();
  if (!resolved) {
    return <div className="p-6 md:p-10 text-steel">No workspace found. Run the seed script first.</div>;
  }

  const rules = await db.routingRule.findMany({
    where: { companyId: resolved.companyId },
    orderBy: { priority: "asc" },
  });

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-mono text-steel uppercase tracking-wide mb-1">Automation</p>
          <h1 className="text-2xl font-display font-semibold text-runway-900">Routing rules</h1>
          <p className="text-steel text-sm mt-1">Control how tickets get classified before AI even looks at them.</p>
        </div>
        <Button size="sm">+ New rule</Button>
      </header>

      <div className="space-y-3">
        {rules.map((rule) => {
          const conditions = rule.conditions as { field: string; operator: string; value: string };
          const actions = rule.actions as { classification: "AUTO_RESOLVE" | "DRAFT_FOR_REVIEW" | "ESCALATE" };
          return (
            <Card key={rule.id} className="p-5 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-mono text-xs text-steel bg-runway-100 px-2 py-1 rounded-sm">#{rule.priority}</span>
                <div>
                  <p className="font-medium text-runway-900 text-sm">{rule.name}</p>
                  <p className="text-xs text-steel mt-0.5">
                    When <span className="font-mono">{conditions.field}</span> {conditions.operator}{" "}
                    <span className="font-mono">&quot;{conditions.value}&quot;</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-steel text-xs">→</span>
                <StatusTag classification={actions.classification} />
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-sm ${
                    rule.isActive ? "bg-cleared-50 text-cleared-600" : "bg-runway-100 text-steel"
                  }`}
                >
                  {rule.isActive ? "Active" : "Paused"}
                </span>
              </div>
            </Card>
          );
        })}

        {rules.length === 0 && (
          <div className="border border-dashed border-runway-200 rounded-DEFAULT p-10 text-center text-steel text-sm">
            No routing rules yet. Rules let you override AI classification for specific keywords, sentiment, or customer tiers.
          </div>
        )}
      </div>
    </div>
  );
}
