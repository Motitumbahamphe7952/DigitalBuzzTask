import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FlexRow } from "../common";
import type { classProp } from "@/types/interface";

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

const NavBar = ({ className }: classProp) => {
  const location = useLocation();

  return (
    <nav
      className={`w-full py-4 flex justify-center items-center z-50 relative px-8 ${className}`}
    >
      <FlexRow className="relative items-center justify-center gap-2 text-gray-800 text-xs font-medium rounded-full border-2 p-1 bg-white/50 backdrop-blur-md">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={`relative px-6 py-2 transition-colors duration-300 ${
                isActive ? "text-white" : "hover:text-black"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-black rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </NavLink>
          );
        })}
      </FlexRow>
    </nav>
  );
};

export default NavBar;
