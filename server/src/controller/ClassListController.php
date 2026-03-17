<?php

class ClassListController extends MainController
{
    public function getClassList()
    {
        echo json_encode($this->ClassListModel->selectAll());
    }
}