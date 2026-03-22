import { useEffect, useState, type SubmitEvent } from "react";
import { useRaid } from "../../../hooks/fetch/planer/useRaid";
import type { IRaidlist } from "../../../interface/planer/raid/IRaidlist";

export const CreateRaidplanForm = () => {
  const [raidList, setRaidList] = useState<IRaidlist[]>([] as IRaidlist[]);

  const { getRaidList } = useRaid();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setRaidList(await getRaidList());
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="base-bg-div flex flex-col gap-4">
      <label htmlFor="selectRaid">
        <p>Raid</p>
        <select id="selectRaid">
          <option value={0}>-- auswählen --</option>
          {raidList.map((raid) => (
            <option key={raid.id} value={raid.id}>
              {raid.name} | {raid.mode}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="startDate">
        <p>Start Datum</p>
        <input type="date" />
      </label>

      <label htmlFor="startTime">
        <p>Start Uhrzeit</p>
        <input type="time" />
      </label>

      <button className="base-btn">Raid planen</button>
    </form>
  );
};
