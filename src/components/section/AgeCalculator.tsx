import React, { useState } from "react";

interface Age {
  years: number;
  months: number;
  days: number;
}

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>("");
  const [age, setAge] = useState<Age>({ years: 0, months: 0, days: 0 });
  const [error, setError] = useState<string>("");

  const calculateAge = (birthDateString: string): void => {
    if (!birthDateString) {
      setError("");
      setAge({ years: 0, months: 0, days: 0 });
      return;
    }

    const birth = new Date(birthDateString);
    const today = new Date();

    if (isNaN(birth.getTime())) {
      setError("Invalid date");
      setAge({ years: 0, months: 0, days: 0 });
      return;
    }

    if (birth > today) {
      setError("Birthdate cannot be in the future");
      setAge({ years: 0, months: 0, days: 0 });
      return;
    }

    setError("");

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newBirthDate = e.target.value;
    setBirthDate(newBirthDate);
    calculateAge(newBirthDate);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-zinc-900 rounded-xl shadow-lg space-y-6 font-sans">
      <h2 className="text-2xl font-bold text-white text-center">
        Age Calculator
      </h2>

      <div className="flex flex-col space-y-2">
        <label htmlFor="birthdate" className="text-zinc-500 font-medium font-sans">
          ENTER YOUR BIRTHDATE:
        </label>
        <input
          type="date"
          id="birthdate"
          value={birthDate}
          onChange={handleDateChange}
          className="p-3 rounded-lg border border-zinc-800 bg-zinc-800 text-zinc-500 focus:ring-2 focus:ring-blue-500 outline transition"
        />
      </div>

      {error && <p className="text-red-500 font-medium text-center">{error}</p>}

      {!error && birthDate && (
        <div className="p-4 bg-zinc-800 rounded-lg text-center text-white space-y-2">
          <p className="text-lg">
            <span className="font-semibold">Your age:</span>
          </p>
          <p className="text-xl font-bold text-blue-400">
            {age.years} years, {age.months} months, {age.days} days
          </p>
        </div>
      )}

      {!birthDate && !error && (
        <p className="text-zinc-400 text-center">Please select a birthdate.</p>
      )}
    </div>
  );
};

export default AgeCalculator;
