import { configureStore } from "@reduxjs/toolkit";
import userProfileSlice from "./slice/userProfileSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    userProfile: userProfileSlice,
  },

  devTools: true,
});

export type TRootState = ReturnType<typeof store.getState>;
