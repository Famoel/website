import { createSlice } from "@reduxjs/toolkit";
import type { IUserCharacterList } from "../../interface/user-profile/IUserCharacterList";

const initialState = {
  userCharacterList: [] as IUserCharacterList[],
};

const userProfileSlice = createSlice({
  name: "user-profile",
  initialState,

  reducers: {
    updateUserCharacterList: (
      state,
      { payload }: { payload: IUserCharacterList[] },
    ) => {
      state.userCharacterList = payload;
    },
  },
});

export const { updateUserCharacterList } = userProfileSlice.actions;
export default userProfileSlice.reducer;
