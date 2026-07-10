"use client";

import { useRouter } from "next/navigation";

export default function DeleteNewsButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this news?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/admin/news/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete news");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold"
    >
      Delete
    </button>
  );
}