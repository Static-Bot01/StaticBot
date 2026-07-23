import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "public", "database.json");

function readDb() {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function writeDb(data: Record<string, any>) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const collection = url.pathname.split("/").pop();

    const data = readDb();

    if (collection && collection !== "db") {
      return NextResponse.json(data[collection] || []);
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("DB GET error:", err);
    return NextResponse.json({ error: "Fehler beim Lesen" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const collection = url.pathname.split("/").pop();

    if (!collection || collection === "db") {
      return NextResponse.json({ error: "Collection erforderlich" }, { status: 400 });
    }

    const body = await request.json();
    const data = readDb();

    if (!Array.isArray(data[collection])) {
      data[collection] = [];
    }

    const newItem = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    data[collection].push(newItem);
    writeDb(data);

    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error("DB POST error:", err);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
