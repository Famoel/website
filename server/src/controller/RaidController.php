<?php

class RaidController extends MainController
{
    public function getRaidList()
    {
        echo json_encode($this->RaidListModel->selectAll());
    }
}
