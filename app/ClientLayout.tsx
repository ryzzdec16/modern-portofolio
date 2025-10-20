"use client";

import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    // Sementara tampilkan loader global
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
