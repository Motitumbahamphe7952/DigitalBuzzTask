import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FlexColumn from "../common/FlexColumn";

const Layout = () => {
  return (
    <FlexColumn className="min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </FlexColumn>
  );
};

export default Layout;
