import { useEffect, useState, type SubmitEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE_FLAG } from "../../flags/message-flag";
import { useClassList } from "../../hooks/fetch/useClassList";
import { useUserProfile } from "../../hooks/fetch/useUserProfile";
import { useMessage } from "../../hooks/useMessage";
import type { IClassList } from "../../interface/class/IClassList";
import { updateUserCharacterList } from "../../redux/slice/userProfileSlice";
import type { TRootState } from "../../redux/store";
import { Message } from "../common/Message";

const initialForm = {
  username: "",
  charactername: "",
  classId: 0,
  typ: "",
};

export const InsertCharacterForm = () => {
  const [form, setForm] = useState(initialForm);
  const [classList, setClassList] = useState<IClassList[]>([]);
  const reduxUser = useSelector((state: TRootState) => state.user);
  const dispatch = useDispatch();

  const { createUserCharacter, getUserCharacterList } = useUserProfile();
  const { getClassList } = useClassList();
  const { msg, setMsg } = useMessage();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setForm((prev) => ({ ...prev, username: reduxUser.username }));
  }, [form.username, reduxUser.username]);

  const init = async () => {
    setClassList(await getClassList());
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.charactername === "" || form.classId === 0 || form.typ === "") {
      setMsg({
        message: "Bitte alle Felder ausfüllen!",
        isErrorMsg: true,
        flag: MESSAGE_FLAG.USER_PROFILE.CREATE_CHARACTER,
      });

      return;
    }

    const resCreateUserCharacter = await createUserCharacter(
      form.username,
      form.classId,
      form.charactername,
      form.typ,
    );

    if (resCreateUserCharacter.message) {
      setMsg({
        message: resCreateUserCharacter.message,
        isErrorMsg: resCreateUserCharacter.isErrorMsg,
        flag: MESSAGE_FLAG.USER_PROFILE.CREATE_CHARACTER,
      });
    }

    if (resCreateUserCharacter.isValid) {
      setForm(initialForm);

      /* update redux store */
      dispatch(
        updateUserCharacterList(await getUserCharacterList(reduxUser.username)),
      );
    }
  };

  return (
    <div className="bg-primary flex min-h-50 w-full flex-col justify-between gap-2 rounded p-3 lg:w-80 xl:w-100">
      <p className="text-center text-2xl font-bold underline underline-offset-2">
        Charakter eintragen
      </p>

      <input
        type="text"
        placeholder="Charaktername"
        autoComplete="off"
        maxLength={15}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, charactername: e.target.value }))
        }
        value={form.charactername}
      />

      <select
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            classId: Number(e.target.value),
          }))
        }
        value={form.classId}
      >
        <option value={0}>-- Klasse auswählen --</option>
        {classList.map((list) => (
          <option key={list.id} value={list.id}>
            {list.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            typ: e.target.value,
          }))
        }
        value={form.typ}
      >
        <option value={""}>-- Typ auswählen --</option>
        <option value={"main"}>Main</option>
        <option value={"alt"}>Alt</option>
      </select>

      <form onSubmit={handleSubmit}>
        <button className="base-btn w-full">senden</button>
        <div className="mt-2">
          {msg && msg.flag === MESSAGE_FLAG.USER_PROFILE.CREATE_CHARACTER && (
            <Message isErrorMsg={msg.isErrorMsg} message={msg.message} />
          )}
        </div>
      </form>
    </div>
  );
};
