import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  const rows = await sql`
    SELECT id, title, description, file_url, category
    FROM downloads
    ORDER BY created_at DESC
  `;

  return NextResponse.json(rows);
}
