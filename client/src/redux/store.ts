import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },

  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
