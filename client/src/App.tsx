import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { RootLayout } from "./layouts/RootLayout";
import { IndexPage } from "./pages/IndexPage";
import { OverviewPage } from "./pages/OverviewPage";
import { RaidOverviewPage } from "./pages/planer/raid/RaidOverviewPage";
import { RaidPlanPage } from "./pages/planer/raid/RaidPlanPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";
import { CLIENT_ROUTES } from "./routes/client-routes";

export const App = () => {
  return (
    <Router>
      <Routes>
        {/* root */}
        <Route element={<RootLayout />}>
          <Route index element={<IndexPage />} />

          <Route
            path={CLIENT_ROUTES.ROOT.REGISTER}
            element={<RegisterPage />}
          />
        </Route>

        {/* protected */}
        <Route element={<ProtectedLayout />}>
          <Route
            path={CLIENT_ROUTES.PROTECTED.OVERVIEW}
            element={<OverviewPage />}
          />

          <Route
            path={CLIENT_ROUTES.PROTECTED.PROFILE}
            element={<ProfilePage />}
          />

          {/* raid */}
          <Route
            path={CLIENT_ROUTES.PROTECTED.PLANER.RAID_OVERVIEW}
            element={<RaidOverviewPage />}
          />

          <Route
            path={CLIENT_ROUTES.PROTECTED.PLANER.RAID_PLAN}
            element={<RaidPlanPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
