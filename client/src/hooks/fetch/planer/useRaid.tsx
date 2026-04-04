import type { IMessage } from "../../../interface/IMessage";
import type { IRaidEntry } from "../../../interface/planer/raid/IRaidEntry";
import type { IRaidlist } from "../../../interface/planer/raid/IRaidlist";
import type { IRaidPlan } from "../../../interface/planer/raid/IRaidPlan";
import type { IRaidplanForm } from "../../../interface/planer/raid/IRaidplanForm";
import { SERVER_ROUTES } from "../../../routes/server-routes";
import { AXIOS_INSTANCE } from "../axios-instance";

export const useRaid = () => {
  const getRaidList = async (): Promise<IRaidlist[]> => {
    try {
      const res = await AXIOS_INSTANCE.get(
        SERVER_ROUTES.PLANER.RAID.GET_RAID_LIST,
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Get Raid List: ", error);
    }

    return [];
  };

  const getRaidPlan = async (): Promise<IRaidPlan[]> => {
    try {
      const res = await AXIOS_INSTANCE.get(
        SERVER_ROUTES.PLANER.RAID.GET_RAID_PLAN,
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Get Raid Plan: ", error);
    }

    return [];
  };

  const getRaidEntry = async (): Promise<IRaidEntry[]> => {
    try {
      const res = await AXIOS_INSTANCE.get(
        SERVER_ROUTES.PLANER.RAID.GET_RAID_ENTRYS,
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Get Raid Entry: ", error);
    }

    return [];
  };

  const createRaidPlan = async (
    form: IRaidplanForm,
  ): Promise<IMessage & { isValid: boolean }> => {
    try {
      const res = await AXIOS_INSTANCE.post(
        SERVER_ROUTES.PLANER.RAID.CREATE_RAID_PLAN,
        form,
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Create Raid Plan: ", error);
    }

    return { isErrorMsg: true, message: "", isValid: false };
  };

  const enterRaid = async (form: IRaidEntry): Promise<IMessage> => {
    try {
      const res = await AXIOS_INSTANCE.post(
        SERVER_ROUTES.PLANER.RAID.ENTER_RAID,
        form,
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Enter Raid: ", error);
    }

    return { isErrorMsg: true, message: "" };
  };

  return { getRaidList, getRaidPlan, getRaidEntry, createRaidPlan, enterRaid };
};
