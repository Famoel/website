import { useState, type ReactNode } from "react";

export const Collapse = ({
  label,
  img,
  imgSize,
  children,
}: {
  label: string;
  img?: string;
  imgSize?: number;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex flex-col gap-2 hover:cursor-pointer"
      onClick={() => setIsOpen((prev) => !prev)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="nav-link select-none">
        {img && <img src={img} alt={label} width={imgSize} height={imgSize} />}
        <p>{label}</p>
      </div>

      {isOpen && (
        <div className="ml-auto flex w-[90%] flex-col gap-2">{children}</div>
      )}
    </div>
  );
};
