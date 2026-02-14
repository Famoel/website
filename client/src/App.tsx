import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import { RootLayout } from "./layouts/RootLayout";
import { IndexPage } from "./pages/IndexPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CLIENT_ROUTES } from "./routes/client-routes";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<IndexPage />} />

          <Route
            path={CLIENT_ROUTES.ROOT.REGISTER}
            element={<RegisterPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
