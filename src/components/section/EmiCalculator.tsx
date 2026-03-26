import React, { useState, type ChangeEvent } from "react";

const EMICalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interest, setInterest] = useState<number>(7);
  const [tenure, setTenure] = useState<number>(12);

  // --- CALCULATION LOGIC (Derived State) ---
  // This runs on every render, which is very cheap for simple math.
  const calculateEmi = (): string => {
    if (tenure <= 0) return "0";

    const monthlyRate = interest / 12 / 100;
    if (monthlyRate === 0) return (principal / tenure).toFixed(2);

    const emiCalc =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);

    return emiCalc.toFixed(2);
  };

  // Assign the result to a variable
  const emi = calculateEmi();
  const totalPayable = parseFloat(emi) * tenure;
  const totalInterest = totalPayable - principal;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (val: number) => void,
  ) => {
    const value = parseFloat(e.target.value);
    setter(isNaN(value) ? 0 : value);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-lg border border-slate-100 mt-10">
      <h2 className="text-2xl font-bold text-white mb-6">EMI Calculator</h2>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-white">
            Principal (Rs)
          </label>
          <input
            type="number"
            value={principal || ""}
            onChange={(e) => handleInputChange(e, setPrincipal)}
            className="w-full p-2.5 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-white">
            Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={interest || ""}
            onChange={(e) => handleInputChange(e, setInterest)}
            className="w-full p-2.5 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-white">
            Tenure (Months)
          </label>
          <input
            type="number"
            value={tenure || ""}
            onChange={(e) => handleInputChange(e, setTenure)}
            className="w-full p-2.5 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-8 p-5 bg-indigo-600 rounded-xl text-center">
        <p className="text-xs text-indigo-100 font-bold uppercase mb-1">
          Monthly EMI
        </p>
        <p className="text-4xl font-black text-white">
          ₹{Number(emi).toLocaleString()}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-slate-50 rounded-lg text-center">
          <p className="text-[10px] uppercase text-slate-400 font-bold">
            Total Interest
          </p>
          <p className="font-bold text-slate-700">
            ₹{Math.max(0, totalInterest).toLocaleString()}
          </p>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg text-center">
          <p className="text-[10px] uppercase text-slate-400 font-bold">
            Total Payable
          </p>
          <p className="font-bold text-slate-700">
            ₹{Math.max(0, totalPayable).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
