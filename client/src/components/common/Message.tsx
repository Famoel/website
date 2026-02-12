import type { IMessage } from "../../interface/IMessage";

export const Message = ({ message, isErrorMsg }: IMessage) => {
  return (
    <div
      className={`${isErrorMsg ? "border-red-500" : "border-green-500"} rounded border-4 bg-yellow-200 p-2 text-black`}
    >
      <p className="text-center font-semibold">{message}</p>
    </div>
  );
};
