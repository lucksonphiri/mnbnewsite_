import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Please select a file." }, { status: 400 });
    }

    const maxSize = file.type.startsWith("video/") ? 150 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "The selected file is too large." }, { status: 400 });
    }

    const allowed = file.type.startsWith("image/") || file.type.startsWith("video/") || file.type === "application/pdf";
    if (!allowed) {
      return NextResponse.json({ error: "Only images, videos and PDF files are allowed." }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const blob = await put(`mnb/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url, pathname: blob.pathname });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed. Check BLOB_READ_WRITE_TOKEN." }, { status: 500 });
  }
}
