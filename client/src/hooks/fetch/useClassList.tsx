import type { IClassList } from "../../interface/class/IClassList";
import { SERVER_ROUTES } from "../../routes/server-routes";
import { AXIOS_INSTANCE } from "./axios-instance";

export const useClassList = () => {
  const getClassList = async (): Promise<IClassList[]> => {
    try {
      const res = await AXIOS_INSTANCE.get(
        SERVER_ROUTES.CLASS_LIST.GET_CLASS_LIST,
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Get Class List: ", error);
    }

    return [] as IClassList[];
  };

  return { getClassList };
};
