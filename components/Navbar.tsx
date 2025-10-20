"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const { scrollY } = useScroll();

  // Efek blur & opacity navbar saat scroll
  const blur = useTransform(scrollY, [0, 200], ["blur(0px)", "blur(16px)"]);
  const opacity = useTransform(scrollY, [0, 200], [0.65, 0.9]);
  const smoothOpacity = useSpring(opacity, { stiffness: 80, damping: 20 });

  // Deteksi section aktif
  useMotionValueEvent(scrollY, "change", () => {
    const sections = ["home", "projects", "apply", "contact"];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(id === "home" ? "/" : `/${id}`);
          break;
        }
      }
    }
  });

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/apply", label: "Apply" },
  ];

  return (
    <motion.nav
      style={{ backdropFilter: blur, opacity: smoothOpacity }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 overflow-hidden
                 bg-gray-950/60 text-gray-100 shadow-lg transition-all duration-700"
    >
      {/* 🌈 Gradient aura background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/3 w-[300px] h-[300px]
                     bg-gradient-to-r from-cyan-400/20 to-blue-500/20
                     blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/3 w-[250px] h-[250px]
                     bg-gradient-to-r from-blue-600/20 to-purple-500/20
                     blur-[100px] rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* 🌀 Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight bg-gradient-to-r
                       from-cyan-400 via-blue-400 to-purple-400 bg-clip-text
                       text-transparent animate-gradient-x"
          >
            Ryzzbe<span className="opacity-80">.</span>
          </Link>
        </motion.div>

        {/* 🧭 Desktop Menu */}
        <div
          className="hidden md:flex items-center gap-8 
                     bg-transparent backdrop-blur-xl rounded-2xl px-6 py-2"
        >
          {navLinks.map(({ href, label }) => (
            <motion.div
              key={href}
              whileHover={{ y: -2, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Link
                href={href}
                className={`relative font-medium tracking-wide group transition duration-300 ${
                  activeSection === href
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-300"
                }`}
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r
                    from-cyan-400 via-blue-400 to-cyan-400 transition-all duration-300
                    ${
                      activeSection === href
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 📱 Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-cyan-400"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-gray-950/90 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center gap-5 py-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`text-lg ${
                    activeSection === href
                      ? "text-cyan-400"
                      : "hover:text-cyan-300"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="px-4 py-2 rounded-xl bg-gradient-to-r
                           from-cyan-400 to-blue-500 text-gray-950 font-semibold
                           hover:scale-[1.05] transition-transform"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
