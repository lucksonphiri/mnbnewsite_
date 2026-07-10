import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const structures = await sql`SELECT * FROM fee_structures ORDER BY year DESC, id DESC`;
    const items = await sql`SELECT * FROM fee_items ORDER BY fee_structure_id DESC, class_name, display_order, id`;
    return NextResponse.json({ structures, items });
  } catch { return NextResponse.json({ error: "Failed to load fees." }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const b = await request.json();
    if (b.action === "structure") {
      if (b.status === "active") await sql`UPDATE fee_structures SET status='inactive' WHERE status='active'`;
      const r = await sql`INSERT INTO fee_structures(title,term_label,year,status,description,pdf_url) VALUES(${b.title},${b.term_label || null},${Number(b.year)},${b.status || 'active'},${b.description || null},${b.pdf_url || null}) RETURNING *`;
      return NextResponse.json(r[0], { status: 201 });
    }
    if (b.action === "item") {
      const r = await sql`INSERT INTO fee_items(fee_structure_id,class_name,item_name,amount,currency,display_order) VALUES(${Number(b.fee_structure_id)},${b.class_name},${b.item_name},${Number(b.amount)},${b.currency || 'USD'},${Number(b.display_order || 0)}) RETURNING *`;
      return NextResponse.json(r[0], { status: 201 });
    }
    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (error) { console.error(error); return NextResponse.json({ error: "Failed to save fees." }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url); const id = Number(url.searchParams.get("id")); const type = url.searchParams.get("type");
  if (!id) return NextResponse.json({ error: "ID required." }, { status: 400 });
  if (type === "structure") await sql`DELETE FROM fee_structures WHERE id=${id}`;
  else await sql`DELETE FROM fee_items WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
