import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB || "staticbot";

if (!uri) {
  console.error("MONGODB_URI fehlt");
}

let client: MongoClient | null = null;

async function getDb() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db(dbName);
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const collection = url.pathname.split("/").pop();
    const searchParams = url.searchParams;

    if (!collection || collection === "db" || collection === "mongodb") {
      return NextResponse.json({ error: "Collection erforderlich" }, { status: 400 });
    }

    const db = await getDb();
    const coll = db.collection(collection);

    let docs: any[] = [];
    if (searchParams.has("id")) {
      const doc = await coll.findOne({ _id: searchParams.get("id") });
      docs = doc ? [doc] : [];
    } else {
      docs = await coll.find({}).toArray();
    }

    return NextResponse.json(docs);
  } catch (err) {
    console.error("MongoDB GET error:", err);
    return NextResponse.json({ error: "Fehler beim Lesen" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const collection = url.pathname.split("/").pop();
    const body = await request.json();

    if (!collection || collection === "db" || collection === "mongodb") {
      return NextResponse.json({ error: "Collection erforderlich" }, { status: 400 });
    }

    const db = await getDb();
    const coll = db.collection(collection);

    const result = await coll.insertOne({
      ...body,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: result.insertedId, ...body }, { status: 201 });
  } catch (err) {
    console.error("MongoDB POST error:", err);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const collection = url.pathname.split("/").pop();
    const searchParams = url.searchParams;

    if (!collection || collection === "db" || collection === "mongodb") {
      return NextResponse.json({ error: "Collection erforderlich" }, { status: 400 });
    }

    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID erforderlich" }, { status: 400 });
    }

    const db = await getDb();
    const coll = db.collection(collection);

    await coll.deleteOne({ _id: id });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("MongoDB DELETE error:", err);
    return NextResponse.json({ error: "Fehler beim Löschen" }, { status: 500 });
  }
}
