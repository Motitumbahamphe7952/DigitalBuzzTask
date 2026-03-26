import React, { useState } from "react";

const WaterCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | "">(70);
  const [activity, setActivity] = useState<number>(0);

  const numericWeight = weight === "" ? 0 : weight;
  const goal = numericWeight * 0.033 + (activity / 30) * 0.35;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-zinc-900 rounded-xl shadow-lg space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          HydroCalc
        </h1>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2 font-mono uppercase tracking-tight">
            Body Weight (kg)
          </label>
          <input
            type="number"
            value={weight === 0 ? "" : weight}
            onChange={(e) => {
              const val = e.target.value;
              setWeight(val === "" ? "" : Math.max(0, Number(val)));
            }}
            placeholder="Enter your weight"
            className="w-full bg-zinc-800 text-gray-400 border border-zinc-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder-zinc-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2 font-mono uppercase tracking-tight">
            Daily Exercise (minutes)
          </label>
          <input
            type="range"
            min="0"
            max="180"
            step="15"
            value={activity}
            onChange={(e) => setActivity(Number(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="text-right text-xs mt-2 text-zinc-500 font-mono">
            {activity} mins
          </div>
        </div>

        <hr className="border-zinc-700" />

        <div className="text-center py-4">
          <p className="text-zinc-400 text-sm uppercase tracking-widest mb-1">
            Your Daily Goal
          </p>
          <div className="text-6xl font-black text-blue-400 mb-2 drop-shadow-md">
            {goal.toFixed(1)} <span className="text-xl">L</span>
          </div>
          <p className="text-zinc-500 text-sm italic">
            Approximately **{Math.round(goal / 0.25)} glasses** (250ml each)
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaterCalculator;
