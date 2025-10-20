"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import ImageUpload from "@/components/UI/ImageUpload";
import { motion } from "framer-motion";

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const supabase = createClientComponentClient();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    tech: "",
    github_url: "",
    demo_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      alert("Project tidak ditemukan.");
      router.push("/dashboard/projects");
    } else {
      setForm({
        title: data.title,
        description: data.description,
        image_url: data.image_url,
        tech: data.tech?.join(", ") || "",
        github_url: data.github_url,
        demo_url: data.demo_url,
      });
    }
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const techArray = form.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from("projects")
      .update({
        title: form.title,
        description: form.description,
        image_url: form.image_url,
        tech: techArray,
        github_url: form.github_url,
        demo_url: form.demo_url,
      })
      .eq("id", id);

    setSaving(false);

    if (error) alert(`Gagal menyimpan: ${error.message}`);
    else {
      alert("Project berhasil diperbarui!");
      router.push("/dashboard/projects");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading project...
      </div>
    );

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-8"
      >
        <h1 className="text-2xl font-semibold text-cyan-400 mb-6 text-center">
          Edit Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* 🔽 Tambahkan blok ini di sini */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-300">Upload Image</label>
            <ImageUpload
              onUpload={(url) =>
                setForm((prev) => ({ ...prev, image_url: url }))
              }
            />
            {form.image_url && (
              <img
                src={form.image_url}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border border-gray-700 mt-2"
              />
            )}
          </div>
          {/* 🔼 Sampai sini */}

          <Input
            label="Image URL"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
          />

          <Input
            label="Tech (pisahkan dengan koma)"
            name="tech"
            value={form.tech}
            onChange={handleChange}
          />

          <Input
            label="GitHub URL"
            name="github_url"
            value={form.github_url}
            onChange={handleChange}
          />

          <Input
            label="Demo URL"
            name="demo_url"
            value={form.demo_url}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full mt-4" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
