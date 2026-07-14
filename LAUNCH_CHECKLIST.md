# TicketPilot — Launch Checklist

## 1. Domain & DNS
- [ ] Register domain (e.g. `ticketpilot.com` or `.io` / `.ai` if `.com` is taken)
- [ ] Point DNS to Vercel (A/CNAME records per Vercel's domain setup instructions)
- [ ] Add domain in Vercel project settings, wait for SSL to provision
- [ ] Update `NEXT_PUBLIC_APP_URL` in production env vars to the final domain
- [ ] Update `robots.ts` / `sitemap.ts` base URL fallback if not using the env var

## 2. Whop — going live
- [ ] Switch Whop app/products from test mode to **live mode** in the dashboard
- [ ] Confirm all 3 products (Starter/Growth/Scale) exist in live mode with correct prices
- [ ] Re-collect live-mode Product IDs if they differ from test-mode IDs — update env vars
- [ ] Register the **production** webhook URL: `https://yourdomain.com/api/webhooks/whop`
- [ ] Subscribe the webhook to: `payment.succeeded`, `membership.activated`, `membership.deactivated`
- [ ] Copy the generated **Webhook Secret** into `WHOP_WEBHOOK_SECRET` (production env)
- [ ] Send a test purchase through checkout end-to-end; confirm the webhook fires and the
      company's `planTier` updates in the database
- [ ] Confirm the full `NEXT_PUBLIC_WHOP_APP_ID` is correct (not truncated)
- [ ] Regenerate `WHOP_API_KEY` if it was ever shared/pasted anywhere insecurely, and revoke the old one

## 3. Production environment variables (set in Vercel)
- [ ] `DATABASE_URL` — use the **pooled** Supabase connection string for serverless
- [ ] `WHOP_API_KEY`, `NEXT_PUBLIC_WHOP_APP_ID`, `WHOP_BUSINESS_ID`, `WHOP_WEBHOOK_SECRET`
- [ ] `WHOP_STARTER_PLAN_ID`, `WHOP_GROWTH_PLAN_ID`, `WHOP_SCALE_PLAN_ID`
- [ ] `GROQ_API_KEY` (or `ANTHROPIC_API_KEY` if upgraded later)
- [ ] `RESEND_API_KEY`, verified sending domain
- [ ] `ZENDESK_CLIENT_ID` / `ZENDESK_CLIENT_SECRET` and/or `INTERCOM_CLIENT_ID` / `INTERCOM_CLIENT_SECRET`
- [ ] `NEXT_PUBLIC_APP_URL` set to production domain
- [ ] Never commit `.env` — confirm it's in `.gitignore`

## 4. Database
- [ ] Run `npx prisma migrate deploy` against production database (not `migrate dev`)
- [ ] Confirm Supabase automatic backups are enabled (Settings → Database → Backups)
- [ ] Decide backup retention window based on plan tier (Supabase free tier has limited retention —
      consider upgrading before real customer data is stored)
- [ ] Do **not** run `db:seed` against production — seed data is for local/dev only

## 5. Helpdesk marketplace review (if listing publicly)
- [ ] Zendesk: submit the OAuth app for review if listing on the Zendesk Marketplace
      (not required for private/internal use with your own OAuth client)
- [ ] Intercom: submit for App Partner review if listing on the Intercom App Store
- [ ] Prepare app store listing assets: 2+ screenshots (16:9), description, icon (512x512)

## 6. Security pass
- [ ] Confirm row-level isolation: every Prisma query for tickets/connections/etc. filters by `companyId`
- [ ] Confirm webhook signature verification is active (test with an invalid signature — should 401)
- [ ] Confirm rate limiting middleware is active on `/api/*` routes
- [ ] Confirm no API keys or secrets appear in client-side bundles (check browser devtools → Network/Sources)
- [ ] Enable HTTPS-only cookies for any session handling added later

## 7. Product Hunt launch post (draft)

**Title:** TicketPilot — Resolve 3x more tickets without hiring 3x more agents

**Tagline:** AI ticket triage that actually clears your Zendesk/Intercom queue, not just deflects the easy stuff.

**First comment draft:**
> Hey PH! We built TicketPilot because every AI chatbot we tried topped out around
> 30% ticket deflection — the other 70% still landed on our support team.
> TicketPilot works on the agent side instead: it classifies every incoming
> ticket, drafts replies grounded in your own knowledge base, and escalates the
> hard ones with a written summary attached. Connect Zendesk or Intercom and
> you'll see it triage your last 20 tickets live, in under 2 minutes.
> Would love your feedback — first 50 PH signups get an extended 14-day trial.

- [ ] Schedule launch for a Tuesday–Thursday (historically higher PH traffic)
- [ ] Prepare 3-5 product screenshots/GIFs (dashboard, inbox, onboarding flow)
- [ ] Line up 5-10 people to comment/upvote in the first hour

## 8. Two-week post-launch content/SEO plan

**Week 1**
- Day 1: Publish "Why AI Chatbots Only Deflect 30% of Support Tickets (and What
  Actually Works)" — submit to r/CustomerSuccess, r/ecommerce (follow each
  subreddit's self-promo rules)
- Day 3: Publish "How to Cut Support Response Time in Half Without Hiring" —
  share on LinkedIn with a short personal framing
- Day 5: Submit TicketPilot to G2 and Capterra for category listing (Help Desk /
  Customer Service Software)

**Week 2**
- Day 8: Publish "The Real Cost of a Growing Support Queue"
- Day 10: Cold outreach batch #1 to support leads (personalize with their
  current helpdesk + team size if known)
- Day 12: Follow up on Product Hunt comments, incorporate feedback into changelog
- Day 14: Review analytics (PostHog) — which blog post drove the most signups —
  and plan month 2 content around that topic
