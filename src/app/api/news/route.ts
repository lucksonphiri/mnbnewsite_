import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  const rows = await sql`
    SELECT id, title, slug, summary, image_url, created_at
    FROM news_posts
    WHERE status = 'published'
    ORDER BY created_at DESC
  `;

  return NextResponse.json(rows);
}
