import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, section, slot_key, media_type, title, description, file_url,
             poster_url, display_order, is_active, created_at, updated_at
      FROM website_media
      ORDER BY section, display_order, id
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load media." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const section = String(body.section || "").trim();
    const mediaType = String(body.media_type || "image").trim();
    const fileUrl = String(body.file_url || "").trim();
    if (!section || !fileUrl) {
      return NextResponse.json({ error: "Section and file are required." }, { status: 400 });
    }

    const replaceId = body.replace_id ? Number(body.replace_id) : null;
    if (replaceId) {
      const rows = await sql`
        UPDATE website_media SET
          section = ${section},
          slot_key = ${String(body.slot_key || "") || null},
          media_type = ${mediaType},
          title = ${String(body.title || "") || null},
          description = ${String(body.description || "") || null},
          file_url = ${fileUrl},
          poster_url = ${String(body.poster_url || "") || null},
          display_order = ${Number(body.display_order || 0)},
          is_active = ${body.is_active !== false},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${replaceId}
        RETURNING *
      `;
      return NextResponse.json(rows[0]);
    }

    const rows = await sql`
      INSERT INTO website_media
        (section, slot_key, media_type, title, description, file_url, poster_url, display_order, is_active)
      VALUES
        (${section}, ${String(body.slot_key || "") || null}, ${mediaType},
         ${String(body.title || "") || null}, ${String(body.description || "") || null},
         ${fileUrl}, ${String(body.poster_url || "") || null}, ${Number(body.display_order || 0)},
         ${body.is_active !== false})
      RETURNING *
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save media." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const id = Number(body.id);
    if (!id) return NextResponse.json({ error: "Media ID is required." }, { status: 400 });

    const rows = await sql`
      UPDATE website_media SET
        title = ${String(body.title || "") || null},
        description = ${String(body.description || "") || null},
        display_order = ${Number(body.display_order || 0)},
        is_active = ${body.is_active !== false},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update media." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = Number(new URL(request.url).searchParams.get("id"));
    if (!id) return NextResponse.json({ error: "Media ID is required." }, { status: 400 });
    await sql`DELETE FROM website_media WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete media." }, { status: 500 });
  }
}
