<?php

class ClassListModel extends MainModel
{
    public function selectAll(): array
    {
        $select = $this->getDb()->exec(
            "SELECT `id`, `name`, `color`, `can_tank`, `can_heal`, `can_dps`, `can_support`
            FROM `class_list` ORDER BY `name` ASC"
        );

        return (array) $select;
    }
}
