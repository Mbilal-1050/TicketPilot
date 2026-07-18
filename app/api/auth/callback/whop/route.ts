// app/api/auth/callback/whop/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCodeForTokens, fetchUserInfo } from "@/lib/whop-oauth";
import { createSession } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  const cookieStore = await cookies();
  const expectedState = cookieStore.get("tp_pkce_state")?.value;
  const codeVerifier = cookieStore.get("tp_pkce_verifier")?.value;

  cookieStore.delete("tp_pkce_state");
  cookieStore.delete("tp_pkce_verifier");

  if (!code || !state || !expectedState || !codeVerifier || state !== expectedState) {
    return NextResponse.redirect(
      new URL("/?auth_error=invalid_state", process.env.NEXT_PUBLIC_APP_URL)
    );
  }

  try {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/whop`;
    const tokens = await exchangeCodeForTokens(code, codeVerifier, redirectUri);
    const profile = await fetchUserInfo(tokens.access_token);

    if (!profile.email) {
      throw new Error("Whop profile did not include an email address");
    }

    let user = await db.user.findUnique({ where: { whopUserId: profile.sub } });

    if (!user) {
      const companyName = profile.name ?? profile.preferred_username ?? "New Workspace";
      const slug = `${(profile.preferred_username ?? profile.sub).toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;

      const company = await db.company.create({
        data: {
          name: companyName,
          slug,
          planTier: "FREE",
          users: {
            create: {
              whopUserId: profile.sub,
              email: profile.email,
              name: profile.name,
              role: "OWNER",
            },
          },
        },
        include: { users: true },
      });

      user = company.users[0];
    }

    await createSession({
      userId: user.id,
      companyId: user.companyId,
      email: user.email,
      name: user.name ?? undefined,
    });

    return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL));
  } catch (err) {
    console.error("Whop OAuth callback error:", err);
    return NextResponse.redirect(
      new URL("/?auth_error=login_failed", process.env.NEXT_PUBLIC_APP_URL)
    );
  }
}
