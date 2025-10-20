"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Project } from "@/components/ProjectCard";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/projects`);
        const data: Project[] = await res.json();
        const proj = data.find((p) => p.id === Number(id));
        setProject(proj ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (res.ok) {
        alert("Project berhasil diperbarui ✅");
        router.push("/dashboard");
      } else {
        const err = await res.json();
        alert("Gagal update project: " + err.error);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat update project.");
    }
  };

  if (loading)
    return <p className="text-gray-400 text-center mt-10">Memuat project...</p>;
  if (!project)
    return (
      <p className="text-red-400 text-center mt-10">Project tidak ditemukan</p>
    );

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={project.title}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded"
          placeholder="Judul Project"
          required
        />
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded"
          rows={3}
          placeholder="Deskripsi Project"
          required
        />
        <input
          type="text"
          name="tech"
          value={project.tech.join(", ")}
          onChange={(e) =>
            setProject((p) =>
              p
                ? { ...p, tech: e.target.value.split(",").map((t) => t.trim()) }
                : p
            )
          }
          className="w-full bg-gray-800 p-2 rounded"
          placeholder="Tech (pisahkan dengan koma)"
        />
        <input
          type="text"
          name="github_url"
          value={project.github_url ?? ""}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded"
          placeholder="GitHub URL"
        />
        <input
          type="text"
          name="demo_url"
          value={project.demo_url ?? ""}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded"
          placeholder="Demo URL"
        />
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
