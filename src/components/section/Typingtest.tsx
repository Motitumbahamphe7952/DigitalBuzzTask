import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface SimpleKeyboard {
  setInput: (input: string) => void;
}

const TARGET_TEXT =
  "The quick brown fox jumps over the lazy dog near the river bank.";

const TypingTest: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [layoutName, setLayoutName] = useState<string>("default");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const keyboard = useRef<SimpleKeyboard | null>(null);

  // Calculate stats whenever input changes
  useEffect(() => {
    if (input.length > 0 && !startTime) {
      setStartTime(Date.now());
    }

    if (input.length > 0) {
      // Accuracy Calculation
      let correctChars = 0;
      for (let i = 0; i < input.length; i++) {
        if (input[i] === TARGET_TEXT[i]) correctChars++;
      }
      setAccuracy(Math.floor((correctChars / input.length) * 100));

      // WPM Calculation: (chars / 5) / (minutes)
      if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 60000; // in minutes
        const wordsTyped = input.length / 5;
        setWpm(Math.floor(wordsTyped / (timeElapsed || 0.01)));
      }
    }

    if (input === TARGET_TEXT) {
      setIsFinished(true);
    }
  }, [input, startTime]);

  const onChange = (value: string): void => {
    if (!isFinished) setInput(value);
  };

  const onKeyPress = (button: string): void => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
  };

  const handlePhysicalInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (!isFinished) {
      setInput(value);
      keyboard.current?.setInput(value);
    }
  };

  const resetTest = () => {
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    keyboard.current?.setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        {/* Header Stats */}
        <div className="flex justify-between mb-8">
          <div className="text-center px-6 py-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs font-bold text-blue-500 uppercase">WPM</p>
            <p className="text-3xl font-black text-slate-800">{wpm}</p>
          </div>
          <div className="text-center px-6 py-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-xs font-bold text-emerald-500 uppercase">
              Accuracy
            </p>
            <p className="text-3xl font-black text-slate-800">{accuracy}%</p>
          </div>
          <button
            onClick={resetTest}
            className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Target Text Display */}
        <div className="mb-6 p-6 bg-slate-100 rounded-xl text-xl leading-relaxed font-mono">
          {TARGET_TEXT.split("").map((char, i) => {
            let color = "text-slate-400";
            if (i < input.length) {
              color =
                input[i] === TARGET_TEXT[i]
                  ? "text-emerald-600"
                  : "text-red-500 underline";
            }
            return (
              <span key={i} className={color}>
                {char}
              </span>
            );
          })}
        </div>

        {/* Hidden Input for physical typing focus */}
        <input
          value={input}
          onChange={handlePhysicalInput}
          disabled={isFinished}
          className="w-full p-4 mb-8 text-lg bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all"
          placeholder={isFinished ? "Test Complete!" : "Start typing here..."}
        />

        {/* Virtual Keyboard */}
        <div className="bg-slate-100 p-2 rounded-xl shadow-inner">
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            layoutName={layoutName}
            onChange={onChange}
            onKeyPress={onKeyPress}
            theme={"hg-theme-default hg-layout-default custom-keyboard"}
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
          />
        </div>

        {isFinished && (
          <div className="mt-6 p-4 bg-emerald-500 text-white text-center rounded-xl font-bold animate-bounce">
            🎉 Nice work! You finished the test.
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTest;
