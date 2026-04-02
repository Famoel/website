<?php

class RaidPlanModel extends MainModel
{
    public function selectAll(): array
    {
        $select = $this->getDb()->exec(
            "SELECT * FROM `raid_plan` ORDER BY `start`"
        );

        return (array) $select ?? [];
    }

    public function insertRaidPlan(int $raidListId, string $start, string $createdFrom): bool
    {
        return $this->getDb()->exec(
            "INSERT INTO `raid_plan` (`raidListId`, `start`, `createdFrom`) VALUES (:raidListId, :start, :createdFrom);",
            args: [
                "raidListId"  => $raidListId,
                "start"       => $start,
                "createdFrom" => $createdFrom,
            ]
        );
    }
}
