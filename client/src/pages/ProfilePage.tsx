import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InsertCharacterForm } from "../components/user-profile/InsertCharacterForm";
import { UserCharacterList } from "../components/user-profile/UserCharacterList";
import { useClassList } from "../hooks/fetch/useClassList";
import { useUserProfile } from "../hooks/fetch/useUserProfile";
import { setClassList } from "../redux/slice/classListSlice";
import { setUserCharacterList } from "../redux/slice/userProfileSlice";
import type { TRootState } from "../redux/store";

export const ProfilePage = () => {
  const reduxUser = useSelector((state: TRootState) => state.user);
  const dispatch = useDispatch();

  const { getUserCharacterList } = useUserProfile();
  const { getClassList } = useClassList();

  useEffect(() => {
    if (!reduxUser.username) return;
    init(reduxUser.username);
  }, [reduxUser.username]);

  const init = async (username: string) => {
    dispatch(setClassList(await getClassList()));
    dispatch(setUserCharacterList(await getUserCharacterList(username)));
  };

  return (
    <div className="flex w-full justify-between gap-3">
      <div className="mx-auto mt-[10vh]">
        <InsertCharacterForm />
      </div>

      {/* user character list */}
      <div className="xl:w-3/12">
        <UserCharacterList />
      </div>
    </div>
  );
};
