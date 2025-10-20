"use client";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const smoothY = useSpring(yParallax, { stiffness: 60, damping: 20 });

  const moveX = useTransform(mouseX, [0, 1], [-40, 40]);
  const moveY = useTransform(mouseY, [0, 1], [-25, 25]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const [shapes, setShapes] = useState<
    {
      width: number;
      height: number;
      top: number;
      left: number;
      duration: number;
    }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 8 }, () => ({
      width: 120 + Math.random() * 100,
      height: 120 + Math.random() * 100,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 5,
    }));
    setShapes(generated);
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center text-center 
                 h-screen overflow-hidden select-none
                 bg-[#020617] bg-[radial-gradient(circle_at_center,rgba(0,40,80,0.25),rgba(0,0,0,0.95))]
                 bg-[url('/noise.png')] bg-[size:300px] bg-blend-overlay"
    >

      {/* 🔵 Ambient gradient glows */}
      <motion.div
        style={{ x: moveX, y: moveY }}
        className="absolute -top-64 left-1/2 -translate-x-1/2 w-[900px] h-[900px]
                   bg-gradient-to-r from-[#00111f] via-[#04204a] to-[#150b25]
                   blur-[220px] opacity-50 rounded-full"
      />
      <motion.div
        style={{ x: moveX, y: moveY }}
        className="absolute bottom-0 right-1/3 w-[600px] h-[600px]
                   bg-gradient-to-r from-[#150b25] via-[#08284f] to-[#002d35]
                   blur-[180px] opacity-35 rounded-full"
      />

      {/* 🟩 Floating geometric outlines */}
      {shapes.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {shapes.map((s, i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-400/10 rounded-2xl"
              style={{
                width: `${s.width}px`,
                height: `${s.height}px`,
                top: `${s.top}%`,
                left: `${s.left}%`,
              }}
              animate={{
                rotate: [0, 8, -8, 0],
                opacity: [0.05, 0.2, 0.05],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* ✨ Soft shimmer sweep */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b
                   from-white/5 via-transparent to-transparent pointer-events-none"
      />

      {/* ⚡ Title */}
      <motion.h1
        style={{ y: smoothY }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold mb-6
                   bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500
                   bg-clip-text text-transparent animate-gradient-x"
      >
        Hi, I’m <span className="text-cyan-400">Ryzzbe</span> 👋
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
      >
        I craft <span className="text-cyan-400 font-semibold">immersive</span>{" "}
        and{" "}
        <span className="text-blue-400 font-semibold">high-performance</span>{" "}
        web experiences with Next.js, TailwindCSS & motion design.
      </motion.p>

      {/* 🚀 CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-12 flex flex-wrap justify-center gap-6"
      >
        {/* View My Work */}
        <Link
          href="/projects"
          className="group relative inline-flex items-center gap-2 px-8 py-3 font-semibold 
             rounded-xl overflow-hidden backdrop-blur-md border border-cyan-400/10 
             text-cyan-300 transition-all duration-300 hover:border-cyan-400/40 
             hover:scale-[1.03] active:scale-[0.98]"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-600/10 
               opacity-0 group-hover:opacity-100 rounded-xl blur-xl transition-opacity"
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <span className="relative z-10 flex items-center gap-2 tracking-wide">
            View My Work
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              size={18}
            />
          </span>
        </Link>

        {/* Hire Me */}
        <Link
          href="/apply"
          className="group relative inline-flex items-center gap-2 px-8 py-3 font-semibold 
             rounded-xl overflow-hidden border border-cyan-400/20 text-cyan-300 
             backdrop-blur-md bg-white/5 transition-all duration-300
             hover:border-cyan-400/50 hover:text-cyan-200 hover:shadow-[0_0_25px_rgba(0,255,255,0.15)]
             active:scale-[0.97]"
        >
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-600/10 
               opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <span className="relative z-10">Hire Me</span>
        </Link>
      </motion.div>

      {/* 🧩 Floating Tech Badges */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-wrap justify-center gap-6 mt-20 opacity-95"
      >
        {[
          { name: "Next.js", color: "from-gray-300 to-white" },
          { name: "TailwindCSS", color: "from-cyan-400 to-blue-400" },
          { name: "Framer Motion", color: "from-pink-400 to-purple-400" },
          { name: "Supabase", color: "from-emerald-400 to-green-500" },
        ].map((tech, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0.9 }}
            animate={{ y: [0, -5, 0], opacity: 1 }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.1,
              filter: "brightness(1.3)",
            }}
            className="relative group px-6 py-2.5 rounded-full
                 backdrop-blur-xl border border-white/10
                 bg-gradient-to-b from-white/5 to-white/2
                 shadow-[0_0_20px_rgba(0,255,255,0.05)]
                 overflow-hidden"
          >
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${tech.color} opacity-20 blur-md`}
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span
              className={`relative z-10 font-semibold text-sm 
                    bg-gradient-to-r ${tech.color} 
                    bg-clip-text text-transparent`}
            >
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* 🧭 Scroll hint */}
      <motion.div
        className="absolute bottom-10 flex items-center justify-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.6, 0.4, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="relative w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
        <motion.div
          className="absolute w-2 h-2 bg-cyan-400/80 rounded-full"
          animate={{ x: [-40, 40] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
