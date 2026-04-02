import { createSlice } from "@reduxjs/toolkit";
import type { IUserCharacterList } from "../../interface/user-profile/IUserCharacterList";

const initialState = {
  userCharacterList: [] as IUserCharacterList[],
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,

  reducers: {
    setUserCharacterList: (
      state,
      { payload }: { payload: IUserCharacterList[] },
    ) => {
      state.userCharacterList = payload;
    },
  },
});

export const { setUserCharacterList } = userProfileSlice.actions;
export default userProfileSlice.reducer;
