import { SERVER_ROUTES } from "../../routes/server-routes";
import { AXIOS_INSTANCE } from "./axios-instance";

export const useChat = () => {
  const send = async (form: FormData) => {
    try {
      const res = await AXIOS_INSTANCE.post(SERVER_ROUTES.CHAT.SEND, form);
      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Send Message to Chat: ", error);
    }
  };

  const getData = async () => {
    try {
      const res = await AXIOS_INSTANCE.get(SERVER_ROUTES.CHAT.DATA);
      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Get Chat data: ", error);
    }
  };

  return { send, getData };
};
