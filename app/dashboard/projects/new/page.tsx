"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { motion } from "framer-motion";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  tech: string[];
  github_url: string;
  demo_url: string;
  created_at: string;
};

export default function AdminProjectsPage() {
  const supabase = createClientComponentClient();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setProjects(data || []);

    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus project ini?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) alert(`Error: ${error.message}`);
    else setProjects(projects.filter((p) => p.id !== id));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading projects...
      </div>
    );

  return (
    <section className="p-6 min-h-screen bg-gray-950 text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-semibold text-cyan-400"
        >
          All Projects
        </motion.h1>

        <Link href="/dashboard/projects/new">
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            + New Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.length > 0 ? (
          projects.map((p) => (
            <Card key={p.id} className="bg-gray-900 border border-gray-800 p-4">
              <img
                src={p.image_url}
                alt={p.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold text-cyan-400">{p.title}</h2>
              <p className="text-sm text-gray-400 line-clamp-2">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {p.tech?.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-gray-800 px-2 py-1 rounded-md text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2 justify-end">
                <a
                  href={p.github_url}
                  target="_blank"
                  className="text-sm text-blue-400 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href={p.demo_url}
                  target="_blank"
                  className="text-sm text-green-400 hover:underline"
                >
                  Demo
                </a>
                <Link href={`/dashboard/projects/${p.id}/edit`}>
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 hover:bg-red-700 text-sm"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
      </div>
    </section>
  );
}
