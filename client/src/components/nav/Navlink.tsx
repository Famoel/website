import { Link } from "react-router-dom";
import type { INavlink } from "../../interface/nav/INavlink";

export const Navlink = ({ to, label, img }: INavlink) => {
  const imgSize = 32;

  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl bg-linear-to-r from-amber-700 to-amber-900 px-2 py-1 font-bold uppercase no-underline! hover:bg-linear-to-r hover:from-amber-900 hover:to-amber-700"
    >
      {img && <img src={img} alt={label} width={imgSize} height={imgSize} />}

      {label}
    </Link>
  );
};
