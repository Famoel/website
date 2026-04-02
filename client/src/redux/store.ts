import { configureStore } from "@reduxjs/toolkit";
import classListSlice from "./slice/classListSlice";
import raidSlice from "./slice/raidSlice";
import userProfileSlice from "./slice/userProfileSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    class: classListSlice,
    userProfile: userProfileSlice,
    raid: raidSlice,
  },

  devTools: true,
});

export type TRootState = ReturnType<typeof store.getState>;
