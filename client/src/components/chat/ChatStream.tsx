import type { IChatStream } from "../../interface/chat/IChatStream";

export const ChatStream = ({ children }: IChatStream) => {
  return (
    <div className="flex flex-col gap-5 overflow-auto p-5">{children}</div>
  );
};
