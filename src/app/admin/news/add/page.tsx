"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddNewsPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  function makeSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        slug: makeSlug(title),
        summary,
        content,
        image_url: imageUrl,
        status: "published",
      }),
    });

    if (res.ok) {
      router.push("/admin/news");
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to save news");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Add News</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 max-w-3xl space-y-4"
      >
        <div>
          <label className="block font-bold mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Full Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            rows={7}
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Image URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/images/news.jpg"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          disabled={loading}
          className="bg-blue-700 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save News"}
        </button>
      </form>
    </main>
  );
}