<?php

class RaidListModel extends MainModel
{
    public function selectAll(): array
    {
        $select = $this->getDb()->exec(
            "SELECT * FROM `raid_list` ORDER BY `name` ASC"
        );

        return (array) $select ?? [];
    }
}
