import { SERVER_ROUTES } from "../../routes/server-routes";
import { AXIOS_INSTANCE } from "./axios-instance";

export const useSession = () => {
  const startSession = async (
    username: string,
  ): Promise<{ username: string; token: string; isValid: boolean }> => {
    try {
      const res = await AXIOS_INSTANCE.post(
        SERVER_ROUTES.SESSION.START_SESSION,
        { username },
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Start Session: ", error);
    }

    return { username: "", token: "", isValid: false };
  };

  const checkSession = async (
    token: string | null,
  ): Promise<{ isValid: boolean; username: string }> => {
    if (token === null) {
      return { isValid: false, username: "" };
    }

    try {
      const res = await AXIOS_INSTANCE.post(
        SERVER_ROUTES.SESSION.CHECK_SESSION,
        { token },
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Check Session: ", error);
    }

    return { isValid: false, username: "" };
  };

  return { startSession, checkSession };
};
