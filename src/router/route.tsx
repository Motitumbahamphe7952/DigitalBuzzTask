import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/home";
import { BMICalculator } from "@/components/section/BmiCalculator";
import { PasswordGenerator } from "@/components/section/PasswordGenerator";
import AgeCalculator from "@/components/section/AgeCalculator";
import InterestCalculator from "@/components/section/SiCalculator";
import EMICalculator from "@/components/section/EmiCalculator";
import NamePicker from "@/components/section/RandomNamePicker";
import WordCounter from "@/components/section/WordCounter";
import WaterCalculator from "@/components/section/waterIntakeCalculator";
import TypingTest from "@/components/section/Typingtest";

const navLinks = [
  { path: "/", label: "Random Password Generator" },
  { path: "/bmi", label: "BMI Calculator" },
  { path: "/age", label: "Age Calculator" },
  { path: "/emi", label: "EMI Calculator" },
  { path: "/si", label: "Simple Interest Calculator" },
  { path: "/random", label: "Random Name Picker" },
  { path: "/water", label: "Daily Water Intake Calculator" },
  { path: "/word", label: "Word counter" },
  { path: "/tags", label: "OG & Twitter Meta Tags Generator" },
  { path: "/typing", label: "Typing Speed Test" },
];
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<Home />} />
      </Route>

      <Route element={<Layout showNavbar={true} showFooter={false} />}>
        <Route path="/login" element={<Home />} />
        <Route path="/" element={<PasswordGenerator />} />
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/age" element={<AgeCalculator />} />
        <Route path="/emi" element={<EMICalculator />} />
        <Route path="/si" element={<InterestCalculator />} />
        <Route path="/random" element={<NamePicker />} />
        <Route path="/water" element={<WaterCalculator />} />
        <Route path="/word" element={<WordCounter />} />
        <Route path="/tags" element={<BMICalculator />} />
        <Route path="/typing" element={<TypingTest />} />
        <Route path="*" element={<Home />} />
      </Route>
    </>,
  ),
);
