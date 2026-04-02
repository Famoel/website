import { createSlice } from "@reduxjs/toolkit";
import type { IRaidPlan } from "../../interface/planer/raid/IRaidPlan";
import type { IRaidlist } from "../../interface/planer/raid/IRaidlist";

const raidSlice = createSlice({
  name: "raid",
  initialState: {
    raidPlan: [] as IRaidPlan[],
    raidList: [] as IRaidlist[],
  },
  reducers: {
    setRaidPlan: (state, { payload }) => {
      state.raidPlan = payload;
    },

    setRaidList: (state, { payload }) => {
      state.raidList = payload;
    },
  },
});

export const { setRaidPlan, setRaidList } = raidSlice.actions;
export default raidSlice.reducer;
