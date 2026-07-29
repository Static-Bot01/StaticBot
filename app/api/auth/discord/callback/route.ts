import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = cookieStore.get("discord_oauth_state")?.value;

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  if (!storedState || state !== storedState) {
    return NextResponse.json(
      { error: "Invalid state" },
      { status: 400 }
    );
  }

  const codeVerifier = cookieStore.get("discord_code_verifier")?.value;

  if (!codeVerifier) {
    return NextResponse.json(
      { error: "No code verifier found" },
      { status: 400 }
    );
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "Server configuration missing" },
      { status: 500 }
    );
  }

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      return NextResponse.json(
        { error: "Token exchange failed", details: errorData },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user profile" },
        { status: 400 }
      );
    }

    const userData = await userResponse.json();

    cookieStore.set("discord_user", JSON.stringify(userData), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.delete("discord_code_verifier");

    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}