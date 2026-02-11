<?php

class MainController
{
    protected UsersModel $UsersModel;

    public function __construct(Base $f3)
    {
        $this->UsersModel = new UsersModel($f3->get("DB"));
    }
}
