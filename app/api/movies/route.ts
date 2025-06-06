import { NextResponse } from "next/server";
import { turso } from "@/lib/db";

export async function GET() {
  const { rows } = await turso.execute(
    "SELECT * FROM movies ORDER BY created_at DESC"
  );

  return NextResponse.json(rows);
}
