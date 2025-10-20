"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget); // 🟢 multipart/form-data otomatis

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData, // ⬅️ kirim langsung FormData
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Gagal menambahkan project: " + err.error);
      } else {
        alert("✅ Project berhasil ditambahkan!");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Terjadi kesalahan saat menambahkan project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">Tambah Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
          rows={3}
        />

        <input
          type="text"
          name="tech"
          placeholder="Tech (pisahkan dengan koma)"
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
        />

        <input
          type="text"
          name="github_url"
          placeholder="GitHub URL"
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
        />

        <input
          type="text"
          name="demo_url"
          placeholder="Demo URL"
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md w-full"
        >
          {loading ? "Menyimpan..." : "Tambah Project"}
        </button>
      </form>
    </div>
  );
}
