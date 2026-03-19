<?php

class MainController
{
    protected UsersModel $UsersModel;
    protected SessionModel $SessionModel;
    protected ChatModel $ChatModel;
    protected ClassListModel $ClassListModel;
    protected UserCharacterListModel $UserCharacterListModel;
    protected Message $Message;

    public function __construct(Base $f3)
    {
        // MODELS
        $this->UsersModel             = new UsersModel($f3->get(DATABASE));
        $this->ChatModel              = new ChatModel($f3->get(DATABASE));
        $this->SessionModel           = new SessionModel($f3->get(DATABASE));
        $this->ClassListModel         = new ClassListModel($f3->get(DATABASE));
        $this->UserCharacterListModel = new UserCharacterListModel($f3->get(DATABASE));

        //
        $this->Message = new Message();
    }
}
