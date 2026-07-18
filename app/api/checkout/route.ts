// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCheckoutUrl } from "@/lib/whop";

const PLAN_PRODUCT_IDS: Record<string, string | undefined> = {
  starter: process.env.WHOP_STARTER_CHECKOUT_PLAN_ID,
  growth: process.env.WHOP_GROWTH_CHECKOUT_PLAN_ID,
  scale: process.env.WHOP_SCALE_CHECKOUT_PLAN_ID,
};

export async function GET(req: NextRequest) {
  const plan = req.nextUrl.searchParams.get("plan");

  if (!plan || !(plan in PLAN_PRODUCT_IDS)) {
    return NextResponse.json({ error: "Invalid or missing plan" }, { status: 400 });
  }

  const productId = PLAN_PRODUCT_IDS[plan];
  if (!productId) {
    return NextResponse.json({ error: "Plan not configured" }, { status: 500 });
  }

  const checkoutUrl = getCheckoutUrl(productId);
  return NextResponse.redirect(checkoutUrl);
}
