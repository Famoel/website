<?php

class MainController
{
    protected UsersModel $UsersModel;
    protected SessionModel $SessionModel;
    protected ChatModel $ChatModel;
    protected ClassListModel $ClassListModel;
    protected UserCharacterListModel $UserCharacterListModel;
    protected RaidListModel $RaidListModel;
    protected Message $Message;

    public function __construct(Base $f3)
    {
        // auth
        $this->UsersModel   = new UsersModel($f3->get(DATABASE));
        $this->SessionModel = new SessionModel($f3->get(DATABASE));

        $this->ChatModel              = new ChatModel($f3->get(DATABASE));
        $this->ClassListModel         = new ClassListModel($f3->get(DATABASE));
        $this->UserCharacterListModel = new UserCharacterListModel($f3->get(DATABASE));

        // planer
        $this->RaidListModel = new RaidListModel($f3->get(DATABASE));

        $this->Message = new Message();
    }
}
