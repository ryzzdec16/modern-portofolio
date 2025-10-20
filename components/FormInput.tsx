'use client';
import React, { ChangeEvent } from 'react';

interface PropsBase {
  label: string;
  textarea?: boolean;
}

type InputProps = PropsBase & React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = PropsBase & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function FormInput(props: InputProps | TextareaProps) {
  const { label, textarea, ...rest } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (rest.onChange) rest.onChange(e as any);
  };

  return (
    <label className="block mb-4">
      <span className="text-gray-300">{label}</span>
      {textarea ? (
        <textarea
          {...(rest as TextareaProps)}
          onChange={handleChange}
          className="mt-1 w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-cyan-400 outline-none"
        />
      ) : (
        <input
          {...(rest as InputProps)}
          onChange={handleChange}
          className="mt-1 w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-cyan-400 outline-none"
        />
      )}
    </label>
  );
}
