<?php

class SessionController extends MainController
{
    public function startSession()
    {
        $req  = file_get_contents(PHP_INPUT);
        $data = json_decode($req, true);

        $username = trim($data["username"]);

        if ($username == "") {
            throw new Exception("Start Session: Username is empty!");
        }

        if ($this->UsersModel->countUserFromUsername($username) !== 1) {
            throw new Exception("Start Session: Username does not exist!");
        }

        // string token with 100 characters
        $token = bin2hex(random_bytes(100));

        $isValid = false;

        if ($this->SessionModel->countUser($username) == 0) {
            $this->SessionModel->insertSession($username, $token);
            $isValid = true;
        }

        if ($this->SessionModel->countUser($username) == 1) {
            $this->SessionModel->updateSession($username, $token);
            $isValid = true;
        }

        if (! $isValid) {
            throw new Exception("Start Session: Something went wrong!");
        }

        $data = [
            "username" => $username,
            "token"    => $token,
            "isValid"  => $isValid,
        ];

        echo json_encode($data);
    }

    public function checkSession()
    {
        $req  = file_get_contents(PHP_INPUT);
        $data = json_decode($req, true);

        $token = trim($data["token"]);

        if ($this->SessionModel->countToken($token) !== 1) {
            throw new Exception("Check Session: Token does not exist!");
        }

        $data = [
            "username" => $this->SessionModel->selectUsernameFromToken($token),
            "isValid"  => true,
        ];

        echo json_encode($data);
    }
}
