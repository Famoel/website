import type { IBasePromise } from "../../interface/IBasePromise";
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
      success: false,
      message: "",
    };
  };

  const login = async (form: FormData) => {};

  return { register, login };
};
