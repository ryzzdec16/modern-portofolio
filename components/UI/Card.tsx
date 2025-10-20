import React from "react"
import { motion } from "framer-motion"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg ${className || ""}`}
    >
      {children}
    </motion.div>
  )
}
