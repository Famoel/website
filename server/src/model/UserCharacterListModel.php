<?php

class UserCharacterListModel extends MainModel
{
    public function getCharactersFromUser(string $username, int $isDeleted = 0): array
    {
        $select = $this->getDb()->exec(
            "SELECT * FROM `user_character_list` WHERE `username` = :username AND `isDeleted` = :isDeleted",
            args: ["username" => $username, "isDeleted" => $isDeleted]
        );

        return (array) $select ?? [];
    }

    public function checkIfCharacterExists(string $charactername, int $isDeleted = 0): bool
    {
        $check = $this->getDb()->exec(
            "SELECT COUNT(*) AS countChar FROM `user_character_list` WHERE `characterName` = :charactername AND `isDeleted` = :isDeleted",
            args: ["charactername" => $charactername, "isDeleted" => $isDeleted]
        );

        return (bool) $check[0]["countChar"] > 0;
    }

    public function checkIfUserHasAlreadyMainCharacter(string $username, string $typ = "main", int $isDeleted = 0): bool
    {
        $check = $this->getDb()->exec(
            "SELECT COUNT(*) AS countChar FROM `user_character_list` WHERE `username` = :username AND `typ` = :typ AND `isDeleted` = :isDeleted",
            args: ["username" => $username, "typ" => $typ, "isDeleted" => $isDeleted]
        );

        return (bool) $check[0]["countChar"] > 0;
    }

    public function insertCharacter(string $charactername, string $username, string $typ, int $classListId): bool
    {
        $insert = $this->getDb()->exec(
            "INSERT INTO `user_character_list` (`characterName`, `username`, `typ`, `classListId`) VALUES (:charactername, :username, :typ, :classListId)",
            args: ["charactername" => $charactername, "username" => $username, "typ" => $typ, "classListId" => $classListId]
        );

        return (bool) $insert;
    }
}
