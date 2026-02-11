import { useEffect, useState } from "react";
import type { IMessage } from "../interface/IMessage";

const initialMessage: IMessage = {
  message: "",
  success: false,
  flag: "",
};

export const useMessage = () => {
  const [msg, setMsg] = useState<IMessage>(initialMessage);

  useEffect(() => {
    const timeout = setTimeout(() => setMsg(initialMessage), 10000);
    
    return () => clearTimeout(timeout);
  }, [msg]);

  return { msg, setMsg };
};
