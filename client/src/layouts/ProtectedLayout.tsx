import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../components/common/Footer";
import { Header } from "../components/common/Header";
import { Sidebar } from "../components/nav/Sidebar";
import { SESSION_FLAG } from "../flags/session-flags";
import { useSession } from "../hooks/fetch/useSession";
import { setUsername } from "../redux/slice/userSlice";
import { CLIENT_ROUTES } from "../routes/client-routes";

export const ProtectedLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { checkSession } = useSession();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // check session storage
    if (
      sessionStorage.getItem(SESSION_FLAG.SESSION_TOKEN) === null ||
      sessionStorage.getItem(SESSION_FLAG.SESSION_USERNAME) === null
    ) {
      console.error("Session Storage: is not valid!");

      sessionStorage.clear();
      navigate(CLIENT_ROUTES.ROOT.INDEX);
      return;
    }

    // check session
    const resCheckSession = await checkSession(
      sessionStorage.getItem(SESSION_FLAG.SESSION_TOKEN),
    );

    if (!resCheckSession.isValid || resCheckSession.username === "") {
      console.error("Check Session: is not valid!");

      sessionStorage.clear();
      navigate(CLIENT_ROUTES.ROOT.INDEX);
      return;
    }

    // set session storage
    sessionStorage.setItem(
      SESSION_FLAG.SESSION_USERNAME,
      resCheckSession.username,
    );

    // set username on redux store
    dispatch(setUsername(resCheckSession.username));
  };

  return (
    <div className="base-layout">
      <Header />

      <main className="flex gap-2.5">
        {/* sidebar */}
        <div className="xl:w-[13%]">
          <Sidebar />
        </div>

        {/* content */}
        <div className="grow">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
