import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  const fullName = String(body.fullName || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const subject = String(body.subject || "").trim();
  const message = String(body.message || "").trim();

  if (!fullName || !message) {
    return NextResponse.json(
      { error: "Full name and message are required." },
      { status: 400 }
    );
  }

  await sql`
    INSERT INTO contact_messages
    (full_name, email, phone, subject, message)
    VALUES
    (${fullName}, ${email || null}, ${phone || null}, ${subject || null}, ${message})
  `;

  return NextResponse.json({
    ok: true,
    message: "Your message has been received.",
  });
}
