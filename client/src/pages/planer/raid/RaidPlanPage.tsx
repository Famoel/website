import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateRaidplanForm } from "../../../components/planer/raid/CreateRaidplanForm";
import { RaidTable } from "../../../components/planer/raid/RaidTable";
import { useRaid } from "../../../hooks/fetch/planer/useRaid";
import { setRaidList, setRaidPlan } from "../../../redux/slice/raidSlice";
import type { TRootState } from "../../../redux/store";

export const RaidPlanPage = () => {
  const reduxUser = useSelector((state: TRootState) => state.user);
  const dispatch = useDispatch();

  const { getRaidList, getRaidPlan } = useRaid();

  useEffect(() => {
    init();
  }, []);

  /* set data in redux store */
  const init = async () => {
    dispatch(setRaidPlan(Object.values(await getRaidPlan())));
    dispatch(setRaidList(Object.values(await getRaidList())));
  };

  return (
    <div className="flex gap-3">
      <div className="grow">
        <RaidTable hasBody={false} canCancel />
      </div>

      <div className="xl:w-2/12">
        <CreateRaidplanForm />
      </div>
    </div>
  );
};
