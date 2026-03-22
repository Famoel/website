import { NAVI } from "../../routes/navi";
import { Collapse } from "./Collapse";
import { Navlink } from "./Navlink";

export const Sidebar = () => {
  return (
    <div className="bg-primary rounded flex h-full flex-col gap-3 p-2">
      {NAVI.map((nav, idx) => {
        if (nav.children) {
          return (
            <Collapse key={idx} label={nav.label} img={nav.img} imgSize={32}>
              {nav.children.map((child, idx) => {
                return (
                  <Navlink
                    key={idx}
                    to={child.to}
                    label={child.label}
                    img={child.img}
                  />
                );
              })}
            </Collapse>
          );
        }

        return (
          <Navlink key={idx} to={nav.to} label={nav.label} img={nav.img} />
        );
      })}
    </div>
  );
};
