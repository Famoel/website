import { Chat } from "../components/chat/Chat";
import { Sidebar } from "../components/nav/Sidebar";

export const OverviewPage = () => {
  return (
    <div className="flex h-[75vh] flex-wrap justify-between gap-3">
      {/* sidebar */}
      <div className="sticky top-0 xl:w-[12.5%]">
        <Sidebar />
      </div>

      {/* content */}
      <div className="grow overflow-auto">
        <p>content</p>
      </div>

      {/* chat */}
      <div className="sticky top-0 h-[75vh] sm:w-[60%] xl:w-[20%]">
        <Chat />
      </div>
    </div>
  );
};
