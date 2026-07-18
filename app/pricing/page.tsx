// app/pricing/page.tsx
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { clsx } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — TicketPilot",
  description: "Simple plans that scale with your ticket volume. 7-day free trial, no credit card required.",
};

const PLANS = [
  { key: "starter", name: "Starter", price: 49, description: "For small teams testing the waters", features: ["200 AI-triaged tickets/month", "1 helpdesk connection", "Standard AI tone", "Email support"], highlighted: false },
  { key: "growth", name: "Growth", price: 149, description: "For growing support teams", features: ["1,500 AI-triaged tickets/month", "3 helpdesk connections", "Priority routing rules", "Custom AI tone", "Priority email support"], highlighted: true },
  { key: "scale", name: "Scale", price: 399, description: "For high-volume support operations", features: ["Unlimited AI-triaged tickets", "Unlimited helpdesk connections", "Custom AI training", "Dedicated support", "SLA guarantees"], highlighted: false },
];

export default function PricingPage() {
  return (
    <>
      <MarketingNavbar />
      <section className="max-w-5xl mx-auto px-6 py-20 dark:bg-runway-900 transition-colors">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="font-mono text-xs text-beacon-600 dark:text-beacon-400 uppercase tracking-wide mb-3">Pricing</p>
          <h1 className="text-4xl font-display font-semibold text-runway-900 dark:text-white">Plans that scale with your queue</h1>
          <p className="mt-3 text-steel dark:text-runway-400">7-day free trial on every plan. No credit card required to start.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <div
              key={plan.key}
              className={clsx(
                "rounded-lg p-6 border flex flex-col animate-fade-in-up hover:-translate-y-1 transition-transform",
                plan.highlighted
                  ? "border-beacon bg-runway-900 text-white shadow-card scale-[1.02]"
                  : "border-runway-100 dark:border-runway-700 bg-white dark:bg-runway-800"
              )}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {plan.highlighted && (
                <span className="text-xs font-mono uppercase tracking-wide text-beacon-400 mb-2">Most popular</span>
              )}
              <h2 className={clsx("font-display font-semibold text-xl", plan.highlighted ? "text-white" : "text-runway-900 dark:text-white")}>
                {plan.name}
              </h2>
              <p className={clsx("text-sm mt-1", plan.highlighted ? "text-runway-300" : "text-steel dark:text-runway-400")}>
                {plan.description}
              </p>
              <div className="mt-5">
                <span className={clsx("text-4xl font-display font-semibold", plan.highlighted ? "text-white" : "text-runway-900 dark:text-white")}>
                  ${plan.price}
                </span>
                <span className={clsx("text-sm", plan.highlighted ? "text-runway-400" : "text-steel dark:text-runway-500")}>/month</span>
              </div>

              <ul className="mt-6 space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className={clsx("text-sm flex items-start gap-2", plan.highlighted ? "text-runway-200" : "text-runway-700 dark:text-runway-300")}>
                    <span className={plan.highlighted ? "text-beacon-400" : "text-beacon"}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href={`/api/checkout?plan=${plan.key}`} className="mt-6 block">
                <Button size="md" variant={plan.highlighted ? "primary" : "secondary"} className="w-full">
                  Start free trial
                </Button>
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-steel dark:text-runway-500 mt-10">
          Checkout is handled securely by Whop. Cancel or change plans anytime from your billing settings.
        </p>
      </section>
      <MarketingFooter />
    </>
  );
}
