'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    tech: '',
    github_url: '',
    demo_url: '',
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('tech', form.tech);
    formData.append('github_url', form.github_url);
    formData.append('demo_url', form.demo_url);
    if (form.image) formData.append('image', form.image);

    const res = await fetch('/api/projects', {
      method: 'POST',
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      router.push('/dashboard');
      router.refresh();
    } else {
      const err = await res.json();
      alert('Gagal menambah project: ' + err.error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tambah Project Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Judul project"
          value={form.title}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Deskripsi project"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded"
          required
        />
        <input
          type="text"
          name="tech"
          placeholder="Teknologi (pisahkan dengan koma, misal: React, Next.js, Supabase)"
          value={form.tech}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded"
        />
        <input
          type="text"
          name="github_url"
          placeholder="Link GitHub"
          value={form.github_url}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded"
        />
        <input
          type="text"
          name="demo_url"
          placeholder="Link Demo"
          value={form.demo_url}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFile}
          className="w-full bg-gray-800 p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Menyimpan...' : 'Simpan Project'}
        </button>
      </form>
    </div>
  );
}
