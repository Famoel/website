import { Outlet } from "react-router-dom";
import { Footer } from "../components/common/Footer";
import { Header } from "../components/common/Header";

export const ProtectedLayout = () => {
  return (
    <div className="base-layout">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
