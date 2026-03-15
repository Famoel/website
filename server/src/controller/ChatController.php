<?php

class ChatController extends MainController
{
    public function send()
    {
        $author  = trim($_POST["author"]);
        $message = trim($_POST["message"]);

        if ($author == "" || $message == "") {
            throw new Exception("Send Message to Chat: Author or Message is empty!");
        }

        $this->ChatModel->insertMessage($author, $message);

    }

    public function getData()
    {
        echo json_encode($this->ChatModel->getData());
    }
}
