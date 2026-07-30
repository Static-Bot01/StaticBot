import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const guildId = searchParams.get("guildId");

    if (!guildId) {
      return NextResponse.json({ error: "guildId required" }, { status: 400 });
    }

    if (!BOT_TOKEN) {
      return NextResponse.json({ error: "Bot token not configured" }, { status: 500 });
    }

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
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
