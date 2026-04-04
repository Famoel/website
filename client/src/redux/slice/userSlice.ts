import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUsername: (state, { payload }: { payload: string }) => {
      state.username = payload;
    },
  },
});

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;
