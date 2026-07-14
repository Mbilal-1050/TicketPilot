// app/page.tsx
import Link from "next/link";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { StatusTag } from "@/components/ui/status-tag";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "TicketPilot",
            applicationCategory: "BusinessApplication",
            description:
              "AI-powered support ticket triage that classifies, drafts replies for, and routes customer support tickets.",
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "49",
              highPrice: "399",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <MarketingNavbar />

      {/* Hero — the signature element: a live-looking triage queue as proof, not decoration */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-mono text-xs text-beacon-600 uppercase tracking-wide mb-4">AI ticket triage</p>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-runway-900 leading-[1.1] tracking-tight">
            Resolve 3x more tickets<br />without hiring 3x more agents.
          </h1>
          <p className="mt-5 text-lg text-steel leading-relaxed max-w-lg">
            Most AI chatbots deflect 30% of tickets and dump the rest on your team.
            TicketPilot classifies every ticket, drafts replies your agents actually
            want to send, and escalates the rest with full context.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link href="/pricing"><Button size="lg">Start your free trial</Button></Link>
            <Link href="/#how-it-works"><Button size="lg" variant="secondary">See how it works</Button></Link>
          </div>
          <p className="mt-4 text-xs text-steel">7-day trial · No credit card required</p>
        </div>

        {/* Live queue mockup */}
        <div className="bg-runway-900 rounded-lg p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono text-runway-400 uppercase tracking-wide">Live queue</p>
            <span className="flex items-center gap-1.5 text-xs text-cleared-500">
              <span className="w-1.5 h-1.5 rounded-full bg-cleared-500 animate-pulse" /> processing
            </span>
          </div>
          <div className="space-y-2">
            {[
              { tag: "AUTO_RESOLVE" as const, text: "Where is my order #4821?", time: "2s" },
              { tag: "DRAFT_FOR_REVIEW" as const, text: "Wrong size received, need exchange", time: "4s" },
              { tag: "ESCALATE" as const, text: "Charged twice — very frustrated", time: "1s" },
              { tag: "AUTO_RESOLVE" as const, text: "Do you ship to Canada?", time: "1s" },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 bg-runway-800 rounded-sm px-3 py-2.5">
                <StatusTag classification={row.tag} />
                <span className="text-runway-100 text-sm flex-1 truncate">{row.text}</span>
                <span className="text-runway-500 text-xs font-mono">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-y border-runway-100 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs text-steel uppercase tracking-wide mb-6">
            Built for teams already running on
          </p>
          <div className="flex items-center justify-center gap-10 text-runway-400 font-display font-medium text-lg flex-wrap">
            <span>Zendesk</span>
            <span>Intercom</span>
            <span>Freshdesk</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-xl mb-12">
          <p className="font-mono text-xs text-beacon-600 uppercase tracking-wide mb-3">What it does</p>
          <h2 className="text-3xl font-display font-semibold text-runway-900">Five parts, one queue</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Feature
            title="Ticket ingestion"
            body="Pulls tickets in real time from Zendesk or Intercom via webhook — nothing sits in a queue you can't see."
          />
          <Feature
            title="AI triage engine"
            body="Every ticket gets classified: auto-resolve, draft-for-review, or escalate with a written summary."
          />
          <Feature
            title="Reply drafting"
            body="Drafts match your tone — formal, casual, or friendly — grounded in your own FAQs and past resolved tickets."
          />
          <Feature
            title="Routing rules"
            body="Route by keyword, sentiment, customer tier, or topic. You set the rules; TicketPilot follows them exactly."
          />
          <Feature
            title="Agent inbox"
            body="One clean queue to review drafts, approve and send, or edit first. No context-switching between tools."
          />
        </div>
      </section>

      {/* Pricing preview */}
      <section className="bg-runway-900 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-beacon-400 uppercase tracking-wide mb-3">Pricing</p>
          <h2 className="text-3xl font-display font-semibold text-white mb-4">Plans that scale with your queue</h2>
          <p className="text-runway-300 mb-8">Start free for 7 days. No credit card required.</p>
          <Link href="/pricing"><Button size="lg">View pricing</Button></Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-display font-semibold text-runway-900 mb-8">Questions</h2>
        <div className="space-y-6">
          <FAQ
            q="How is this different from a chatbot?"
            a="Chatbots handle the customer-facing conversation and typically deflect around 30% of tickets. TicketPilot works on the agent side — it classifies, drafts, and routes every incoming ticket, including the ones a chatbot would have punted straight to a human."
          />
          <FAQ
            q="Do I need to replace Zendesk or Intercom?"
            a="No. TicketPilot connects to your existing helpdesk and works alongside it — your team keeps working where they already are."
          />
          <FAQ
            q="What happens during the free trial?"
            a="You get full access to the dashboard with sample data immediately, and can connect a real helpdesk anytime in the first 7 days — no credit card required to start."
          />
        </div>
      </section>

      <MarketingFooter />
    </>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-runway-100 rounded-lg p-6 bg-white">
      <h3 className="font-display font-semibold text-runway-900 mb-2">{title}</h3>
      <p className="text-steel text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-runway-100 pb-6">
      <h3 className="font-medium text-runway-900 mb-2">{q}</h3>
      <p className="text-steel text-sm leading-relaxed">{a}</p>
    </div>
  );
}
