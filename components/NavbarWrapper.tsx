"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function NavbarWrapper() {
  const pathname = usePathname();

  const hideNav = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (hideNav) return null;
  return <Navbar />;
}
