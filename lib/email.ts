// lib/email.ts
//
// Transactional email via Resend. Until a custom domain is verified in
// Resend, `FROM_ADDRESS` must stay on the resend.dev sandbox domain —
// switch it once you verify your own domain (see Resend dashboard > Domains).

import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS ?? "TicketPilot <onboarding@resend.dev>";

export async function sendWelcomeEmail(to: string, companyName: string) {
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "Welcome to TicketPilot 🎉",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Welcome to TicketPilot, ${companyName}!</h2>
        <p>You're all set. Connect your first helpdesk to see AI triage in action —
        it takes less than 2 minutes.</p>
        <p>Your 7-day free trial has started. No credit card required to explore.</p>
      </div>
    `,
  });
}

export async function sendReceiptEmail(to: string, amount: number, planName: string) {
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "Your TicketPilot receipt",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Payment received</h2>
        <p>Thanks for subscribing to the <strong>${planName}</strong> plan.</p>
        <p>Amount charged: <strong>$${(amount / 100).toFixed(2)}</strong></p>
        <p>Manage your subscription anytime from your TicketPilot billing settings.</p>
      </div>
    `,
  });
}

export async function sendUpgradeNudgeEmail(to: string, ticketsUsed: number, ticketLimit: number) {
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "You're approaching your ticket limit",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Heads up — you've used ${ticketsUsed} of ${ticketLimit} tickets this month</h2>
        <p>Upgrade your plan to keep AI triage running without interruption.</p>
      </div>
    `,
  });
}

export async function sendReengagementEmail(to: string, companyName: string) {
  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "We miss you at TicketPilot",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Still drowning in tickets, ${companyName}?</h2>
        <p>Your AI triage engine is ready whenever you are. Log back in to see what's changed.</p>
      </div>
    `,
  });
}
