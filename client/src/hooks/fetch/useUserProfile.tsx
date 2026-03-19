import type { IMessage } from "../../interface/IMessage";
import type { IUserCharacterList } from "../../interface/user-profile/IUserCharacterList";
import { SERVER_ROUTES } from "../../routes/server-routes";
import { AXIOS_INSTANCE } from "./axios-instance";

export const useUserProfile = () => {
  const getUserCharacterList = async (
    username: string,
  ): Promise<IUserCharacterList[]> => {
    try {
      const res = await AXIOS_INSTANCE.get(
        SERVER_ROUTES.USER_CHARACTER.USER_CHARACTER_LIST,
        { params: { username } },
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("User Profile, get Character List: ", error);
    }

    return [];
  };

  const createUserCharacter = async (
    username: string,
    classListId: Number,
    charaktername: string,
    characterTyp: string,
  ): Promise<IMessage & { isValid: boolean }> => {
    try {
      const res = await AXIOS_INSTANCE.post(
        SERVER_ROUTES.USER_CHARACTER.CREATE_CHARACTER,
        { username, classListId, charaktername, characterTyp },
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("User Profile, create Character: ", error);
    }

    return { isErrorMsg: true, message: "", isValid: false };
  };

  return {
    createUserCharacter,
    getUserCharacterList,
  };
};
