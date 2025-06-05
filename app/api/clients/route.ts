import { NextResponse } from "next/server";
import { turso } from "@/lib/db";

export async function GET() {
  const { rows } = await turso.execute(
    "SELECT * FROM clients ORDER BY create_at DESC"
  );

  return NextResponse.json(rows);
}
