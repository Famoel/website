import { useEffect, useState, type SubmitEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE_FLAG } from "../../../flags/message-flag";
import { useRaid } from "../../../hooks/fetch/planer/useRaid";
import { useMessage } from "../../../hooks/useMessage";
import type { IClassList } from "../../../interface/class/IClassList";
import type { IRaidEntry } from "../../../interface/planer/raid/IRaidEntry";
import { setRaidEntry } from "../../../redux/slice/raidSlice";
import type { TRootState } from "../../../redux/store";
import { Message } from "../../common/Message";

const initialForm: IRaidEntry = {
  raidPlanId: 0,
  user: "",
  characterName: "",
  characterRole: "",
  classListId: 0,
  isDeleted: 0,
};

export const EnterRaidplanForm = () => {
  const [form, setForm] = useState<IRaidEntry>(initialForm);
  const [classRoles, setClassRoles] = useState<string[]>([]);

  /* get data from redux store */
  const reduxUser = useSelector((state: TRootState) => state.user);
  const reduxRaid = useSelector((state: TRootState) => state.raid);
  const reduxClassList = useSelector((state: TRootState) => state.class);
  const reduxUserProfile = useSelector(
    (state: TRootState) => state.userProfile,
  );

  /* update redux store */
  const dispatch = useDispatch();

  const { msg, setMsg } = useMessage();
  const { enterRaid, getRaidEntry } = useRaid();

  useEffect(() => {
    setForm((prev) => ({ ...prev, user: reduxUser.username }));
  }, [form.user, reduxUser.username]);

  /* get available class roles from class list id and character class id */
  const getAvailableClassRoles = (
    classList: IClassList[],
    classId: number,
  ): string[] => {
    let roles: string[] = [];
    classList.forEach((classList) => {
      if (classList.id === classId) {
        if (classList.canDps) roles.push("Damage Dealer");
        if (classList.canHeal) roles.push("Heal");
        if (classList.canSupport) roles.push("Support");
        if (classList.canTank) roles.push("Tank");
      }
    });

    return roles;
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    /* check if form is valid */
    Object.entries(form).forEach(([key, value]) => {
      if (key === "isDeleted") return;

      if (!value) {
        setMsg({
          message: "Raid ID, Charakter und Rolle werden benötigt!",
          isErrorMsg: true,
          flag: MESSAGE_FLAG.PLANER.RAID.ENTER_RAID,
        });

        return (isValid = false);
      }
    });

    if (!isValid) return;

    const resEnterRaid = await enterRaid(form);

    if (resEnterRaid.message) {
      setMsg({
        message: resEnterRaid.message,
        isErrorMsg: resEnterRaid.isErrorMsg,
        flag: MESSAGE_FLAG.PLANER.RAID.ENTER_RAID,
      });
    }

    /* reset form and update raid entry in redux store */
    setForm(initialForm);
    dispatch(setRaidEntry(Object.values(await getRaidEntry())));
  };

  /* sort raidplan by id */
  const sortedRaidPlan = [...reduxRaid.raidPlan].sort((a, b) => a.id - b.id);

  return (
    <form onSubmit={handleSubmit} className="base-bg-div flex flex-col gap-4">
      {msg && msg.flag === MESSAGE_FLAG.PLANER.RAID.ENTER_RAID && (
        <Message isErrorMsg={msg.isErrorMsg} message={msg.message} />
      )}

      {/* raid ID  */}
      <label htmlFor="raidId">
        <p>Raid ID:</p>
        <select
          id="raidId"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, raidPlanId: Number(e.target.value) }))
          }
          value={form.raidPlanId}
        >
          <option value={0}>-- auswählen --</option>
          {sortedRaidPlan.map((raid, idx) => (
            <option key={idx} value={raid.id}>
              {raid.id}
            </option>
          ))}
        </select>
      </label>

      {/* character name  */}
      <label htmlFor="userCharacter">
        <p>Charakter:</p>
        <select
          id="userCharacter"
          onChange={(e) => {
            const characterName = e.target.value.split(",")[0];
            const classId = Number(e.target.value.split(",")[1]);

            setForm((prev) => ({
              ...prev,
              characterName: characterName,
              classListId: classId,
            }));

            setClassRoles(
              getAvailableClassRoles(reduxClassList.classList, classId),
            );
          }}
          value={form.characterName}
        >
          <option value={""}>-- auswählen --</option>
          {reduxUserProfile.userCharacterList.map((character, idx) => (
            <option
              key={idx}
              value={[character.characterName, String(character.classListId)]}
            >
              {character.characterName}
            </option>
          ))}
        </select>
      </label>

      {/* character role */}
      <label htmlFor="characterRole">
        <p>Rolle:</p>
        <select
          id="characterRole"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, characterRole: e.target.value }))
          }
          value={form.characterRole}
        >
          <option value={""}>-- auswählen --</option>
          {classRoles.map((role, idx) => (
            <option key={idx} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>

      <button className="base-btn">eintragen</button>
    </form>
  );
};
