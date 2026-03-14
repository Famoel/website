export const ChatForm = () => {
  return (
    <form className="flex gap-2 py-1 px-4 bg-accent rounded-lg">
      <input
        type="text"
        placeholder="Deine Nachricht..."
        autoComplete="off"
        className="w-full"
      />

      <button className="base-btn">senden</button>
    </form>
  );
};
