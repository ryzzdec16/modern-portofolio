"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { Button } from "@/components/UI/Button";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const start = Date.now();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      // biar loading minimal 500ms
      const elapsed = Date.now() - start;
      const delay = Math.max(0, 500 - elapsed);
      setTimeout(() => setChecking(false), delay);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (checking) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 transition-opacity duration-500 animate-fadeIn">
      <header className="flex flex-col md:flex-row items-center justify-between p-5 bg-gray-900/70 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <h1 className="text-xl font-bold text-cyan-400">Admin Dashboard</h1>

        <nav className="flex items-center gap-3 mt-3 md:mt-0">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg transition-all duration-200 text-gray-300 hover:text-white hover:bg-gray-800 focus:ring-2 focus:ring-cyan-500"
          >
            Projects
          </Link>
          <Link
            href="/dashboard/requests"
            className="px-4 py-2 rounded-lg transition-all duration-200 text-gray-300 hover:text-white hover:bg-gray-800 focus:ring-2 focus:ring-cyan-500"
          >
            Requests
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-200"
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
