import type { IBasePromise } from "../../interface/promise/IBasePromise";
import { SERVER_ROUTES } from "../../routes/server-routes";
import { AXIOS_INSTANCE } from "./axios-instance";

export const useAuth = () => {
  const register = async (form: FormData): Promise<IBasePromise> => {
    try {
      const res = await AXIOS_INSTANCE.post(
        SERVER_ROUTES.AUTH.REGISTER_USER,
        form,
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Register User: ", error);
    }

    return {
      isErrorMsg: true,
      message: "",
      isValid: false,
    };
  };

  const login = async (
    form: FormData,
  ): Promise<IBasePromise & { username: string }> => {
    try {
      const res = await AXIOS_INSTANCE.post(
        SERVER_ROUTES.AUTH.LOGIN_USER,
        form,
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Login User: ", error);
    }

    return {
      isErrorMsg: true,
      message: "",
      isValid: false,
      username: "",
    };
  };

  return { register, login };
};
