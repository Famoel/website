import { createSlice } from "@reduxjs/toolkit";
import type { IRaidEntry } from "../../interface/planer/raid/IRaidEntry";
import type { IRaidPlan } from "../../interface/planer/raid/IRaidPlan";
import type { IRaidlist } from "../../interface/planer/raid/IRaidlist";

const initialState = {
  raidPlan: [] as IRaidPlan[],
  raidList: [] as IRaidlist[],
  raidEntry: [] as IRaidEntry[],
};

const raidSlice = createSlice({
  name: "raid",
  initialState,

  reducers: {
    setRaidList: (state, { payload }: { payload: IRaidlist[] }) => {
      state.raidList = payload;
    },

    setRaidPlan: (state, { payload }: { payload: IRaidPlan[] }) => {
      state.raidPlan = payload;
    },

    setRaidEntry: (state, { payload }: { payload: IRaidEntry[] }) => {
      state.raidEntry = payload;
    },
  },
});

export const { setRaidPlan, setRaidList, setRaidEntry } = raidSlice.actions;
export default raidSlice.reducer;
