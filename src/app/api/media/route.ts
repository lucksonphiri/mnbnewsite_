import { sql } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    if (!section) {
      return Response.json(
        { error: "Section is required." },
        { status: 400 }
      );
    }

    const media = await sql`
      SELECT
        id,
        section,
        slot_key,
        media_type,
        title,
        description,
        file_url,
        poster_url,
        display_order
      FROM website_media
      WHERE section = ${section}
        AND is_active = TRUE
      ORDER BY display_order ASC
    `;

    return Response.json(media);
  } catch (error) {
    console.error("GET media error:", error);

    return Response.json(
      { error: "Failed to load website media." },
      { status: 500 }
    );
  }
}