"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    github_url: "",
    demo_url: "",
    image: "",
  });

  // 🔹 Ambil data project berdasar ID
  useEffect(() => {
    async function fetchProject() {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      if (res.ok) {
        setForm({
          title: data.title || "",
          description: data.description || "",
          tech: data.tech?.join(", ") || "",
          github_url: data.github_url || "",
          demo_url: data.demo_url || "",
          image: data.image || "",
        });
      }
      setLoading(false);
    }
    if (id) fetchProject();
  }, [id]);

  // 🔹 Update project ke API
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tech: form.tech.split(",").map((t) => t.trim()),
      }),
    });
    if (res.ok) {
      alert("✅ Project berhasil diupdate!");
      router.push("/dashboard");
    } else {
      const err = await res.json();
      alert("Gagal update: " + err.error);
    }
  }

  if (loading) return <p className="text-gray-400 p-6">Loading project...</p>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">Edit Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
          rows={3}
        />

        <input
          type="text"
          placeholder="Tech (pisahkan dengan koma)"
          value={form.tech}
          onChange={(e) => setForm({ ...form, tech: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
        />

        <input
          type="text"
          placeholder="GitHub URL"
          value={form.github_url}
          onChange={(e) => setForm({ ...form, github_url: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Demo URL"
          value={form.demo_url}
          onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md"
        />

        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
