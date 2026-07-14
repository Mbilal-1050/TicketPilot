// app/api/webhooks/whop/route.ts
//
// Handles incoming Whop webhooks. Verifies the signature before trusting
// any payload, then updates Company/Subscription records accordingly.

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { planTierFromProductId, PLAN_LIMITS } from "@/lib/whop";
import { sendReceiptEmail } from "@/lib/email";
import crypto from "crypto";

function verifyWhopSignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader) return false;

  // Whop follows the Standard Webhooks spec: "v1,<base64-signature>"
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");

  const parts = signatureHeader.split(",");
  return parts.some((part) => {
    const [, sig] = part.split("v1,");
    const candidate = sig ?? part;
    try {
      return crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
    } catch {
      return false;
    }
  });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("whop-signature") ?? req.headers.get("webhook-signature");

  const secret = process.env.WHOP_WEBHOOK_SECRET;
  if (!secret) {
    console.error("WHOP_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const isValid = verifyWhopSignature(rawBody, signature, secret);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  try {
    switch (event.type) {
      case "membership.activated": {
        const { id: membershipId, product_id: productId, user_id: whopUserId } = event.data;
        const planTier = planTierFromProductId(productId);
        if (!planTier) {
          console.warn(`Unknown product ID on membership.activated: ${productId}`);
          break;
        }

        const user = await db.user.findUnique({ where: { whopUserId }, include: { company: true } });
        if (!user) {
          console.warn(`No local user found for whopUserId ${whopUserId}`);
          break;
        }

        await db.company.update({
          where: { id: user.companyId },
          data: { planTier },
        });

        await db.subscription.upsert({
          where: { companyId: user.companyId },
          create: {
            companyId: user.companyId,
            whopMembershipId: membershipId,
            planTier,
            status: "ACTIVE",
            currentPeriodStart: new Date(),
          },
          update: {
            whopMembershipId: membershipId,
            planTier,
            status: "ACTIVE",
          },
        });

        await db.auditLog.create({
          data: {
            companyId: user.companyId,
            action: "plan.upgraded",
            metadata: { planTier, membershipId },
          },
        });
        break;
      }

      case "membership.deactivated": {
        const { user_id: whopUserId } = event.data;

        const user = await db.user.findUnique({ where: { whopUserId } });
        if (!user) break;

        await db.company.update({
          where: { id: user.companyId },
          data: { planTier: "FREE" },
        });

        await db.subscription.updateMany({
          where: { companyId: user.companyId },
          data: { status: "CANCELED" },
        });

        await db.auditLog.create({
          data: {
            companyId: user.companyId,
            action: "plan.downgraded",
            metadata: { reason: "membership.deactivated" },
          },
        });
        break;
      }

      case "payment.succeeded": {
        const { user_id: whopUserId, final_amount: amount } = event.data;

        const user = await db.user.findUnique({ where: { whopUserId } });
        if (!user) break;

        await db.auditLog.create({
          data: {
            companyId: user.companyId,
            action: "payment.succeeded",
            metadata: { amount },
          },
        });

        try {
          const company = await db.company.findUnique({ where: { id: user.companyId } });
          if (company) {
            await sendReceiptEmail(user.email, amount, company.planTier);
          }
        } catch (emailErr) {
          console.error("Failed to send receipt email:", emailErr);
          // Don't fail the webhook over an email issue
        }
        break;
      }

      default:
        console.log(`Unhandled Whop webhook event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Error processing Whop webhook:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
