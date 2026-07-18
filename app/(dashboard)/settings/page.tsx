// app/(dashboard)/settings/page.tsx
export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentCompanyId } from "@/lib/current-company";

export default async function SettingsPage() {
  const resolved = await getCurrentCompanyId();
  if (!resolved) {
    return <div className="p-6 md:p-10 text-steel">No workspace found. Run the seed script first.</div>;
  }

  const company = await db.company.findUnique({
    where: { id: resolved.companyId },
    include: { users: true, helpdeskConnections: true, subscription: true },
  });

  if (!company) {
    return <div className="p-6 md:p-10 text-steel">Workspace not found.</div>;
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <header className="mb-8">
        <p className="text-xs font-mono text-steel uppercase tracking-wide mb-1">Configuration</p>
        <h1 className="text-2xl font-display font-semibold text-runway-900">Settings</h1>
      </header>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h2 className="font-display font-semibold text-runway-900">Billing</h2>
            <p className="text-xs text-steel mt-0.5">Manage your plan and payment method via Whop</p>
          </CardHeader>
          <CardContent className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm font-medium text-runway-900">{company.planTier} plan</p>
              <p className="text-xs text-steel">
                Status: {company.subscription?.status ?? "No active subscription"}
              </p>
            </div>
            <a href="https://whop.com/orders" target="_blank" rel="noreferrer">
              <Button variant="secondary" size="sm">Manage billing on Whop</Button>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-display font-semibold text-runway-900">Helpdesk connections</h2>
          </CardHeader>
          <CardContent className="space-y-2">
            {company.helpdeskConnections.length === 0 && (
              <p className="text-sm text-steel">No helpdesk connected yet.</p>
            )}
            {company.helpdeskConnections.map((c) => (
              <div key={c.id} className="flex items-center justify-between border border-runway-100 rounded-sm px-3 py-2 flex-wrap gap-2">
                <div>
                  <p className="text-sm font-medium text-runway-900">{c.provider}</p>
                  <p className="text-xs text-steel">{c.externalDomain ?? "—"}</p>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-cleared-50 text-cleared-600 border border-cleared-100">
                  {c.status}
                </span>
              </div>
            ))}
            <Button size="sm" variant="secondary" className="mt-2">Connect a helpdesk</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-display font-semibold text-runway-900">AI tone</h2>
            <p className="text-xs text-steel mt-0.5">How drafted replies should sound</p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {["formal", "casual", "friendly"].map((tone) => (
                <button
                  key={tone}
                  className={`px-3 py-1.5 rounded-sm text-sm border capitalize ${
                    company.aiTone === tone
                      ? "bg-beacon text-white border-beacon"
                      : "border-runway-200 text-runway-700 hover:bg-runway-50"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-display font-semibold text-runway-900">Team</h2>
          </CardHeader>
          <CardContent className="space-y-2">
            {company.users.map((u) => (
              <div key={u.id} className="flex items-center justify-between border border-runway-100 rounded-sm px-3 py-2 flex-wrap gap-2">
                <div>
                  <p className="text-sm font-medium text-runway-900">{u.name ?? u.email}</p>
                  <p className="text-xs text-steel">{u.email}</p>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-runway-100 text-runway-600">
                  {u.role}
                </span>
              </div>
            ))}
            <Button size="sm" variant="secondary" className="mt-2">Invite team member</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-display font-semibold text-runway-900">Data & privacy</h2>
          </CardHeader>
          <CardContent className="flex gap-2 flex-wrap">
            <Button size="sm" variant="secondary">Export my data</Button>
            <Button size="sm" variant="danger">Delete workspace</Button>
          </CardContent>
        </Card>

        {!resolved.isDemo && (
          <a href="/api/auth/logout" className="block text-center text-sm text-steel underline pt-2">
            Sign out
          </a>
        )}
      </div>
    </div>
  );
}
