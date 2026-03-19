import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useChat } from "../../hooks/fetch/useChat";
import type { IChatContent } from "../../interface/chat/IChatContent";
import { ChatContent } from "./ChatContent";

const initialChat: IChatContent[] = [
  {
    message: "",
    author: "",
    created: "",
  },
];

export const ChatStream = () => {
  const [data, setData] = useState<IChatContent[]>(initialChat);
  const ref = useRef<HTMLDivElement>(null);

  const { getData } = useChat();

  /* first render */
  useEffect(() => {
    update();
  }, []);

  /* update */
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await update();
    }, 700);

    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });

    return () => clearInterval(intervalId);
  }, [data]);

  const update = async () => {
    const resData: IChatContent[] = await getData();

    if (resData && !isEqual(resData, data)) setData(resData);
  };

  return (
    <div className="flex h-[65vh] flex-col gap-5 overflow-auto p-5">
      {data.map((chat, idx) => {
        /* date format */
        const createDate = new Date(chat.created);
        const formattedDate = createDate.toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <ChatContent
            key={idx}
            author={chat.author}
            message={chat.message}
            created={formattedDate.replace(",", " | ")}
          />
        );
      })}

      <div ref={ref}></div>
    </div>
  );
};
