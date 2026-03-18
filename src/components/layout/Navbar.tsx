import { useState } from "react";
import { Briefcase, Menu, X } from "lucide-react"; // Added Menu and X icons
import FlexRow from "../common/FlexRow";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdown = [
    { path: "/", label: "Home" },
    { path: "/jobs", label: "Jobs" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="w-full bg-white border-b-2 sticky top-0 z-100">
      {/* Main Container */}
      <FlexRow className="w-full h-auto py-2 justify-between items-center px-4 md:px-14 lg:px-30 transition-colors duration-300">
        {/* Logo Section */}
        <FlexRow className="items-center h-auto gap-2">
          <Briefcase className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
          <span className="text-lg font-bold">CareerSathi</span>
        </FlexRow>

        {/* Desktop Navigation - Hidden on Mobile/Tablet */}
        <div className="hidden lg:flex items-center gap-4 ml-12">
          {dropdown.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-4 text-lg font-medium transition-colors ${isActive ? "text-primary" : "text-gray-600 hover:text-primary"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Actions & Mobile Toggle */}
        <FlexRow className="items-center gap-0 sm:gap-4">
          <button className="text-primary font-medium hidden sm:inline cursor-pointer px-4 py-2 border-2 rounded-xs border-gray-200 hover:bg-gray-50">
            Login
          </button>
          <span className="bg-primary hover:bg-primary-dark text-white text-sm sm:text-base px-4 py-2 rounded-xs leading-tight whitespace-nowrap cursor-pointer transition-all">
            Register
          </span>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </FlexRow>
      </FlexRow>

      {/* Mobile Sidebar/Dropdown */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-64 border-b" : "max-h-0"}`}
      >
        <div className="flex flex-col p-4 space-y-2 bg-gray-50">
          {dropdown.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-white hover:text-primary rounded-md"
            >
              {item.label}
            </NavLink>
          ))}
          <button className="sm:hidden w-full text-left px-4 py-3 text-base font-medium text-primary">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
