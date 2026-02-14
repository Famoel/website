<?php

class MainController
{
    protected UsersModel $UsersModel;
    protected Message $Message;

    public function __construct(Base $f3)
    {
        // MODELS
        $this->UsersModel = new UsersModel($f3->get(DATABASE));

        //
        $this->Message = new Message();
    }
}
