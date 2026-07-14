# TicketPilot

AI-powered support ticket triage — resolve 3x more tickets without hiring 3x more agents.

## Build status

✅ **Database (Prisma)** — Company, User, HelpdeskConnection, Ticket, RoutingRule,
   KnowledgeBaseDocument, Subscription, AuditLog — with seed script for realistic demo data
✅ **Whop payments** — checkout links, webhook with signature verification, plan gating
   (`requirePlan`, `requireTicketQuota`, `requireConnectionQuota`), billing portal link
✅ **AI triage engine** — Groq-powered classification, sentiment, summary, reply drafting
   (`lib/ai.ts` — swap to Claude/Anthropic later by changing this one file)
✅ **Email** — Resend-powered welcome, receipt, upgrade nudge, re-engagement templates
✅ **Dashboard** — real-time stats pulled from the database (tickets processed, auto-resolve
   rate, response time, agent time saved, plan usage)
✅ **Agent inbox** — queue view grouped by needs-review / escalated / resolved, with
   AI-drafted replies and one-click approve
✅ **Settings** — billing (links to Whop), helpdesk connections, AI tone, team, data export/delete
✅ **Admin dashboard** — platform-wide MRR, active trials, signups, tickets processed
✅ **Onboarding flow** — connect helpdesk → live classification demo → done
✅ **Marketing site** — landing page, pricing (synced to Whop plans), about, privacy policy,
   terms of service, changelog, blog (3 draft posts)
✅ **SEO** — sitemap.xml, robots.txt, Open Graph/Twitter tags, Schema.org structured data
✅ **Security** — webhook signature verification, rate limiting middleware, Zod input
   validation, row-level company isolation on all queries, GDPR export/delete routes
✅ **Design system** — Tailwind tokens (`tailwind.config.js`), reusable UI components
   (Button, Card, StatusTag), dark sidebar / light content aesthetic, cookie consent banner

⬜ **Not yet built** — Zendesk/Intercom OAuth flow + live ticket ingestion (paused: Whop and
   Zendesk mobile dashboards had rendering issues during setup — retry from a laptop/desktop
   browser, admin panels like these are far more reliable there). The `HelpdeskConnection`
   model, settings UI, and AI triage pipeline are ready to receive real data the moment OAuth
   is wired in — see "Next: connecting a real helpdesk" below.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
Copy `.env.example` to `.env` and fill in real values. This project's `.env` already has
your Whop keys, Supabase `DATABASE_URL`, Groq key, and Resend key pre-filled — double check
before committing (never commit `.env` to git — it's already in `.gitignore`).

Still needed:
- Zendesk / Intercom OAuth client credentials — see below
- Full `NEXT_PUBLIC_WHOP_APP_ID` — confirm the complete App ID from the Whop dashboard
  (Developer > App details), the one in `.env` may be truncated
- `WHOP_WEBHOOK_SECRET` — only available after you register the production webhook URL

### 3. Database setup
```bash
npx prisma migrate dev --name init
npm run db:seed
```
This creates all tables in your Supabase Postgres instance and populates realistic demo
data (one company "Acme Outfitters", two users, a helpdesk connection, three sample
tickets, a routing rule, and a knowledge base doc).

Verify it worked:
```bash
npm run db:studio
```

### 4. Run locally
```bash
npm run dev
```
Visit http://localhost:3000 for the marketing site, http://localhost:3000/dashboard for
the app (uses the seeded "Acme Outfitters" workspace until real auth is wired in).

## Next: connecting a real helpdesk

The Zendesk OAuth client setup hit a mobile-browser rendering bug (Save button not
appearing). To finish this from a laptop/desktop:

1. Zendesk Admin Center → Apps and integrations → APIs → OAuth Clients → Add OAuth Client
2. Fill in Name, Description, Company, Identifier (must be globally unique), Client kind:
   Confidential, Redirect URL: `https://yourdomain.com/api/auth/zendesk/callback`
3. Save — copy the generated Client ID and Secret immediately (secret shown once)
4. Add to `.env`: `ZENDESK_CLIENT_ID`, `ZENDESK_CLIENT_SECRET`
5. The OAuth callback route and ticket-sync webhook still need to be built — this is the
   next phase of work (`app/api/auth/zendesk/callback/route.ts` and a polling or webhook
   ingestion job that writes into the `Ticket` table using `lib/ai.ts` for triage)

## Whop webhook setup (after deploying)

1. Deploy to Vercel first to get a production URL
2. Whop dashboard → Developer → Webhooks → Add endpoint
3. URL: `https://yourdomain.com/api/webhooks/whop`
4. Subscribe to: `payment.succeeded`, `membership.activated`, `membership.deactivated`
5. Copy the generated Webhook Secret into `WHOP_WEBHOOK_SECRET` in production env vars

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import the repo in Vercel
3. Add all environment variables from `.env` into Vercel's project settings
4. Set `DATABASE_URL` to the **pooled** Supabase connection string for serverless
   (Supabase dashboard → Connect → ORM → Prisma)
5. Deploy, then complete the Whop webhook setup step above using your live URL
6. Full pre-launch checklist: see `LAUNCH_CHECKLIST.md`

## Folder structure

```
/app                    Next.js App Router — marketing pages, dashboard, API routes
/app/(dashboard)        Sidebar-shell routes: dashboard, inbox, settings, admin
/app/api/checkout       Whop checkout link generation
/app/api/webhooks/whop  Whop webhook handler (signature-verified)
/app/api/account        GDPR export/delete routes
/app/blog, /app/pricing, /app/about, etc.   Marketing site pages
/content/blog           MDX blog post source files
/components/ui          Reusable primitives (Button, Card, StatusTag)
/components/dashboard   Sidebar, stat cards
/components/marketing   Navbar, footer
/lib                    Whop client, Prisma client, AI engine, email, plan gating, validation
/prisma                 Schema, seed script
middleware.ts           Rate limiting on /api/* routes
```

## Plan tiers (configured in Whop dashboard)

| Plan    | Price     | Tickets/mo | Helpdesk connections |
|---------|-----------|------------|-----------------------|
| Starter | $49/mo    | 200        | 1                     |
| Growth  | $149/mo   | 1,500      | 3                     |
| Scale   | $399/mo   | Unlimited  | Unlimited             |

Product IDs are in `.env` as `WHOP_STARTER_PLAN_ID`, `WHOP_GROWTH_PLAN_ID`, `WHOP_SCALE_PLAN_ID`.

