'use client';
import { useState } from 'react';

interface ClientRequest {
  name: string;
  email: string;
  projectTitle: string;
  description: string;
  budget: string;
}

export default function ApplyForm() {
  const [form, setForm] = useState<ClientRequest>({
    name: '',
    email: '',
    projectTitle: '',
    description: '',
    budget: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.projectTitle || !form.description) {
      alert('⚠️ Harap isi semua field.');
      return;
    }
    console.log('Form Submitted:', form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center bg-gray-950 border border-gray-800 rounded-2xl p-8 shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">✅ Request Terkirim!</h2>
        <p className="text-gray-400 mb-6">
          Terima kasih, {form.name}. Kami akan menghubungi kamu di <span className="text-cyan-400">{form.email}</span>.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400 transition"
        >
          Kirim Request Lagi
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-950 border border-gray-800 rounded-2xl p-8 shadow-lg w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Apply Project</h2>

      {/* Nama */}
      <label className="block mb-4">
        <span className="text-gray-300">Nama</span>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-cyan-400 outline-none"
          required
        />
      </label>

      {/* Email */}
      <label className="block mb-4">
        <span className="text-gray-300">Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-cyan-400 outline-none"
          required
        />
      </label>

      {/* Judul Project */}
      <label className="block mb-4">
        <span className="text-gray-300">Judul Project</span>
        <input
          type="text"
          name="projectTitle"
          value={form.projectTitle}
          onChange={handleChange}
          className="mt-1 w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-cyan-400 outline-none"
          required
        />
      </label>

      {/* Deskripsi */}
      <label className="block mb-4">
        <span className="text-gray-300">Deskripsi Project</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="mt-1 w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-cyan-400 outline-none h-28"
          required
        />
      </label>

      {/* Budget */}
      <label className="block mb-4">
        <span className="text-gray-300">Estimasi Budget (opsional)</span>
        <input
          type="text"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          placeholder="contoh: Rp 5.000.000"
          className="mt-1 w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-cyan-400 outline-none"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded-lg transition mt-4"
      >
        Kirim Request
      </button>
    </form>
  );
}
