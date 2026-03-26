import React, { useState } from "react";

const WaterCalculator: React.FC = () => {
  // 1. Manage only the raw input states
  const [weight, setWeight] = useState<number>(70);
  const [activity, setActivity] = useState<number>(0);

  // 2. Derive the goal directly during the render phase.
  // This avoids "useEffect" and keeps your linter happy.
  const baseIntake = weight * 0.033;
  const exerciseAddon = (activity / 30) * 0.35;
  const goal = baseIntake + exerciseAddon;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-zinc-900 rounded-xl shadow-lg space-y-6r">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-600 rounded-lg text-2xl">💧</div>
        <h1 className="text-2xl font-bold tracking-tight text-white">HydroCalc</h1>
      </div>

      <div className="space-y-6">
        {/* Weight Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2 font-mono uppercase tracking-tight">
            Body Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
            className="w-full bg-zinc-700 border border-zinc-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Activity Input */}
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

        {/* Result Display */}
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

      <div className="mt-6 p-4 bg-zinc-900/50 rounded-xl text-[10px] text-zinc-500 leading-relaxed border border-zinc-700/30">
        * Calculation based on ~33ml per kg plus ~350ml per 30 mins of exercise.
        Consult a professional for specific medical needs.
      </div>
    </div>
  );
};

export default WaterCalculator;
