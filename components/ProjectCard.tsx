"use client";
import { motion } from "framer-motion";
import { Github, Globe, Trash2, Edit } from "lucide-react";

/* ✅ Tambahkan ini di atas */
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github_url?: string;
  demo_url?: string;
}

interface Props {
  project: Project;
  onClick?: () => void;
  onEdit?: (project: Project) => void;
  onDelete?: (id: number) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onClick,
}: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden cursor-pointer p-4 flex flex-col"
      onClick={onClick}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      <h3 className="text-cyan-400 font-semibold text-lg">{project.title}</h3>
      <p className="text-gray-400 text-sm line-clamp-2">
        {project.description}
      </p>

      <div className="flex gap-2 mt-2 flex-wrap">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs bg-gray-800/60 border border-gray-700 px-2 py-1 rounded-full text-gray-300"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-3 items-center">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            onClick={(e) => e.stopPropagation()} // ✅ Supaya nggak trigger card click
          >
            <Github size={16} />
          </a>
        )}

        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Globe size={16} />
          </a>
        )}

        {/* ✅ Tombol Edit */}
        {onEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit(project);
            }}
            className="text-blue-400 hover:text-blue-300 transition"
          >
            <Edit size={16} />
          </button>
        )}

        {/* ✅ Tombol Delete */}
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(project.id);
            }}
            className="text-red-500 hover:text-red-400 transition"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
