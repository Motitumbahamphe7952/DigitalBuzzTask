import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface StatBoxProps {
  label: string;
  value: string | number;
  sub: string;
  color: string;
}

interface KeyboardInstance {
  setInput: (input: string) => void;
  clearInput: () => void;
  getInput: () => string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleKeyboard =(Keyboard as unknown as { default?: any }).default || Keyboard;

const TARGET_TEXT =
  "The quick brown fox jumps over the lazy dog near the river bank.";

const TypingTest: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [layoutName, setLayoutName] = useState<string>("default");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(() => Date.now());
  const [completionTime, setCompletionTime] = useState<number | null>(null);

  const keyboard = useRef<KeyboardInstance | null>(null);

  const isFinished = input === TARGET_TEXT;

  if (isFinished && !completionTime) {
    setCompletionTime(() => Date.now());
  }

  useEffect(() => {
    if (!isFinished && startTime && input.length > 0) {
      const interval = setInterval(() => setCurrentTime(Date.now()), 100);
      return () => clearInterval(interval);
    }
  }, [isFinished, startTime, input.length]);

  const accuracy = useMemo(() => {
    if (input.length === 0) return 100;
    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === TARGET_TEXT[i]) correctChars++;
    }
    return Math.floor((correctChars / input.length) * 100);
  }, [input]);

  const wpm = useMemo(() => {
    if (!startTime || input.length === 0) return 0;
    const end = completionTime || currentTime;
    const timeElapsed = (end - startTime) / 60000;
    return Math.floor(input.length / 5 / (timeElapsed || 0.0001));
  }, [input, startTime, completionTime, currentTime]);

  const onChange = (newValue: string) => {
    if (isFinished) return;
    if (!startTime && newValue.length > 0) setStartTime(Date.now());
    setInput(newValue);
  };

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName((prev) => (prev === "default" ? "shift" : "default"));
    }
  };

  const handlePhysicalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (!startTime && val.length > 0) setStartTime(Date.now());

    if (keyboard.current) {
      keyboard.current.setInput(val);
    }
  };

  const resetTest = () => {
    setInput("");
    setStartTime(null);
    setCompletionTime(null);
    setCurrentTime(Date.now());
    if (keyboard.current) keyboard.current.clearInput();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-800 text-white space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <StatBox
          label="WPM"
          value={wpm}
          sub="words/min"
          color="text-blue-400"
        />
        <StatBox
          label="Accuracy"
          value={`${accuracy}%`}
          sub="correct"
          color="text-emerald-400"
        />
        <StatBox
          label="Progress"
          value={`${Math.floor((input.length / TARGET_TEXT.length) * 100)}%`}
          sub="done"
          color="text-zinc-400"
        />
      </div>

      <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 font-mono text-xl leading-relaxed shadow-inner overflow-hidden">
        <div className="flex flex-wrap gap-x-0.5">
          {TARGET_TEXT.split("").map((char, i) => {
            let style = "text-zinc-700";
            if (i < input.length) {
              style =
                input[i] === TARGET_TEXT[i]
                  ? "text-white"
                  : "text-red-500 bg-red-500/10";
            } else if (i === input.length && !isFinished) {
              style = "text-blue-400 border-b-2 border-blue-400 animate-pulse";
            }
            return (
              <span key={i} className={style}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      <input
        value={input}
        onChange={handlePhysicalInput}
        placeholder={isFinished ? "Test finished!" : "Start typing..."}
        disabled={isFinished}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-6 py-4 text-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all font-mono"
      />

      <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 custom-keyboard">
        <SimpleKeyboard
          keyboardRef={(r: KeyboardInstance) => (keyboard.current = r)}
          layoutName={layoutName}
          onChange={onChange}
          onKeyPress={onKeyPress}
          layout={{
            default: [
              "q w e r t y u i o p",
              "a s d f g h j k l",
              "{shift} z x c v b n m {backspace}",
              "{space}",
            ],
            shift: [
              "Q W E R T Y U I O P",
              "A S D F G H J K L",
              "{shift} Z X C V B N M {backspace}",
              "{space}",
            ],
          }}
          display={{ "{backspace}": "⌫", "{shift}": "⇧", "{space}": "Space" }}
        />
      </div>

      <div className="text-center pt-4">
        <button
          onClick={resetTest}
          className="text-zinc-500 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors"
        >
          Reset Typing Test
        </button>
      </div>

      <style>{`
        .simple-keyboard { background: transparent !important; }
        .hg-button { 
          background: #27272a !important; 
          color: white !important; 
          border-bottom: 3px solid #18181b !important; 
          border-radius: 8px !important;
        }
        .hg-button:active { transform: translateY(2px); border-bottom: none !important; }
        .hg-theme-default { font-family: inherit !important; }
      `}</style>
    </div>
  );
};

const StatBox: React.FC<StatBoxProps> = ({ label, value, sub, color }) => (
  <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-800 text-center">
    <p className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.2em] mb-1">
      {label}
    </p>
    <p className={`text-4xl font-black ${color}`}>{value}</p>
    <p className="text-[10px] text-zinc-600 italic">{sub}</p>
  </div>
);

export default TypingTest;
