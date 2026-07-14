// app/privacy-policy/page.tsx
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy — TicketPilot" };

export default function PrivacyPolicyPage() {
  return (
    <>
      <MarketingNavbar />
      <section className="max-w-2xl mx-auto px-6 py-20 prose prose-runway">
        <h1 className="text-3xl font-display font-semibold text-runway-900 mb-2">Privacy Policy</h1>
        <p className="text-steel text-sm mb-8">Last updated: July 12, 2026</p>

        <div className="space-y-6 text-steel text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">1. Information we collect</h2>
            <p>
              We collect account information (name, email, company) you provide when signing up,
              billing information processed by our payment provider (Whop), and ticket content
              you connect from your helpdesk (Zendesk, Intercom) for the purpose of AI-assisted
              triage and reply drafting.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">2. How we use it</h2>
            <p>
              Ticket content is used solely to classify tickets, draft replies, and generate
              summaries for your workspace. We do not sell customer data or use it to train
              models for other customers. Data from one company is never visible to another.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">3. Data retention</h2>
            <p>
              Ticket data is retained for as long as your account is active. You may request
              full export or deletion of your workspace data at any time from Settings, or by
              contacting privacy@ticketpilot.com.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">4. Third-party processors</h2>
            <p>
              We use Whop for payments, Groq for AI processing, Resend for transactional email,
              and Supabase for data storage. Each processes data solely to provide their
              respective service to us.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">5. Your rights</h2>
            <p>
              Depending on your jurisdiction (including under GDPR and CCPA), you may have the
              right to access, correct, export, or delete your personal data. Contact
              privacy@ticketpilot.com to exercise these rights.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-display font-semibold text-runway-900 mb-2">6. Contact</h2>
            <p>Questions about this policy: privacy@ticketpilot.com</p>
          </section>
        </div>
      </section>
      <MarketingFooter />
    </>
  );
}
