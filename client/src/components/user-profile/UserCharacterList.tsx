import { useEffect, useState, type SubmitEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClassList } from "../../hooks/fetch/useClassList";
import { useUserProfile } from "../../hooks/fetch/useUserProfile";
import type { IClassList } from "../../interface/class/IClassList";
import { updateUserCharacterList } from "../../redux/slice/userProfileSlice";
import type { TRootState } from "../../redux/store";

export const UserCharacterList = () => {
  const [classlist, setClassList] = useState<IClassList[]>([]);
  const reduxUser = useSelector((state: TRootState) => state.user);
  const reduxUserProfile = useSelector(
    (state: TRootState) => state.userProfile,
  );

  const dispatch = useDispatch();
  const { getClassList } = useClassList();
  const { getUserCharacterList } = useUserProfile();

  useEffect(() => {
    init();
  }, [reduxUser.username]);

  const init = async () => {
    setClassList(await getClassList());

    /* update redux store */
    dispatch(
      updateUserCharacterList(await getUserCharacterList(reduxUser.username)),
    );
  };

  const combinedUserCharacterList = () => {
    if (reduxUserProfile.userCharacterList.length === 0)
      return <p className="text-center">Keine Charaktere vorhanden</p>;

    return reduxUserProfile.userCharacterList.map((userCharacter) => {
      return classlist.map((classList) => {
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
                    border: "2px solid black",
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

  /* TODO: make delete character from list functional */
  const handleDelete = async (
    characterId: number,
    e: SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    console.log(characterId);
  };

  return (
    <div className="bg-primary flex flex-col gap-2 rounded p-2">
      <p className="mb-4 text-center text-2xl font-bold underline underline-offset-2">
        Meine Charaktere
      </p>

      {combinedUserCharacterList()}
    </div>
  );
};
