import { useEffect, useState, type SubmitEvent } from "react";
import { useSelector } from "react-redux";
import { Message } from "../components/common/Message";
import { MESSAGE_FLAG } from "../flags/message-flag";
import { useClassList } from "../hooks/fetch/useClassList";
import { useUserProfile } from "../hooks/fetch/useUserProfile";
import { useMessage } from "../hooks/useMessage";
import type { IClassList } from "../interface/class/IClassList";
import type { IUserCharacterList } from "../interface/user-profile/IUserCharacterList";
import type { RootState } from "../redux/store";

const initialForm = {
  username: "",
  charactername: "",
  classId: 0,
  typ: "",
};

export const ProfilePage = () => {
  const [classList, setClassList] = useState<IClassList[]>([]);
  const [userCharacterList, setUserCharacterList] = useState<
    IUserCharacterList[]
  >([]);
  const [form, setForm] = useState(initialForm);
  const reduxUser = useSelector((state: RootState) => state.user);

  const { classList: serverClassList } = useClassList();
  const { createUserCharacter, getUserCharacterList } = useUserProfile();
  const { msg, setMsg } = useMessage();

  useEffect(() => {
    init(reduxUser.username);
  }, [reduxUser.username]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, username: reduxUser.username }));
  }, [form.username]);

  const init = async (username: string) => {
    if (username === "") {
      console.error("ProfilePage: username is empty");
      return;
    }

    setClassList(await serverClassList());
    setUserCharacterList(await getUserCharacterList(username));
  };

  const combinedUserCharacterList = () => {
    if (userCharacterList.length === 0)
      return <p className="text-center">Keine Charaktere vorhanden</p>;

    return userCharacterList.map((userCharacter) => {
      return classList.map((classList) => {
        if (classList.id === userCharacter.class_list_id) {
          return (
            <div
              key={userCharacter.id}
              className="bg-secondary flex transform items-center justify-between rounded-2xl px-3 py-1 font-semibold text-black transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-300"
            >
              <div className="flex items-center gap-1.5">
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: classList.color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>
                <p>{userCharacter.character_name}</p>
              </div>
              <p>{classList.name}</p>
              <p className="first-letter:uppercase">{userCharacter.typ}</p>

              <form onSubmit={(e) => handleDelete(userCharacter.id, e)}>
                <button className="hover:text-text! bg-red-500 hover:bg-red-700">
                  X
                </button>
              </form>
            </div>
          );
        }
      });
    });
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
      setUserCharacterList(await getUserCharacterList(reduxUser.username));
    }
  };

  const handleDelete = async (
    characterId: number,
    e: SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    console.log(characterId);
  };

  return (
    <div className="flex w-full justify-between gap-3">
      {/* insert character */}
      <div className="mx-auto mt-[10vh]">
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
              {msg &&
                msg.flag === MESSAGE_FLAG.USER_PROFILE.CREATE_CHARACTER && (
                  <Message isErrorMsg={msg.isErrorMsg} message={msg.message} />
                )}
            </div>
          </form>
        </div>
      </div>

      {/* user character list */}
      <div className="bg-primary flex flex-col gap-2 self-start rounded p-2 xl:w-3/12">
        <p className="mb-4 text-center text-2xl font-bold underline underline-offset-2">
          Meine Charaktere
        </p>

        {combinedUserCharacterList()}
      </div>
    </div>
  );
};
