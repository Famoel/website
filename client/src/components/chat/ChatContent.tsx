import type { IChatContent } from "../../interface/chat/IChatContent";

export const ChatContent = ({ author, message, created }: IChatContent) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-secondary flex justify-between rounded p-1 font-semibold text-black">
        <p className="flex items-center gap-1.5 italic">
          <span className="text-xs text-red-600">Admin</span> {author}
        </p>
        <p>{created}</p>
      </div>
      <div className="bg-accent min-h-14 rounded-2xl p-1.5 wrap-break-word whitespace-pre-wrap">
        <p>{message}</p>
      </div>
    </div>
  );
};
