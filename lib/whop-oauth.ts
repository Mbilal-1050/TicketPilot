// lib/whop-oauth.ts
// "Sign in with Whop" — OAuth 2.1 + PKCE + OIDC.
// Docs: https://docs.whop.com/developer/guides/oauth
// NOTE: token exchange uses a JSON body and does NOT require a client_secret.

import crypto from "crypto";

const WHOP_OAUTH_BASE = "https://api.whop.com/oauth";

export interface PkceState {
  codeVerifier: string;
  state: string;
  nonce: string;
}

export function randomString(length: number): string {
  return crypto.randomBytes(length).toString("base64url");
}

export function sha256Challenge(verifier: string): string {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

export function buildAuthorizeUrl(pkce: PkceState, redirectUri: string): string {
  const clientId = process.env.NEXT_PUBLIC_WHOP_APP_ID;
  if (!clientId) throw new Error("NEXT_PUBLIC_WHOP_APP_ID is not set");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "openid profile email",
    state: pkce.state,
    nonce: pkce.nonce,
    code_challenge: sha256Challenge(pkce.codeVerifier),
    code_challenge_method: "S256",
  });

  return `${WHOP_OAUTH_BASE}/authorize?${params.toString()}`;
}

export interface WhopTokens {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  token_type: string;
  expires_in: number;
}

export async function exchangeCodeForTokens(code: string, codeVerifier: string, redirectUri: string): Promise<WhopTokens> {
  const clientId = process.env.NEXT_PUBLIC_WHOP_APP_ID;
  if (!clientId) throw new Error("NEXT_PUBLIC_WHOP_APP_ID is not set");

  const res = await fetch(`${WHOP_OAUTH_BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Whop token exchange failed: ${res.status} ${text}`);
  }

  return res.json();
}

export interface WhopUserInfo {
  sub: string;
  name?: string;
  preferred_username?: string;
  picture?: string;
  email?: string;
}

export async function fetchUserInfo(accessToken: string): Promise<WhopUserInfo> {
  const res = await fetch(`${WHOP_OAUTH_BASE}/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Whop userinfo fetch failed: ${res.status} ${text}`);
  }

  return res.json();
}
