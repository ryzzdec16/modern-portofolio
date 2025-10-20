'use client';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const base =
    'px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring';
  const variants = {
    primary: 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-md',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-200',
    ghost: 'bg-transparent hover:bg-gray-800 text-cyan-400',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
