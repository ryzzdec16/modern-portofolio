'use client';
import { motion } from 'framer-motion';

export interface Request {
  id: number;
  client: string;
  email: string;
  projectTitle: string;
  message: string;
  status: 'pending' | 'reviewed' | 'done';
}

export function RequestCard({ request }: { request: Request }) {
  const statusColor = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    reviewed: 'bg-blue-500/20 text-blue-400',
    done: 'bg-green-500/20 text-green-400',
  }[request.status];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-md hover:border-cyan-500 transition"
    >
      <h2 className="text-lg font-semibold text-cyan-300 mb-1">
        {request.projectTitle}
      </h2>
      <p className="text-gray-400 text-sm mb-3">{request.message}</p>
      <div className="text-sm text-gray-300 mb-2">
        <span className="font-medium">Client:</span> {request.client}
      </div>
      <div className="text-sm text-gray-400 mb-4">{request.email}</div>
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor}`}
      >
        {request.status}
      </span>
    </motion.div>
  );
}
