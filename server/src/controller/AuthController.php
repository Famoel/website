<?php

use Ramsey\Uuid\Uuid;

class AuthController extends MainController
{
    public function registerUser()
    {
        $username     = trim($_POST["username"]);
        $email        = trim($_POST["email"]);
        $confirmEmail = trim($_POST["confirmEmail"]);
        $password     = trim($_POST["password"]);

        if ($username == "" || $email == "" || $confirmEmail == "" || $password == "") {
            throw new Exception("Register User: Username, Email or Password is empty!");
        }

        if (strlen($username) > USERNAME_LENGTH) {
            $this->Message->setMessage("Der Benutzername darf maximal " . USERNAME_LENGTH . " Zeichen lang sein!", true);

            echo json_encode($this->Message->getMessage());
            return;
        }

        if ($email !== $confirmEmail) {
            $this->Message->setMessage("Die Email Adressen stimmen nicht überein!", true);

            echo json_encode($this->Message->getMessage());
            return;
        }

        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->Message->setMessage("Die Email Adresse ist ungültig!", true);

            echo json_encode($this->Message->getMessage());
            return;
        }

        if (strlen($password) < PASSWORD_MIN_LENGTH) {
            $this->Message->setMessage("Das Passwort muss mindestens " . PASSWORD_MIN_LENGTH . " Zeichen lang sein!", true);

            echo json_encode($this->Message->getMessage());
            return;
        }

        if ($this->UsersModel->countUser($username, $email) !== 0) {
            $this->Message->setMessage("Der Benutzername oder die Email Adresse sind bereits vergeben!", true);

            echo json_encode($this->Message->getMessage());
            return;
        }

        $uuid       = Uuid::uuid4()->toString();
        $hash       = password_hash($password, PASSWORD_DEFAULT);
        $createUser = $this->UsersModel->createUser($uuid, $username, $email, $hash);

        if (! $createUser) {
            throw new Exception("Register User: Error creating user in database!");
        }

        $this->Message->setMessage("Du wurdest erfolgreich registriert!", false);

        $data = [
             ...$this->Message->getMessage(),
            "isValid" => true,
        ];

        echo json_encode($data);
    }

    public function loginUser()
    {
        $email    = trim($_POST["email"]);
        $password = trim($_POST["password"]);

        if ($email == "" || $password == "") {
            throw new Exception("Login User: Email or Password is empty!");
        }

        $user = $this->UsersModel->getUserFromEmail($email);

        if (! password_verify($password, $user["password"])) {
            $this->Message->setMessage("Die Login Daten sind nicht korrekt!", true);

            echo json_encode($this->Message->getMessage());
            return;
        }

        $data = [
            "isValid"  => true,
            "username" => $user["name"],
        ];

        echo json_encode($data);
    }
}
