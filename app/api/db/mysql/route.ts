import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const config = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "staticbot",
};

let pool: mysql.Pool | null = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...config,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const table = url.pathname.split("/").pop();
    const searchParams = url.searchParams;

    if (!table || table === "mysql") {
      return NextResponse.json({ error: "Tabelle erforderlich" }, { status: 400 });
    }

    const conn = getPool();
    let query = `SELECT * FROM \`${table}\``;
    const params: any[] = [];

    const whereClause = searchParams.get("where");
    if (whereClause) {
      query += ` WHERE ${whereClause}`;
    }

    const [rows] = (await conn.query(query, params)) as [any[], any];
    return NextResponse.json(rows);
  } catch (err) {
    console.error("MySQL GET error:", err);
    return NextResponse.json({ error: "Fehler beim Lesen" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const table = url.pathname.split("/").pop();
    const body = await request.json();

    if (!table || table === "mysql") {
      return NextResponse.json({ error: "Tabelle erforderlich" }, { status: 400 });
    }

    const conn = getPool();
    const keys = Object.keys(body);
    const values = Object.values(body);
    const placeholders = keys.map(() => "?").join(", ");

    const query = `INSERT INTO \`${table}\` (\`${keys.join("`,`")}\`) VALUES (${placeholders})`;
    const [result] = (await conn.query(query, values)) as [any, any];

    return NextResponse.json({ id: result.insertId, ...body }, { status: 201 });
  } catch (err) {
    console.error("MySQL POST error:", err);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const table = url.pathname.split("/").pop();
    const searchParams = url.searchParams;

    if (!table || table === "mysql") {
      return NextResponse.json({ error: "Tabelle erforderlich" }, { status: 400 });
    }

    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID erforderlich" }, { status: 400 });
    }

    const conn = getPool();
    const query = `DELETE FROM \`${table}\` WHERE id = ?`;
    await conn.query(query, [id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("MySQL DELETE error:", err);
    return NextResponse.json({ error: "Fehler beim Löschen" }, { status: 500 });
  }
}
