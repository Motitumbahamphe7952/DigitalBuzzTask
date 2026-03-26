import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<Home />} />
      </Route>

      <Route element={<Layout showNavbar={true} showFooter={false} />}>
        <Route path="/login" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Route>
    </>,
  ),
);
