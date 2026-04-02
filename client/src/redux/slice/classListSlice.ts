import { createSlice } from "@reduxjs/toolkit";
import type { IClassList } from "../../interface/class/IClassList";

const initialState = {
  classList: [] as IClassList[],
};

const classListSlice = createSlice({
  name: "classList",
  initialState,

  reducers: {
    setClassList: (state, { payload }) => {
      state.classList = payload;
    },
  },
});

export const { setClassList } = classListSlice.actions;
export default classListSlice.reducer;
