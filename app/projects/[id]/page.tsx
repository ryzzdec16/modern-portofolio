"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";
import { Project } from "../../../components/ProjectCard";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Project not found");
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error(err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-400">
        <p className="animate-pulse">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-400">
        <p>❌ Project tidak ditemukan</p>
        <button
          onClick={() => router.push("/projects")}
          className="mt-4 px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition"
        >
          Kembali ke Projects
        </button>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-950 text-white py-16 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* 🔙 Tombol kembali */}
        <button
          onClick={() => router.back()}
          className="text-cyan-400 hover:text-cyan-300 mb-10 inline-flex items-center gap-2"
        >
          ← Kembali
        </button>

        {/* 🖼️ Konten utama */}
        <div className="flex flex-col lg:flex-row gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 relative w-full h-80 lg:h-96"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover rounded-2xl border border-gray-800 shadow-lg"
            />
          </motion.div>

          {/* 📝 Detail info */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-cyan-400 mb-4">
              {project.title}
            </h1>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* 🧩 Tech Stack */}
            <div className="flex flex-wrap gap-3 mb-6">
              {project.tech?.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* 🔗 Link Code & Demo */}
            <div className="flex gap-4 mt-auto">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:border-cyan-400 hover:text-cyan-300 transition"
                >
                  <Github size={18} /> Code
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition"
                >
                  <Globe size={18} /> Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
