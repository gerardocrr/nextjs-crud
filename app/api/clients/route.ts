import { NextResponse } from "next/server";
import { turso } from "@/lib/db";

export async function GET() {
  const { rows } = await turso.execute(
    "SELECT * FROM clients ORDER BY created_at DESC"
  );

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  try {
    const { name, status, email, amount } = await req.json();
    const id = crypto.randomUUID();
    await turso.execute({
      sql: "INSERT INTO clients (id, name, status, email, amount) VALUES (?, ?, ?, ?, ?)",
      args: [id, name, status, email, amount],
    });
    return NextResponse.json({ success: true, message: "Data saved" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error saving data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { name, status, email, amount, id } = await req.json();
    await turso.execute({
      sql: "UPDATE clients SET name = ?, status = ?, email = ?, amount = ? WHERE id = ?",
      args: [name, status, email, amount, id],
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
      sql: "DELETE FROM clients WHERE id = ?",
      args: [id],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting data" }, { status: 500 });
  }
}
