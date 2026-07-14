// app/(dashboard)/inbox/page.tsx
import { db } from "@/lib/db";
import { StatusTag } from "@/components/ui/status-tag";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";

const DEMO_COMPANY_SLUG = "acme-outfitters";

export default async function InboxPage() {
  const company = await db.company.findUnique({ where: { slug: DEMO_COMPANY_SLUG } });
  if (!company) {
    return <div className="p-10 text-steel">No workspace found. Run the seed script first.</div>;
  }

  const tickets = await db.ticket.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: "desc" },
  });

  const pendingReview = tickets.filter((t) => t.status === "PENDING_REVIEW");
  const escalated = tickets.filter((t) => t.status === "ESCALATED");
  const resolved = tickets.filter((t) => t.status === "RESOLVED");

  return (
    <div className="p-8 max-w-5xl">
      <header className="mb-8">
        <p className="text-xs font-mono text-steel uppercase tracking-wide mb-1">Queue</p>
        <h1 className="text-2xl font-display font-semibold text-runway-900">Inbox</h1>
        <p className="text-steel text-sm mt-1">Review AI drafts, approve, or escalate</p>
      </header>

      <Section title="Needs your review" count={pendingReview.length} tickets={pendingReview} showActions />
      <Section title="Escalated" count={escalated.length} tickets={escalated} />
      <Section title="Resolved" count={resolved.length} tickets={resolved} muted />
    </div>
  );
}

function Section({
  title,
  count,
  tickets,
  showActions,
  muted,
}: {
  title: string;
  count: number;
  tickets: Awaited<ReturnType<typeof db.ticket.findMany>>;
  showActions?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-display font-semibold text-runway-900 text-sm">{title}</h2>
        <span className="text-xs font-mono text-steel bg-runway-100 px-1.5 py-0.5 rounded-sm">{count}</span>
      </div>

      {tickets.length === 0 ? (
        <div className="border border-dashed border-runway-200 rounded-DEFAULT p-6 text-center text-steel text-sm">
          Nothing here right now.
        </div>
      ) : (
        <div className="space-y-2">
          {tickets.map((t) => (
            <div
              key={t.id}
              className={`bg-white border border-runway-100 rounded-DEFAULT p-4 flex items-start gap-4 ${muted ? "opacity-70" : ""}`}
            >
              <StatusTag classification={t.classification} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-runway-900 text-sm truncate">{t.subject ?? "(no subject)"}</p>
                  <span className="text-xs text-steel font-mono shrink-0">{formatRelativeTime(t.createdAt)}</span>
                </div>
                <p className="text-steel text-sm mt-0.5 line-clamp-2">{t.content}</p>
                {t.aiDraftReply && (
                  <div className="mt-3 bg-beacon-50 border border-beacon-100 rounded-sm p-3">
                    <p className="text-xs font-medium text-beacon-600 mb-1">AI-drafted reply</p>
                    <p className="text-sm text-runway-800">{t.aiDraftReply}</p>
                  </div>
                )}
                {t.aiSummary && !t.aiDraftReply && (
                  <div className="mt-3 bg-ember-50 border border-ember-100 rounded-sm p-3">
                    <p className="text-xs font-medium text-ember-600 mb-1">Escalation context</p>
                    <p className="text-sm text-runway-800">{t.aiSummary}</p>
                  </div>
                )}
                {showActions && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm">Approve & send</Button>
                    <Button size="sm" variant="secondary">Edit first</Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
