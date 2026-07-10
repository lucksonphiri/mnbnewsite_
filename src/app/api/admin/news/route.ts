import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(){try{return NextResponse.json(await sql`SELECT * FROM news_posts ORDER BY created_at DESC, id DESC`)}catch{return NextResponse.json({error:"Failed to load news."},{status:500})}}


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = String(body.title || "").trim();
    const slug = String(body.slug || "").trim();
    const summary = String(body.summary || "").trim();
    const content = String(body.content || "").trim();
    const imageUrl = String(body.image_url || "").trim();
    const status = String(body.status || "published").trim();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required." },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO news_posts 
      (title, slug, summary, content, image_url, status)
      VALUES 
      (${title}, ${slug}, ${summary || null}, ${content || null}, ${imageUrl || null}, ${status})
    `;

    return NextResponse.json({
      ok: true,
      message: "News saved successfully.",
    });
  } catch (error: any) {
    console.error("Save news error:", error);

    return NextResponse.json(
      { error: "Failed to save news." },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request){const id=Number(new URL(req.url).searchParams.get("id"));if(!id)return NextResponse.json({error:"ID required"},{status:400});await sql`DELETE FROM news_posts WHERE id=${id}`;return NextResponse.json({ok:true})}
