import { Link } from "react-router-dom";
import type { INavlink } from "../../interface/nav/INavlink";

export const Navlink = ({ to, label }: INavlink) => {
  return (
    <Link
      to={to}
      className="bg-call-to-action hover:bg-call-to-action-hover transform transition-all duration-300 ease-in rounded-2xl p-2 font-bold text-black uppercase no-underline!"
    >
      {label}
    </Link>
  );
};
