import { useEffect, useState, type SubmitEvent } from "react";
import { Message } from "../components/common/Message";
import { MESSAGE_FLAG } from "../flags/message-flag";
import { useClassList } from "../hooks/fetch/useClassList";
import { useMessage } from "../hooks/useMessage";
import type { IClassList } from "../interface/class/IClassList";

const initialForm = {
  name: "",
  classId: 0,
};

export const ProfilePage = () => {
  const [classList, setClassList] = useState<IClassList[]>([]);
  const [form, setForm] = useState(initialForm);

  const { classList: characterClassList } = useClassList();
  const { msg, setMsg } = useMessage();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setClassList(await characterClassList());
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.name === "" || form.classId === 0) {
      setMsg({
        message: "Bitte alle Felder ausfüllen!",
        isErrorMsg: true,
        flag: MESSAGE_FLAG.USER_PROFILE.CREATE_CHARACTER,
      });
    }

    console.log("submit", form);
  };

  return (
    <div className="flex h-full w-full justify-between gap-3">
      <div className="mx-auto mt-[10vh]">
        <div className="bg-primary flex min-h-50 w-80 flex-col justify-between gap-2 rounded p-3">
          <p className="text-center text-2xl font-bold underline underline-offset-2">
            Charakter eintragen
          </p>

          <input
            type="text"
            placeholder="Charaktername"
            autoComplete="off"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            value={form.name}
          />

          <select
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                classId: Number(e.target.value),
              }))
            }
          >
            <option value={0}>-- Klasse auswählen --</option>
            {classList.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>

          <form onSubmit={handleSubmit}>
            <button className="base-btn w-full">senden</button>
            <div className="mt-2">
              {msg &&
                msg.flag === MESSAGE_FLAG.USER_PROFILE.CREATE_CHARACTER && (
                  <Message isErrorMsg={msg.isErrorMsg} message={msg.message} />
                )}
            </div>
          </form>
        </div>
      </div>

      <div className="bg-primary h-full w-80">
        <p className="text-center text-2xl font-bold underline underline-offset-2">
          Meine Charakter
        </p>
      </div>
    </div>
  );
};
