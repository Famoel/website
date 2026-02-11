import { type SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { CLIENT_ROUTES } from "../../routes/client-routes";

export const Login = () => {
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("test");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-1.5">
        <input type="email" placeholder="Email Adresse" />
        <input type="password" placeholder="Passwort" />
        <button type="submit" className="base-btn">
          Login
        </button>
      </form>

      <div className="mt-1 flex justify-between">
        <Link to={CLIENT_ROUTES.ROOT.REGISTER} className="base-link">
          {" > Registrieren?"}
        </Link>

        <Link to={CLIENT_ROUTES.ROOT.REGISTER} className="base-link">
          {" > Passwort vergessen?"}
        </Link>
      </div>
    </>
  );
};
