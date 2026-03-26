import React, { useState, type ChangeEvent, type FormEvent } from "react";

interface CalculationResult {
  interest: string;
  total: string;
}

const InterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
      const interestAmount = p * r * t;
      const totalAmount = p + interestAmount;

      setResult({
        interest: interestAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        }),
        total: totalAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        }),
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-900 rounded-xl shadow-lg border border-gray-100 font-sans">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Interest Calculator
      </h2>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            Principal Amount (Rs)
          </label>
          <input
            type="number"
            step="any"
            value={principal}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPrincipal(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-400"
            placeholder="Enter the principal"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-500 mb-1">
            ANNUAL INTEREST RATE (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRate(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:ring-2 text-gray-400 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Enter Rate"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-500 mb-1">
            TIME (Yrs)
          </label>
          <input
            type="number"
            step="any"
            value={time}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTime(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:ring-2 text-gray-400 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Enter Time"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors duration-200 mt-2"
        >
          Calculate Total
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between mb-2">
            <span className="text-blue-700">Interest Earned:</span>
            <span className="font-bold text-blue-900">${result.interest}</span>
          </div>
          <div className="flex justify-between border-t border-blue-200 pt-2">
            <span className="text-blue-700 font-medium">Total Balance:</span>
            <span className="font-bold text-blue-900 text-lg">
              ${result.total}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestCalculator;
