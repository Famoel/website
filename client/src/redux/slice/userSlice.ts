import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUsername: (state, { payload }) => {
      state.username = payload.username;
    },
  },
});

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;
