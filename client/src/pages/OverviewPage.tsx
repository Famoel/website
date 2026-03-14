import { Link } from "react-router-dom";
import { Chat } from "../components/chat/Chat";
import { CLIENT_ROUTES } from "../routes/client-routes";

export const OverviewPage = () => {
  return (
    <div className="flex h-full flex-wrap justify-between gap-3">
      {/* sidebar */}
      <div className="bg-primary flex flex-col gap-3 p-2 xl:w-[10%]">
        <div className="flex flex-col gap-2">
          <Link
            to={CLIENT_ROUTES.ROOT.INDEX}
            className="bg-call-to-action hover:bg-call-to-action-hover rounded-2xl p-2 font-bold text-black uppercase no-underline!"
          >
            Home
          </Link>

          <Link
            to={CLIENT_ROUTES.ROOT.INDEX}
            className="bg-call-to-action hover:bg-call-to-action-hover rounded-2xl p-2 font-bold text-black uppercase no-underline!"
          >
            Home
          </Link>

          <Link
            to={CLIENT_ROUTES.ROOT.INDEX}
            className="bg-call-to-action hover:bg-call-to-action-hover rounded-2xl p-2 font-bold text-black uppercase no-underline!"
          >
            Home
          </Link>
        </div>
      </div>

      {/* content */}
      <div className="bg-primary max-h-[80vh] grow overflow-auto p-2"></div>

      {/* chat */}
      <div className="xl:w-[20%]">
        <div className="h-[80vh]">
          <Chat />
        </div>
      </div>
    </div>
  );
};
