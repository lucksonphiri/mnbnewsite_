import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try { return NextResponse.json(await sql`SELECT * FROM events ORDER BY event_date DESC, id DESC`); }
  catch { return NextResponse.json({ error: "Failed to load events." }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const b = await request.json();
    const id = Number(b.id || 0);
    if (!String(b.title || "").trim() || !b.event_date) return NextResponse.json({ error: "Title and date are required." }, { status: 400 });
    if (id) {
      const r = await sql`UPDATE events SET title=${b.title}, description=${b.description || null}, event_date=${b.event_date}, venue=${b.venue || null}, image_url=${b.image_url || null}, status=${b.status || 'published'}, updated_at=CURRENT_TIMESTAMP WHERE id=${id} RETURNING *`;
      return NextResponse.json(r[0]);
    }
    const r = await sql`INSERT INTO events(title,description,event_date,venue,image_url,status) VALUES(${b.title},${b.description || null},${b.event_date},${b.venue || null},${b.image_url || null},${b.status || 'published'}) RETURNING *`;
    return NextResponse.json(r[0], { status: 201 });
  } catch (error) { console.error(error); return NextResponse.json({ error: "Failed to save event." }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "ID required." }, { status: 400 });
  await sql`DELETE FROM events WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
