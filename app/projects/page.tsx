"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard, { Project } from "../../components/ProjectCard";
import { ProjectModal } from "../../components/ProjectModal";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Ambil data project dari backend API
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Gagal memuat data");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-950 text-white py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-center text-cyan-400 mb-12"
        >
          Projects
        </motion.h1>

        {/* ⏳ Loading skeleton */}
        {loading ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-900 rounded-xl border border-gray-800 animate-pulse"
              ></div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-gray-400 text-center">Belum ada project.</p>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelected(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* 💬 Modal Project Detail */}
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </motion.section>
  );
}
