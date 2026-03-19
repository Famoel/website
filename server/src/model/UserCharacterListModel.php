<?php

class UserCharacterListModel extends MainModel
{
    public function getCharactersFromUser(string $username, int $isDeleted = 0): array
    {
        $select = $this->getDb()->exec(
            "SELECT * FROM `user_character_list` WHERE `username` = :username AND `is_deleted` = :isDeleted",
            args: ["username" => $username, "isDeleted" => $isDeleted]
        );

        return (array) $select ?? [];
    }

    public function checkIfCharacterExists(string $charactername, int $isDeleted = 0): bool
    {
        $check = $this->getDb()->exec(
            "SELECT COUNT(*) AS countChar FROM `user_character_list` WHERE `character_name` = :charactername AND `is_deleted` = :isDeleted",
            args: ["charactername" => $charactername, "isDeleted" => $isDeleted]
        );

        return (bool) $check[0]["countChar"] > 0;
    }

    public function checkIfUserHasAlreadyMainCharacter(string $username, string $typ = "main", int $isDeleted = 0): bool
    {
        $check = $this->getDb()->exec(
            "SELECT COUNT(*) AS countChar FROM `user_character_list` WHERE `username` = :username AND `typ` = :typ AND `is_deleted` = :isDeleted",
            args: ["username" => $username, "typ" => $typ, "isDeleted" => $isDeleted]
        );

        return (bool) $check[0]["countChar"] > 0;
    }

    public function insertCharacter(string $charactername, string $username, string $typ, int $class_list_id): bool
    {
        $insert = $this->getDb()->exec(
            "INSERT INTO `user_character_list` (`character_name`, `username`, `typ`, `class_list_id`) VALUES (:charactername, :username, :typ, :class_list_id)",
            args: ["charactername" => $charactername, "username" => $username, "typ" => $typ, "class_list_id" => $class_list_id]
        );

        return (bool) $insert;
    }
}
