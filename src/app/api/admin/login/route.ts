import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const password = String(body.password || "");

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("mnb_admin_token", "logged-in", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res;
}