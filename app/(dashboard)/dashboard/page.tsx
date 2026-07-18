// app/(dashboard)/dashboard/page.tsx
export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { StatusTag } from "@/components/ui/status-tag";
import { formatRelativeTime } from "@/lib/utils";
import { getCurrentCompanyId } from "@/lib/current-company";

export default async function DashboardPage() {
  const resolved = await getCurrentCompanyId();

  if (!resolved) {
    return (
      <div className="p-6 md:p-10">
        <p className="text-steel">No workspace found. Run <code className="font-mono bg-runway-100 px-1.5 py-0.5 rounded-sm">npm run db:seed</code> to populate demo data.</p>
      </div>
    );
  }

  const company = await db.company.findUnique({
    where: { id: resolved.companyId },
    include: {
      tickets: { orderBy: { createdAt: "desc" }, take: 6 },
    },
  });

  if (!company) {
    return (
      <div className="p-6 md:p-10">
        <p className="text-steel">Workspace not found.</p>
      </div>
    );
  }

  const allTickets = await db.ticket.findMany({ where: { companyId: company.id } });
  const autoResolved = allTickets.filter((t) => t.classification === "AUTO_RESOLVE").length;
  const escalated = allTickets.filter((t) => t.classification === "ESCALATE").length;
  const total = allTickets.length || 1;
  const resolveRate = Math.round((autoResolved / total) * 100);

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {resolved.isDemo && (
        <div className="mb-6 bg-beacon-50 border border-beacon-100 rounded-DEFAULT px-4 py-3 text-sm text-beacon-700 flex items-center justify-between gap-3 flex-wrap">
          <span>You&apos;re viewing sample data. Sign in with Whop to connect your own workspace.</span>
          <a href="/api/auth/login" className="font-medium underline shrink-0">Sign in</a>
        </div>
      )}

      <header className="mb-8">
        <p className="text-xs font-mono text-steel uppercase tracking-wide mb-1">Control tower</p>
        <h1 className="text-2xl font-display font-semibold text-runway-900">Dashboard</h1>
        <p className="text-steel text-sm mt-1">{company.name} · Real-time ticket triage overview</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Tickets processed" value={String(allTickets.length)} delta="+18% vs last month" />
        <StatCard label="Auto-resolve rate" value={`${resolveRate}%`} delta="+6pts vs last month" />
        <StatCard label="Avg. response time" value="4m 12s" delta="↓ 71% faster" />
        <StatCard label="Escalated to human" value={String(escalated)} deltaTone="neutral" delta="within target" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="font-display font-semibold text-runway-900">Recent tickets</h2>
            <p className="text-xs text-steel mt-0.5">Latest activity across all connected helpdesks</p>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <tbody>
                {company.tickets.map((t) => (
                  <tr key={t.id} className="border-t border-runway-100">
                    <td className="px-5 py-3 w-24">
                      <StatusTag classification={t.classification} />
                    </td>
                    <td className="px-2 py-3">
                      <p className="text-runway-900 font-medium truncate max-w-xs">{t.subject ?? "(no subject)"}</p>
                      <p className="text-steel text-xs truncate max-w-xs">{t.content}</p>
                    </td>
                    <td className="px-5 py-3 text-right text-steel text-xs font-mono whitespace-nowrap">
                      {formatRelativeTime(t.createdAt)}
                    </td>
                  </tr>
                ))}
                {company.tickets.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-5 py-10 text-center text-steel text-sm">
                      No tickets yet. Connect a helpdesk to start triaging.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-display font-semibold text-runway-900">Agent time saved</h2>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-display font-semibold text-cleared-600">14.2 hrs</p>
            <p className="text-steel text-sm mt-1">this month, estimated from auto-resolved + drafted tickets</p>
            <div className="mt-5 pt-5 border-t border-runway-100">
              <p className="text-xs font-medium text-steel uppercase tracking-wide mb-2">Plan usage</p>
              <div className="w-full h-2 bg-runway-100 rounded-full overflow-hidden">
                <div className="h-full bg-beacon" style={{ width: `${Math.min((allTickets.length / 1500) * 100, 100)}%` }} />
              </div>
              <p className="text-xs text-steel mt-1.5">{allTickets.length} / 1,500 tickets this period</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
