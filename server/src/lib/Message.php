<?php

class Message
{
    private string $message;
    private bool $isErrorMsg;

    public function __construct()
    {
        $this->message    = "";
        $this->isErrorMsg = true;
    }

    public function setMessage(string $message, bool $isErrorMsg): void
    {
        $this->message    = $message;
        $this->isErrorMsg = $isErrorMsg;
    }

    public function getMessage(): array
    {
        return [
            "message"    => $this->message,
            "isErrorMsg" => $this->isErrorMsg,
        ];
    }

}
