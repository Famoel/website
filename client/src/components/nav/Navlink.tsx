import { Link } from "react-router-dom";
import type { INavlink } from "../../interface/nav/INavlink";

export const Navlink = ({ to, label, img }: INavlink) => {
  const imgSize = 32;

  return (
    <Link to={to} className="nav-link">
      {img && <img src={img} alt={label} width={imgSize} height={imgSize} />}

      {label}
    </Link>
  );
};
