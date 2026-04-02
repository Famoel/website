import { useEffect, useState, type SubmitEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE_FLAG } from "../../../flags/message-flag";
import { useRaid } from "../../../hooks/fetch/planer/useRaid";
import { useMessage } from "../../../hooks/useMessage";
import type { IRaidplanForm } from "../../../interface/planer/raid/IRaidplanForm";
import { setRaidPlan } from "../../../redux/slice/raidSlice";
import type { TRootState } from "../../../redux/store";
import { Message } from "../../common/Message";

const initialForm: IRaidplanForm = {
  raidListId: 0,
  startDate: "",
  startTime: "",
  createdFrom: "",
};

export const CreateRaidplanForm = () => {
  const [form, setForm] = useState<IRaidplanForm>(initialForm);

  const reduxUser = useSelector((state: TRootState) => state.user);
  const reduxRaid = useSelector((state: TRootState) => state.raid);
  const dispatch = useDispatch();

  const { createRaidPlan, getRaidPlan } = useRaid();
  const { msg, setMsg } = useMessage();

  useEffect(() => {
    setForm((prev) => ({ ...prev, createdFrom: reduxUser.username }));
  }, [form.createdFrom, reduxUser.username]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    /* Check if form is valid */
    Object.values(form).forEach((value) => {
      if (!value) {
        isValid = false;

        setMsg({
          flag: MESSAGE_FLAG.PLANER.RAID.CREATE_RAID_PLAN,
          isErrorMsg: true,
          message: "Bitte alle Felder ausfüllen!",
        });
      }
    });

    if (!isValid) {
      console.error("Create Raid Plan: Form is not valid!");
      return;
    }

    /* Create Raid Plan */
    const resCreateRaidPlan = await createRaidPlan(form);

    if (resCreateRaidPlan.message) {
      setMsg({
        flag: MESSAGE_FLAG.PLANER.RAID.CREATE_RAID_PLAN,
        isErrorMsg: resCreateRaidPlan.isErrorMsg,
        message: resCreateRaidPlan.message,
      });
    }

    /* reset form update redux store */
    setForm(initialForm);
    dispatch(setRaidPlan(Object.values(await getRaidPlan())));
  };

  return (
    <form onSubmit={handleSubmit} className="base-bg-div flex flex-col gap-4">
      {msg && msg.flag === MESSAGE_FLAG.PLANER.RAID.CREATE_RAID_PLAN && (
        <Message isErrorMsg={msg.isErrorMsg} message={msg.message} />
      )}

      <label htmlFor="selectRaid">
        <p>Raid</p>
        <select
          onChange={(e) =>
            setForm((prev) => ({ ...prev, raidListId: Number(e.target.value) }))
          }
          id="selectRaid"
          value={form.raidListId}
        >
          <option value={0}>-- auswählen --</option>
          {reduxRaid.raidList.map((raid, idx) => {
            if (raid.isDeleted === 0) {
              return (
                <option key={idx} value={raid.id}>
                  {raid.name} | {raid.mode}
                </option>
              );
            }
          })}
        </select>
      </label>

      <label htmlFor="startDate">
        <p>Start Datum</p>
        <input
          type="date"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, startDate: e.target.value }))
          }
          value={form.startDate}
        />
      </label>

      <label htmlFor="startTime">
        <p>Start Uhrzeit</p>
        <input
          type="time"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, startTime: e.target.value }))
          }
          value={form.startTime}
        />
      </label>

      <button className="base-btn">Raidplan erstellen</button>
    </form>
  );
};
