import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EnterRaidplanForm } from "../../../components/planer/raid/EnterRaidplanForm";
import { RaidTable } from "../../../components/planer/raid/RaidTable";
import { useRaid } from "../../../hooks/fetch/planer/useRaid";
import { useClassList } from "../../../hooks/fetch/useClassList";
import { useUserProfile } from "../../../hooks/fetch/useUserProfile";
import { setClassList } from "../../../redux/slice/classListSlice";
import { setRaidPlan } from "../../../redux/slice/raidSlice";
import { setUserCharacterList } from "../../../redux/slice/userProfileSlice";
import type { TRootState } from "../../../redux/store";

export const RaidOverviewPage = () => {
  const reduxUser = useSelector((state: TRootState) => state.user);
  const dispatch = useDispatch();

  const { getUserCharacterList } = useUserProfile();
  const { getRaidPlan } = useRaid();
  const { getClassList } = useClassList();

  useEffect(() => {
    init(reduxUser.username);
  }, [reduxUser.username]);

  /* set data in redux store */
  const init = async (username: string) => {
    dispatch(setClassList(await getClassList()));
    dispatch(setRaidPlan(Object.values(await getRaidPlan())));
    dispatch(setUserCharacterList(await getUserCharacterList(username)));
  };

  return (
    <div className="flex gap-3">
      <div className="grow">
        <RaidTable hasBody canCancel={false} />
      </div>

      <div className="xl:w-2/12">
        <EnterRaidplanForm />
      </div>
    </div>
  );
};
