import { useEffect, useState, type SubmitEvent } from "react";
import { useChat } from "../../hooks/fetch/useChat";
import { type IChatForm } from "../../interface/chat/IChatForm";

const initialForm: IChatForm = {
  author: "",
  message: "",
};

export const ChatForm = () => {
  const [form, setForm] = useState<IChatForm>(initialForm);

  const { send } = useChat();

  const author = "GentlmenLike";

  useEffect(() => {
    setForm((prev) => ({ ...prev, author }));
  }, [form.author]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.message || !form.author) return;

    const formData = new FormData();
    formData.append("author", form.author);
    formData.append("message", form.message);

    await send(formData).then(() => setForm(initialForm));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-accent flex gap-2 rounded-lg p-3"
    >
      <input
        type="text"
        placeholder="Deine Nachricht..."
        autoComplete="off"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, message: e.target.value }))
        }
        value={form.message}
        className="w-full"
      />

      <button className="base-btn">senden</button>
    </form>
  );
};
