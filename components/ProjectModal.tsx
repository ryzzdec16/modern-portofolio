"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { Project } from "./ProjectCard";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
          onClick={onClose}
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
            className="relative bg-gray-950/70 border border-gray-800 rounded-2xl 
                       shadow-2xl p-6 w-[90%] max-w-3xl text-gray-200 overflow-hidden"
          >
            {/* Tombol Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>

            {/* Konten */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Gambar Project */}
              <div className="relative w-full md:w-1/2 h-60 md:h-80 rounded-xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-xl border border-gray-800"
                />
              </div>

              {/* Detail */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-cyan-400 mb-3">
                  {project.title}
                </h2>
                <p className="text-gray-300 mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
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

                {/* Tombol Link */}
                <div className="flex gap-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-sm transition"
                    >
                      Lihat Code
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg text-sm transition"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
