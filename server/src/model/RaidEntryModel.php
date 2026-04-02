<?php

class RaidEntryModel extends MainModel
{
    public function selectAll(): array
    {
        $select = $this->getDb()->exec(
            "SELECT * FROM `raid_entry`"
        );

        return (array) $select ?? [];
    }
}
