// app/about/page.tsx
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — TicketPilot",
  description: "Why we built TicketPilot and what we believe about support teams.",
};

export default function AboutPage() {
  return (
    <>
      <MarketingNavbar />
      <section className="max-w-2xl mx-auto px-6 py-20">
        <p className="font-mono text-xs text-beacon-600 uppercase tracking-wide mb-3">About</p>
        <h1 className="text-4xl font-display font-semibold text-runway-900 mb-6">
          Support teams shouldn't have to choose between speed and quality.
        </h1>
        <div className="prose prose-runway text-steel space-y-4 leading-relaxed">
          <p>
            Ticket volume grows faster than headcount, almost every time. Chatbots promised
            to fix this and, for the easy 30%, they did. The other 70% still lands on a
            human — usually the same overworked few people.
          </p>
          <p>
            TicketPilot exists for that other 70%. It doesn't try to replace your support
            team. It clears the simple stuff, drafts the medium stuff, and hands your
            agents the hard stuff with the context they need to act fast.
          </p>
          <p>
            We built it for the teams already living inside Zendesk, Intercom, or
            Freshdesk — because the goal was never a new tool to learn. It was fewer
            tickets sitting in the queue at 5pm.
          </p>
        </div>
      </section>
      <MarketingFooter />
    </>
  );
}
