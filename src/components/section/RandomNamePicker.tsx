import React, { useState } from "react";

export const NamePicker = () => {
  const [names, setNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [winner, setWinner] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState<boolean>(false);

  const addName = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setNames([...names, inputValue.trim()]);
      setInputValue("");
    }
  };

  const pickRandom = () => {
    if (names.length === 0) return;

    setIsPicking(true);
    setWinner(null);

    // Simple "spinning" delay for effect
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setWinner(names[randomIndex]);
      setIsPicking(false);
    }, 800);
  };

  const clearNames = () => {
    setNames([]);
    setWinner(null);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-zinc-900 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Random Name Picker
      </h2>

      {/* Input Form */}
      <form onSubmit={addName} className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a name..."
          className="flex-1 px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg font-medium"
        >
          Add
        </button>
      </form>

      {/* Name List */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-400">
            Participants: {names.length}
          </span>
          {names.length > 0 && (
            <button
              onClick={clearNames}
              className="text-xs text-red-400 hover:text-red-300 underline"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-zinc-700 rounded-lg">
          {names.length === 0 && (
            <p className="text-zinc-500 italic text-sm">No names added yet.</p>
          )}
          {names.map((name, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-zinc-700 rounded-full text-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={pickRandom}
        disabled={names.length === 0 || isPicking}
        className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
          names.length === 0
            ? "bg-zinc-700 text-zinc-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-500 text-white"
        }`}
      >
        {isPicking ? "Picking..." : "Pick a Name!"}
      </button>

      {/* Result Display */}
      {winner && !isPicking && (
        <div className="mt-6 p-4 bg-zinc-700 border-2 border-green-500 rounded-xl text-center animate-bounce">
          <p className="text-zinc-400 text-sm uppercase tracking-widest">
            The Name Is:
          </p>
          <p className="text-3xl font-black text-white">{winner}</p>
        </div>
      )}
    </div>
  );
};

export default NamePicker;
