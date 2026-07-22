import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const code = request.nextUrl.searchParams.get("code");
    const error = request.nextUrl.searchParams.get("error");
    const errorDescription = request.nextUrl.searchParams.get("error_description");

    if (error) {
      return NextResponse.redirect(`/login?error=${encodeURIComponent(errorDescription || error)}`);
    }

    if (!code) {
      return NextResponse.redirect(`/login?error=${encodeURIComponent("Kein Code erhalten.")}`);
    }

    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const redirectUri = process.env.DISCORD_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.redirect(`/login?error=${encodeURIComponent("Discord OAuth2 nicht vollständig konfiguriert.")}`);
    }

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      console.error("Discord token error:", tokenRes.status, text);
      return NextResponse.redirect(`/login?error=${encodeURIComponent("Token-Austausch fehlgeschlagen: " + tokenRes.status)}`);
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      const text = await userRes.text();
      console.error("Discord user error:", userRes.status, text);
      return NextResponse.redirect(`/login?error=${encodeURIComponent("User-Daten fehlgeschlagen: " + userRes.status)}`);
    }

    const user = await userRes.json();

    const response = NextResponse.redirect("/");
    response.cookies.set("discord_user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.redirect(`/login?error=${encodeURIComponent("Login fehlgeschlagen.")}`);
  }
}
