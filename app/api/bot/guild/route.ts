import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

export async function GET(request: Request) {
  try {
    if (!BOT_TOKEN) {
      return NextResponse.json({ error: "Bot token not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const guildId = searchParams.get("guildId");

    if (guildId) {
      const res = await fetch(`https://discord.com/api/guilds/${guildId}`, {
        headers: { Authorization: `Bot ${BOT_TOKEN}` },
      });

      if (res.ok) {
        return NextResponse.json({ inGuild: true });
      } else if (res.status === 404) {
        return NextResponse.json({ inGuild: false });
      } else {
        return NextResponse.json({ error: `Discord API error: ${res.status}` }, { status: res.status });
      }
    }

    const res = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bot ${BOT_TOKEN}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Discord API error: ${res.status}` }, { status: res.status });
    }

    const guilds = await res.json();
    const guildIds = guilds.map((g: { id: string }) => g.id);
    return NextResponse.json({ guildIds });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
