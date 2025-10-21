"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectCard, { Project } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 🔄 Fetch Projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Gagal memuat projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchProjects, 300); // sedikit delay biar smooth
    return () => clearTimeout(timer);
  }, []);

  // ✏️ Edit Project
  const handleEdit = (project: Project) => {
    setSelectedProject(null); // tutup modal dulu
    router.push(`/dashboard/edit/${project.id}`);
  };

  // 🗑️ Delete Project
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus project ini?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setSelectedProject(null);
        alert("Project berhasil dihapus ✅");
      } else {
        const err = await res.json();
        alert("Gagal hapus project: " + err.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-cyan-400 tracking-wide">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Kelola semua project portofolio kamu dengan mudah.
          </p>
        </div>

        <Link
          href="/dashboard/add"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 
                     transition-all px-5 py-2.5 rounded-xl text-white font-semibold shadow-lg 
                     hover:shadow-cyan-600/30"
        >
          + Tambah Project
        </Link>
      </div>

      {/* Daftar Project */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-64 text-gray-400"
          >
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p>Memuat projects...</p>
          </motion.div>
        ) : projects.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-500 text-center"
          >
            Belum ada project.
          </motion.p>
        ) : (
          <motion.div
            key="projects"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)} // 🧩 buka modal saat diklik
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Detail Project */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
