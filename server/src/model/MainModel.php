<?php

use DB\SQL;

class MainModel
{
    private SQL $db;

    public function __construct(SQL $db)
    {
        $this->db = $db;
    }

    protected function getDb(): SQL
    {
        return $this->db;
    }
}
