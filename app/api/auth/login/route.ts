// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { buildAuthorizeUrl, randomString } from "@/lib/whop-oauth";

export async function GET(req: NextRequest) {
  const codeVerifier = randomString(32);
  const state = randomString(16);
  const nonce = randomString(16);

  const cookieStore = await cookies();
  cookieStore.set("tp_pkce_verifier", codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });
  cookieStore.set("tp_pkce_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/whop`;
  const authorizeUrl = buildAuthorizeUrl({ codeVerifier, state, nonce }, redirectUri);

  return NextResponse.redirect(authorizeUrl);
}
