import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Login } from "../components/auth/Login";
import { CLIENT_ROUTES } from "../routes/client-routes";

export const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="base-layout">
      <Header />

      <div className="self-end">
        {location.pathname !== CLIENT_ROUTES.ROOT.REGISTER && <Login />}
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
