<?php

class SessionModel extends MainModel
{
    public function countUser(string $username): int
    {
        $count = $this->getDb()->exec(
            "SELECT COUNT(*) AS countUser FROM `session` WHERE `username` = :username",
            args: ["username" => $username]
        );

        return (int) $count[0]["countUser"];
    }

    public function countToken(string $token): int
    {
        $count = $this->getDb()->exec(
            "SELECT COUNT(*) AS countToken FROM `session` WHERE `token` = :token",
            args: ["token" => $token]
        );

        return (int) $count[0]["countToken"];
    }

    public function selectUsernameFromToken(string $token): string
    {
        $select = $this->getDb()->exec(
            "SELECT `username` FROM `session` WHERE `token` = :token",
            args: ["token" => $token]
        );

        return $select[0]["username"];
    }

    public function insertSession(string $username, string $token): bool
    {
        $insert = $this->getDb()->exec(
            "INSERT INTO `session` (`username`, `token`) VALUES (:username, :token)",
            args: ["username" => $username, "token" => $token]
        );

        return (bool) $insert;
    }

    public function updateSession(string $username, string $token): bool
    {
        $update = $this->getDb()->exec(
            "UPDATE `session` SET `token` = :token WHERE `username` = :username",
            args: ["username" => $username, "token" => $token]
        );

        return (bool) $update;
    }
}
