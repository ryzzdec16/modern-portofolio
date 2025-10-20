'use client';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm text-gray-300">{label}</label>}
      <input
        className={clsx(
          'bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500',
          className
        )}
        {...props}
      />
    </div>
  );
}
