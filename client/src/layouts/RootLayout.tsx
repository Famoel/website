import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/common/Footer";
import { Header } from "../components/common/Header";
import { CLIENT_ROUTES } from "../routes/client-routes";
import { Login } from "../components/auth/Login";

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
