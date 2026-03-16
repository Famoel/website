import { NAVI } from "../../routes/navi";
import { Navlink } from "./Navlink";

export const Sidebar = () => {
  return (
    <div className="bg-primary flex h-full flex-col gap-3 p-2">
      {NAVI.map((nav, idx) => {
        return (
          <Navlink key={idx} to={nav.to} label={nav.label} img={nav.img} />
        );
      })}
    </div>
  );
};
