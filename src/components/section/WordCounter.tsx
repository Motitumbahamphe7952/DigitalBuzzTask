import React, { useState } from "react";

interface StatBoxProps {
  label: string;
  value: string | number;
  color?: string; // optional Tailwind color class
}

const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>("");

  // Word count logic: split by whitespace and filter out empty strings
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;

  // Average reading speed: ~200 words per minute
  const readingTime = Math.ceil(wordCount / 200);

  const handleClear = () => setText("");

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-zinc-900 rounded-xl shadow-lg space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Word Counter
        </h1>
        <button
          onClick={handleClear}
          className="text-xs font-medium text-zinc-400 hover:text-red-400 transition-colors uppercase tracking-widest"
        >
          Clear Text
        </button>
      </div>

      {/* Text Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="w-full h-64 bg-zinc-900 text-zinc-100 p-4 rounded-xl border border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-zinc-600"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <StatBox label="Words" value={wordCount} color="text-indigo-400" />
        <StatBox
          label="Characters"
          value={charCount}
          color="text-emerald-400"
        />
        <StatBox
          label="Sentences"
          value={sentenceCount}
          color="text-amber-400"
        />
        <StatBox
          label="Read Time"
          value={`${readingTime} min`}
          color="text-sky-400"
        />
      </div>
    </div>
  );
};

// Reusable Stat Component
const StatBox= ({ label, value, color }: StatBoxProps) => (
  <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-700/50 text-center">
    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 font-bold">
      {label}
    </p>
    <p className={`text-2xl font-black ${color}`}>{value}</p>
  </div>
);

export default WordCounter;
