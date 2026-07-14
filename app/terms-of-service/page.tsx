// app/terms-of-service/page.tsx
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service — TicketPilot" };

export default function TermsPage() {
  return (
    <>
      <MarketingNavbar />
      <section className="max-w-2xl mx-auto px-6 py-20 prose prose-runway">
        <h1 className="text-3xl font-display font-semibold text-runway-900 mb-2">Terms of Service</h1>
        <p className="text-steel text-sm mb-8">Last updated: July 12, 2026</p>

        <div className="space-y-6 text-steel text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">1. Acceptance of terms</h2>
            <p>
              By creating an account or using TicketPilot, you agree to these Terms of Service
              and our Privacy Policy. If you're using TicketPilot on behalf of a company, you
              confirm you have authority to bind that company to these terms.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">2. Subscriptions and billing</h2>
            <p>
              Paid plans are billed monthly through Whop. Your subscription renews automatically
              until cancelled. You can cancel anytime via your Whop billing portal; access
              continues until the end of the current billing period.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">3. Acceptable use</h2>
            <p>
              You agree not to use TicketPilot to process content that is unlawful, to attempt
              to reverse-engineer or abuse the service, or to exceed your plan's ticket and
              connection limits through automated means.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">4. AI-generated content</h2>
            <p>
              TicketPilot uses AI to classify tickets and draft replies. Drafted replies are
              suggestions only — your team is responsible for reviewing and approving any
              reply before it is sent to a customer, except where you've explicitly enabled
              auto-resolve for a given routing rule.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">5. Limitation of liability</h2>
            <p>
              TicketPilot is provided "as is" without warranties of any kind. To the maximum
              extent permitted by law, TicketPilot is not liable for indirect, incidental, or
              consequential damages arising from use of the service.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">6. Termination</h2>
            <p>
              We may suspend or terminate accounts that violate these terms. You may terminate
              your account at any time by cancelling your subscription and requesting data
              deletion.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">7. Contact</h2>
            <p>Questions about these terms: legal@ticketpilot.com</p>
          </section>
        </div>
      </section>
      <MarketingFooter />
    </>
  );
}
