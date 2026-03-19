import { InsertCharacterForm } from "../components/user-profile/InsertCharacterForm";
import { UserCharacterList } from "../components/user-profile/UserCharacterList";

export const ProfilePage = () => {
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
