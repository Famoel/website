import { Chat } from "../components/chat/Chat";
import { Sidebar } from "../components/nav/Sidebar";

export const OverviewPage = () => {
  return (
    <div className="flex h-full flex-wrap justify-between gap-3">
      {/* sidebar */}
      <div className="xl:w-[12.5%]">
        <Sidebar />
      </div>

      {/* content */}
      <div className="max-h-[80vh] grow overflow-auto p-2">
        <p>Content</p>
      </div>

      {/* chat */}
      <div className="h-[80vh] w-full xl:w-[20%]">
        <Chat />
      </div>
    </div>
  );
};
