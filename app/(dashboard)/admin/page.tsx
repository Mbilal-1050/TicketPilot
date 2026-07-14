// app/(dashboard)/admin/page.tsx
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { requirePlan } from "@/lib/plan-gate";

// NOTE: this route must be gated to OWNER/ADMIN roles of the *platform*
// (TicketPilot's own team), not per-company admins. Wire in real auth
// (Whop session -> internal admin allowlist) before deploying.

export default async function AdminPage() {
  const [companies, tickets, subscriptions] = await Promise.all([
    db.company.findMany(),
    db.ticket.count(),
    db.subscription.findMany({ where: { status: "ACTIVE" } }),
  ]);

  const mrr = subscriptions.reduce((sum, s) => {
    const price = { STARTER: 49, GROWTH: 149, SCALE: 399, FREE: 0 }[s.planTier];
    return sum + price;
  }, 0);

  const trialing = await db.subscription.count({ where: { status: "TRIALING" } });

  return (
    <div className="p-8 max-w-6xl">
      <header className="mb-8">
        <p className="text-xs font-mono text-steel uppercase tracking-wide mb-1">Platform</p>
        <h1 className="text-2xl font-display font-semibold text-runway-900">Admin</h1>
        <p className="text-steel text-sm mt-1">TicketPilot-wide metrics — visible to platform admins only</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total companies" value={String(companies.length)} />
        <StatCard label="MRR" value={`$${mrr.toLocaleString()}`} />
        <StatCard label="Active trials" value={String(trialing)} />
        <StatCard label="Tickets processed" value={String(tickets)} />
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-display font-semibold text-runway-900">Recent signups</h2>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-runway-100 text-left text-xs text-steel uppercase tracking-wide">
                <th className="px-5 py-2 font-medium">Company</th>
                <th className="px-5 py-2 font-medium">Plan</th>
                <th className="px-5 py-2 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id} className="border-t border-runway-100">
                  <td className="px-5 py-3 text-runway-900 font-medium">{c.name}</td>
                  <td className="px-5 py-3 text-steel">{c.planTier}</td>
                  <td className="px-5 py-3 text-steel font-mono text-xs">
                    {c.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
