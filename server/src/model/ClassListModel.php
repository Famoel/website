<?php

class ClassListModel extends MainModel
{
    public function selectAll(): array
    {
        $select = $this->getDb()->exec(
            "SELECT `id`, `name`, `color`, `canTank`, `canHeal`, `canDps`, `canSupport`
            FROM `class_list` ORDER BY `name` ASC"
        );

        return (array) $select ?? [];
    }
}
