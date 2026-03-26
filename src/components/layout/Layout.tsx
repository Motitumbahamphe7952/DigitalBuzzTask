import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "@/index.css";
import type { layoutprops } from "@/types/interface";

const Layout = ({ showNavbar = true, showFooter = true }: layoutprops) => {
  return (
    <div className="container">
      {showNavbar && <Navbar />}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
