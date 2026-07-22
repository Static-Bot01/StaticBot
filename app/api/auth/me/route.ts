import { NextResponse } from "next/server";

export async function GET() {
  const discordUser = "discord_user"; // Cookie name to read
  
  // In Next.js App Router können wir Cookies direkt lesen
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const userCookie = cookieStore.get(discordUser);

  if (!userCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const user = JSON.parse(userCookie.value);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Invalid cookie" }, { status: 401 });
  }
}
