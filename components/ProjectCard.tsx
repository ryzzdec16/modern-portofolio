"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Globe, Trash2, Edit, X } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github_url?: string;
  demo_url?: string;
}

interface ProjectCardProps {
  project: Project;
  onClick?: () => void; // ✅ optional onClick
  onEdit?: (project: Project) => void;
  onDelete?: (id: number) => void;
}

export default function ProjectCard({
  project,
  onClick,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        className="group relative bg-gray-950/60 border border-gray-800/70 rounded-2xl overflow-hidden cursor-pointer flex flex-col"
        onClick={() => {
          setModalOpen(true);
          if (onClick) onClick(); // ✅ jalankan props onClick jika ada
        }}
      >
        {project.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <h3 className="text-cyan-400 font-semibold text-lg mb-1">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs bg-gray-800/60 border border-gray-700 px-2 py-1 rounded-full text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-gray-950/70 border border-gray-800 rounded-2xl shadow-2xl p-6 w-[90%] max-w-3xl text-gray-200 overflow-hidden"
            >
              {/* Close */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition"
              >
                <X size={22} />
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="relative w-full md:w-1/2 h-60 md:h-80 rounded-xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-xl border border-gray-800"
                  />
                </div>

                {/* Detail */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-cyan-400 mb-3">
                      {project.title}
                    </h2>
                    <p className="text-gray-300 mb-5 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-xs bg-gray-800/70 rounded-full text-gray-300 border border-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-sm transition flex items-center gap-1"
                      >
                        <Github size={16} /> Code
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg text-sm transition flex items-center gap-1"
                      >
                        <Globe size={16} /> Demo
                      </a>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(project)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg text-sm transition flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(project.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg text-sm transition flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
