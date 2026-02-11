import type { IMessage } from "../interface/IMessage";

export const Message = ({ message, success }: IMessage) => {
  return (
    <div
      className={`${success ? "border-green-500" : "border-red-500"} rounded border-4 bg-yellow-200 p-2 text-black`}
    >
      <p className="text-center font-semibold">{message}</p>
    </div>
  );
};
