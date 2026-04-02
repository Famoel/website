import { ChatForm } from "./ChatForm";
import { ChatStream } from "./ChatStream";

export const Chat = () => {
  return (
    <div className="bg-primary flex flex-col justify-between gap-4 rounded p-2">
      <ChatStream />

      <ChatForm />
    </div>
  );
};
