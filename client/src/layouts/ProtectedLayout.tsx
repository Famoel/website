import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../components/common/Footer";
import { Header } from "../components/common/Header";
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

    // set redux store
    dispatch(setUsername(resCheckSession.username));
  };

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
