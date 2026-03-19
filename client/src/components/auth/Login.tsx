import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MESSAGE_FLAG } from "../../flags/message-flag";
import { SESSION_FLAG } from "../../flags/session-flags";
import { useAuth } from "../../hooks/fetch/useAuth";
import { useSession } from "../../hooks/fetch/useSession";
import { useMessage } from "../../hooks/useMessage";
import type { ILoginForm } from "../../interface/auth/ILoginForm";
import { CLIENT_ROUTES } from "../../routes/client-routes";
import { Message } from "../common/Message";

const initialForm: ILoginForm = {
  email: "",
  password: "",
};

export const Login = () => {
  const [form, setForm] = useState<ILoginForm>(initialForm);
  const navigate = useNavigate();

  const { login } = useAuth();
  const { startSession } = useSession();
  const { msg, setMsg } = useMessage();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    Object.values(form).forEach((value) => {
      if (!value) {
        setMsg({
          message: "Email Adresse und Passwort werden benötigt!",
          isErrorMsg: true,
          flag: MESSAGE_FLAG.AUTH.LOGIN_USER,
        });

        return (isValid = false);
      }
    });

    if (!isValid) {
      console.error("Login is inValid, not sending request!");
      return;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const resLogin = await login(formData);

    if (resLogin.message) {
      setMsg({
        message: resLogin.message,
        isErrorMsg: resLogin.isErrorMsg,
        flag: MESSAGE_FLAG.AUTH.LOGIN_USER,
      });
    }

    if (resLogin.isValid) {
      /* session start */
      const resSession = await startSession(resLogin.username);

      if (!resSession.isValid)
        return console.error("Start Session is not valid!");

      sessionStorage.setItem(
        SESSION_FLAG.SESSION_USERNAME,
        resSession.username,
      );

      sessionStorage.setItem(SESSION_FLAG.SESSION_TOKEN, resSession.token);

      navigate(CLIENT_ROUTES.PROTECTED.OVERVIEW);
    }
  };

  return (
    <>
      <div className="mb-2">
        {msg.message && msg.flag === MESSAGE_FLAG.AUTH.LOGIN_USER && (
          <Message message={msg.message} isErrorMsg={msg.isErrorMsg} />
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-1.5">
        <input
          type="email"
          placeholder="Email Adresse"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          value={form.email}
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
          Login
        </button>
      </form>

      <div className="mt-1 flex justify-between">
        <Link
          to={CLIENT_ROUTES.ROOT.REGISTER}
          className="base-link base-link-primary"
        >
          {" > Registrieren?"}
        </Link>

        <Link
          to={CLIENT_ROUTES.ROOT.REGISTER}
          className="base-link base-link-primary"
        >
          {" > Passwort vergessen?"}
        </Link>
      </div>
    </>
  );
};
