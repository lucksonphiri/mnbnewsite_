import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  const rows = await sql`
    SELECT id, title, description, event_date, venue
    FROM events
    ORDER BY event_date ASC
  `;

  return NextResponse.json(rows);
}
