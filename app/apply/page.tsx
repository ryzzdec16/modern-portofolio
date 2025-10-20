"use client";
import { useState } from "react";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import { motion } from "framer-motion";

export default function ApplyProjectPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectTitle: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: form.name,
          email: form.email,
          message: form.message,
          project_id: 1,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("❌ Error submitting:", errorData.error);
        alert("Failed to submit project request. Please try again.");
        return;
      }

      console.log("✅ Successfully submitted project request!");
      setIsOpen(true);
      setForm({ name: "", email: "", projectTitle: "", message: "" });
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center 
      px-6 py-20 md:py-28 bg-gradient-to-b from-gray-950 to-gray-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg rounded-2xl shadow-2xl border border-gray-800 
        bg-gradient-to-b from-gray-900/90 to-gray-950/90 backdrop-blur-md p-8 md:p-10"
      >
        <h1 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Apply for a Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />

          <Input
            label="Project Title"
            name="projectTitle"
            value={form.projectTitle}
            onChange={handleChange}
            placeholder="e.g. Company Landing Page"
            required
          />

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-300 font-medium">
              Project Description
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Describe your project needs..."
              required
              className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              rows={4}
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-medium py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-cyan-500/30"
            >
              Submit Request 🚀
            </Button>
          </motion.div>
        </form>
      </motion.div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Success! 🎉"
      >
        <p className="text-gray-300 text-center leading-relaxed">
          Your project request has been submitted successfully.
          <br />
          I’ll get back to you soon 👋
        </p>
      </Modal>
    </section>
  );
}
