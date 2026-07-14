// prisma/seed.ts
// Populates realistic demo data for local development.
// Run with: npx prisma db seed

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding TicketPilot demo data...");

  const company = await prisma.company.create({
    data: {
      name: "Acme Outfitters",
      slug: "acme-outfitters",
      planTier: "GROWTH",
      aiTone: "friendly",
      users: {
        create: [
          { whopUserId: "whop_demo_owner", email: "owner@acme-outfitters.test", name: "Jamie Rivera", role: "OWNER" },
          { whopUserId: "whop_demo_agent1", email: "agent1@acme-outfitters.test", name: "Sam Lee", role: "AGENT" },
        ],
      },
    },
  });

  const connection = await prisma.helpdeskConnection.create({
    data: {
      companyId: company.id,
      provider: "ZENDESK",
      status: "CONNECTED",
      accessToken: "demo_token_do_not_use",
      externalDomain: "acme-outfitters.zendesk.com",
      lastSyncedAt: new Date(),
    },
  });

  await prisma.subscription.create({
    data: {
      companyId: company.id,
      whopMembershipId: "mem_demo_12345",
      planTier: "GROWTH",
      status: "ACTIVE",
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  const sampleTickets = [
    {
      sourceTicketId: "zd-1001",
      subject: "Where is my order?",
      content: "Hi, I ordered a jacket 5 days ago and haven't received a tracking update. Order #4821.",
      customerEmail: "customer1@example.com",
      classification: "AUTO_RESOLVE" as const,
      status: "RESOLVED" as const,
      aiDraftReply: "Hi! Your order #4821 shipped yesterday and is currently in transit. Tracking: 1Z999AA1...",
      resolvedAt: new Date(),
    },
    {
      sourceTicketId: "zd-1002",
      subject: "Refund request - wrong size",
      content: "The shirt I received is the wrong size. I need a refund or exchange.",
      customerEmail: "customer2@example.com",
      classification: "DRAFT_FOR_REVIEW" as const,
      status: "PENDING_REVIEW" as const,
      aiDraftReply: "I'm sorry about the sizing issue! I can process an exchange for the correct size at no extra cost, or issue a full refund — whichever you prefer.",
    },
    {
      sourceTicketId: "zd-1003",
      subject: "Account was charged twice",
      content: "I was charged twice for the same order this morning. This needs to be fixed urgently, very frustrated.",
      customerEmail: "customer3@example.com",
      sentiment: "negative",
      classification: "ESCALATE" as const,
      status: "ESCALATED" as const,
      aiSummary: "Customer reports duplicate charge, high urgency, negative sentiment. Needs billing team review.",
    },
  ];

  for (const t of sampleTickets) {
    await prisma.ticket.create({
      data: {
        ...t,
        companyId: company.id,
        helpdeskConnectionId: connection.id,
      },
    });
  }

  await prisma.routingRule.create({
    data: {
      companyId: company.id,
      name: "Escalate billing issues",
      priority: 1,
      conditions: { field: "keyword", operator: "contains", value: "charged twice" },
      actions: { classification: "ESCALATE" },
    },
  });

  await prisma.knowledgeBaseDocument.create({
    data: {
      companyId: company.id,
      title: "Shipping & Returns FAQ",
      content: "Orders ship within 2 business days. Returns accepted within 30 days for unworn items with tags attached.",
      sourceType: "faq",
    },
  });

  console.log("Seed complete:", company.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
