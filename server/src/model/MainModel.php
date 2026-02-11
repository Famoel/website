<?php

class MainModel
{
    protected object $db;

    public function __construct(object $db)
    {
        $this->db = $db;
    }

    protected function getDb(): object
    {
        return $this->db;
    }
}
