import { useState } from "react";

export const PasswordGenerator = () => {
  const [length, setLength] = useState<number>(16);
  const [password, setPassword] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    let newPassword = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }

    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!password) return;

    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-zinc-900 rounded-xl shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-white">Password Generator</h2>

      {/* Length Slider */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Length: {length}</label>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-3 text-zinc-300 cursor-pointer">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">Include Numbers</span>
        </label>

        <label className="flex items-center gap-3 text-zinc-300 cursor-pointer">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">Include Symbols</span>
        </label>
      </div>

      {/* Output & Copy */}
      <div className="flex gap-2">
        <input
          type="text"
          readOnly
          value={password}
          placeholder="Click generate..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-zinc-400 font-sans"
        />

        <button
          onClick={copyToClipboard}
          disabled={!password}
          className="px-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white text-sm rounded transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePassword}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all active:scale-[0.98]"
      >
        Generate Password
      </button>
    </div>
  );
};
