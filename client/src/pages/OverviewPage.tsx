import { Chat } from "../components/chat/Chat";

export const OverviewPage = () => {
  return (
    <div className="flex h-[75vh] w-full flex-wrap justify-between gap-3">
      {/* content */}
      <div className="grow overflow-auto">
        <p>content</p>
      </div>

      {/* chat */}
      <div className="sticky top-0 h-full sm:w-[60%] xl:w-[25%]">
        <Chat />
      </div>
    </div>
  );
};
