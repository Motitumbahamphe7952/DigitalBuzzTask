import { useState } from "react";

export const BMICalculator = () => {
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("170");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum) return;

    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiValue.toFixed(1)));
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal weight";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-zinc-900 rounded-xl shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-white text-center">
        BMI Calculator
      </h2>

      {/* Weight Input */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-zinc-400">Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="p-2 rounded bg-black border border-zinc-700 text-white outline-none"
          placeholder="Enter weight"
        />
      </div>

      {/* Height Input */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-zinc-400">Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="p-2 rounded bg-black border border-zinc-700 text-white outline-none"
          placeholder="Enter height"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateBMI}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all active:scale-[0.98]"
      >
        Calculate BMI
      </button>

      {/* Result */}
      {bmi !== null && (
        <div className="p-4 bg-zinc-800 rounded text-center text-white space-y-2">
          <p className="text-lg font-semibold">Your BMI: {bmi}</p>
          <p className="text-sm">
            Category: <span className="font-medium">{getBMICategory(bmi)}</span>
          </p>
        </div>
      )}
    </div>
  );
};
