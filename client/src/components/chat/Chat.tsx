import { ChatContent } from "./ChatContent";
import { ChatForm } from "./ChatForm";
import { ChatStream } from "./ChatStream";

export const Chat = () => {
  return (
    <div className="bg-primary flex h-full flex-col justify-between gap-4 rounded p-2">
      <ChatStream>
        <ChatContent />
        <ChatContent />
        <ChatContent />
        <ChatContent />
        <ChatContent />
      </ChatStream>

      <ChatForm />
    </div>
  );
};
