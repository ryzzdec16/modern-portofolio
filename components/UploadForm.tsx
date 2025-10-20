'use client';
import { useState, ChangeEvent } from 'react';

interface ProjectData {
  title: string;
  description: string;
  image: string | null;
  tech: string[];
}

export default function UploadForm() {
  const [formData, setFormData] = useState<ProjectData>({
    title: '',
    description: '',
    image: null,
    tech: [],
  });
  const [techInput, setTechInput] = useState('');

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData((prev) => ({ ...prev, image: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTech = () => {
    if (techInput.trim() !== '') {
      setFormData((prev) => ({
        ...prev,
        tech: [...prev.tech, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      tech: prev.tech.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('✅ Project berhasil diinput (frontend simulation)');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-950 border border-gray-800 p-6 rounded-2xl w-full max-w-2xl mx-auto shadow-lg"
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Upload Project</h2>

      {/* Judul */}
      <label className="block mb-4">
        <span className="text-gray-300">Judul Project</span>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="mt-1 w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-cyan-400 outline-none"
          required
        />
      </label>

      {/* Deskripsi */}
      <label className="block mb-4">
        <span className="text-gray-300">Deskripsi</span>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="mt-1 w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-cyan-400 outline-none h-24"
          required
        />
      </label>

      {/* Gambar */}
      <label className="block mb-4">
        <span className="text-gray-300">Upload Gambar</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2 text-gray-400"
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="mt-3 rounded-xl border border-gray-800 max-h-64 object-cover"
          />
        )}
      </label>

      {/* Tech Stack */}
      <div className="mb-4">
        <span className="text-gray-300">Tech Stack</span>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-cyan-400 outline-none"
            placeholder="misal: Next.js"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="px-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition"
          >
            + Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {formData.tech.map((t) => (
            <span
              key={t}
              onClick={() => handleRemoveTech(t)}
              className="px-3 py-1 text-sm bg-gray-800 rounded-md text-gray-300 cursor-pointer hover:bg-red-600 hover:text-white"
            >
              {t} ✕
            </span>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded-lg transition mt-4"
      >
        Simpan Project
      </button>
    </form>
  );
}
