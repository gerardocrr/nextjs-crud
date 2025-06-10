import { NextResponse } from "next/server";
import { turso } from "@/lib/db";

export async function GET() {
  const { rows } = await turso.execute(
    "SELECT * FROM movies ORDER BY created_at DESC"
  );

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  try {
    const { title, year, director, poster } = await req.json();
    const id = crypto.randomUUID();
    await turso.execute({
      sql: "INSERT INTO movies (id, title, year, director, poster) VALUES (?, ?, ?, ?, ?)",
      args: [id, title, year, director, poster],
    });
    return NextResponse.json({ success: true, message: "Data saved" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error saving data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { title, year, director, poster, id } = await req.json();
    await turso.execute({
      sql: "UPDATE movies SET title = ?, year = ?, director = ?, poster = ? WHERE id = ?",
      args: [title, year, director, poster, id],
    });
    return NextResponse.json({ success: true, message: "Data saved" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error saving data" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await turso.execute({
      sql: "DELETE FROM movies WHERE id = ?",
      args: [id],
    });
    return NextResponse.json({ success: true, message: "Data deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting data" }, { status: 500 });
  }
}
