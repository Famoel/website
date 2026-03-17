<?php

class UsersModel extends MainModel
{
    public function countUser(string $username, string $email): int
    {
        $count = $this->getDb()->exec(
            "SELECT COUNT(*) AS countUser FROM `users` WHERE `name` = :name OR `email` = :email",
            args: ["name" => $username, "email" => $email]
        );

        return (int) $count[0]["countUser"];
    }

    public function countUserFromUsername(string $username): int
    {
        $count = $this->getDb()->exec(
            "SELECT COUNT(*) AS countUser FROM `users` WHERE `name` = :name",
            ["name" => $username]
        );

        return (int) $count[0]["countUser"];
    }

    public function countUserFromEmail(string $email): int
    {
        $count = $this->getDb()->exec(
            "SELECT COUNT(*) AS countUser FROM `users` WHERE `email` = :email",
            ["email" => $email]
        );

        return (int) $count[0]["countUser"];
    }

    public function createUser(string $uuid, string $username, string $email, string $password): bool
    {
        $insert = $this->getDb()->exec(
            "INSERT INTO `users` (`uuid`, `name`, `email`, `password`) VALUES (:uuid, :name, :email, :password)",
            args: ["uuid" => $uuid, "name" => $username, "email" => $email, "password" => $password]
        );

        return (bool) $insert;
    }

    public function getUserFromEmail(string $email): array
    {
        $select = $this->getDb()->exec(
            "SELECT `password`, `name`, `created` FROM `users` WHERE `email` = :email",
            ["email" => $email]
        );

        return (array) $select[0];
    }
}
