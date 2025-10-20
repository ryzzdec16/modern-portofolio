"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";

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
  onDelete?: (id: number) => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  const [language, setLanguage] = useState<string>("");

  // 🔍 Auto-detect bahasa utama dari repo GitHub
  useEffect(() => {
    const fetchLanguage = async () => {
      if (!project.github_url) return;
      try {
        const repoPath = project.github_url.replace("https://github.com/", "");
        const res = await fetch(
          `https://api.github.com/repos/${repoPath}/languages`,
          {
            headers: { Accept: "application/vnd.github+json" },
          }
        );
        if (!res.ok) throw new Error("GitHub API error");

        const data = await res.json();
        const langs = Object.entries(data) as [string, number][];
        if (langs.length > 0) {
          const topLang = langs.sort((a, b) => b[1] - a[1])[0][0];
          setLanguage(topLang);
        }
      } catch (err) {
        console.warn("⚠️ Gagal mendeteksi bahasa GitHub:", err);
      }
    };

    fetchLanguage();
  }, [project.github_url]);

  if (!project) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onClick}
      className="group relative bg-gray-950/60 border border-gray-800/70 
                 rounded-2xl overflow-hidden cursor-pointer
                 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]
                 transition-all duration-500 flex flex-col backdrop-blur-sm"
    >
      {/* 🖼️ Thumbnail */}
      {project.image && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* 🔮 Overlay saat hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>
      )}

      {/* 🧩 Konten */}
      <div className="p-5 flex flex-col flex-1 justify-between relative z-10">
        <div>
          <h3 className="text-xl font-semibold text-cyan-400 mb-2 group-hover:text-cyan-300 transition">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* 🏷️ Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs bg-gray-800/60 border border-gray-700 px-2 py-1 rounded-full text-gray-300"
              >
                {t}
              </span>
            ))}

            {/* 🌐 Bahasa Otomatis dari GitHub */}
            {language && (
              <span className="text-xs bg-cyan-500/10 border border-cyan-500/40 px-2 py-1 rounded-full text-cyan-300">
                {language}
              </span>
            )}
          </div>
        </div>

        {/* 🔗 Link Aksi */}
        <div className="flex gap-4 mt-5 text-sm">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} /> <span>Code</span>
            </a>
          )}

          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe size={16} /> <span>Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* 💫 Glow Hover */}
      <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl" />
    </motion.div>
  );
}
