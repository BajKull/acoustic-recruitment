import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const MainLayout = () => {
  return (
    <ErrorBoundary>
      <main>
        <Navbar />
        <Outlet />
      </main>
    </ErrorBoundary>
  );
};

export default MainLayout;
