// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export const config = {
  matcher: ["/api/:path*"],
};

export function middleware(req: NextRequest) {
  // Webhooks get a higher, separate limit since Whop/Zendesk may burst-send events.
  const isWebhook = req.nextUrl.pathname.startsWith("/api/webhooks");
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const key = `${ip}:${req.nextUrl.pathname}`;

  const allowed = isWebhook
    ? checkRateLimit(key, 100, 60_000) // 100 req/min for webhooks
    : checkRateLimit(key, 30, 60_000); // 30 req/min for other API routes

  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  return NextResponse.next();
}
