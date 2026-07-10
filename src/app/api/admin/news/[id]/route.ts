import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const newsId = Number(id);

  if (!Number.isInteger(newsId)) {
    return NextResponse.json({ error: "Invalid news ID" }, { status: 400 });
  }

  await sql`
    DELETE FROM news_posts
    WHERE id = ${newsId}
  `;

  return NextResponse.json({ ok: true });
}