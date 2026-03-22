import { SERVER_ROUTES } from "../../../routes/server-routes";
import { AXIOS_INSTANCE } from "../axios-instance";

export const useRaid = () => {
  const getRaidList = async () => {
    try {
      const res = await AXIOS_INSTANCE.get(
        SERVER_ROUTES.PLANER.RAID.GET_RAID_LIST,
      );

      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Get Raid List: ", error);
    }
  };

  return { getRaidList };
};
