<?php

class ChatModel extends MainModel
{
    public function insertMessage(string $author, string $message)
    {
        $this->getDb()->exec(
            "INSERT INTO `chat` (`author`, `message`) VALUES (:author, :message)",
            ["author" => $author, "message" => $message]
        );
    }

    public function getData(): array
    {
        $select = $this->getDb()->exec("SELECT `id`, `author`, `message`, `created` FROM `chat`");

        return (array) $select;
    }
}
