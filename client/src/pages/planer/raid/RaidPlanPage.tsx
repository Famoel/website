import { CreateRaidplanForm } from "../../../components/planer/raid/CreateRaidplanForm";

export const RaidPlanPage = () => {
  return (
    <div className="flex gap-3">
      <div className="grow">
        <p>RaidPlanPage</p>
      </div>

      <div className="xl:w-3/12">
        <CreateRaidplanForm />
      </div>
    </div>
  );
};
