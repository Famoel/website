import { useState, type SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { MESSAGE_FLAG } from "../../flags/message-flag";
import { useAuth } from "../../hooks/fetch/useAuth";
import { useMessage } from "../../hooks/useMessage";
import type { IRegisterForm } from "../../interface/auth/IRegisterForm";
import { CLIENT_ROUTES } from "../../routes/client-routes";
import { Message } from "../common/Message";

const initialForm: IRegisterForm = {
  username: "",
  email: "",
  confirmEmail: "",
  password: "",
};

export const Register = () => {
  const [form, setForm] = useState<IRegisterForm>(initialForm);

  const { register } = useAuth();
  const { msg, setMsg } = useMessage();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    Object.values(form).forEach((value) => {
      if (!value) {
        setMsg({
          message: "Bitte alle Felder ausfüllen",
          isErrorMsg: true,
          flag: MESSAGE_FLAG.AUTH.REGISTER_USER,
        });

        return (isValid = false);
      }
    });

    if (!isValid) return;

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const resRegister = await register(formData);

    if (resRegister.message) {
      setMsg({
        message: resRegister.message,
        isErrorMsg: resRegister.isErrorMsg,
        flag: MESSAGE_FLAG.AUTH.REGISTER_USER,
      });
    }

    if (resRegister.isValid) setForm(initialForm);
  };

  return (
    <form
      action={CLIENT_ROUTES.ROOT.REGISTER}
      onSubmit={handleSubmit}
      className="bg-primary flex flex-col gap-3 rounded p-3"
    >
      {msg.message && msg.flag === MESSAGE_FLAG.AUTH.REGISTER_USER && (
        <Message message={msg.message} isErrorMsg={msg.isErrorMsg} />
      )}

      <input
        type="text"
        placeholder="Benutzername"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, username: e.target.value }))
        }
        value={form.username}
      />

      <input
        type="email"
        placeholder="Email Adresse"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, email: e.target.value }))
        }
        value={form.email}
      />

      <input
        type="email"
        placeholder="Email Adresse wiederholen"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, confirmEmail: e.target.value }))
        }
        value={form.confirmEmail}
      />

      <input
        type="password"
        placeholder="Passwort"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, password: e.target.value }))
        }
        value={form.password}
      />

      <button type="submit" className="base-btn">
        Registrieren
      </button>

      <Link to={CLIENT_ROUTES.ROOT.INDEX} className="base-link self-start">
        {" > Zum Login"}
      </Link>
    </form>
  );
};
