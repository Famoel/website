export const ChatContent = () => {
  return (
    <div className="bg-accent flex flex-col gap-2 p-1 rounded-lg">
      <div className="bg-secondary flex justify-between rounded p-1 font-semibold text-black">
        <p className="flex items-center gap-1.5 italic">
          <span className="text-xs text-red-600">Admin</span> GentlmenLike
        </p>
        <p>Datum</p>
      </div>
      <div className="max-h-28 min-h-20 overflow-y-auto rounded-2xl border p-1.5 wrap-break-word whitespace-pre-wrap">
        <p>
          jhjhjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
          hhggfgfgfhhhjjgggjhjh
          jhjhjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
          jhjhjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
        </p>
      </div>
    </div>
  );
};
