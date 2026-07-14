// app/changelog/page.tsx
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Changelog — TicketPilot" };

const ENTRIES = [
  {
    date: "2026-07-12",
    title: "Launch: AI triage engine, agent inbox, and routing rules",
    body: "TicketPilot is live. Connect Zendesk or Intercom and start triaging in under 2 minutes.",
  },
];

export default function ChangelogPage() {
  return (
    <>
      <MarketingNavbar />
      <section className="max-w-2xl mx-auto px-6 py-20">
        <p className="font-mono text-xs text-beacon-600 uppercase tracking-wide mb-3">What's new</p>
        <h1 className="text-3xl font-display font-semibold text-runway-900 mb-10">Changelog</h1>
        <div className="space-y-8">
          {ENTRIES.map((e) => (
            <div key={e.date} className="border-l-2 border-beacon-100 pl-5">
              <p className="text-xs font-mono text-steel mb-1">{e.date}</p>
              <h2 className="font-display font-semibold text-runway-900">{e.title}</h2>
              <p className="text-steel text-sm mt-1">{e.body}</p>
            </div>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </>
  );
}
