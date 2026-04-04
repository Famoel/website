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

    public function insertRaid(string $user, int $raidPlanId, string $characterName, string $characterRole, string $classColor): bool
    {
        $insert = $this->getDb()->exec(
            "INSERT
            INTO `raid_entry` (`raidPlanId`, `user`, `characterName`, `characterRole`, `classColor`)
            VALUES (:raidPlanId, :user, :characterName, :characterRole, :classColor)",
            args: [
                "raidPlanId"    => $raidPlanId,
                "user"          => $user,
                "characterName" => $characterName,
                "characterRole" => $characterRole,
                "classColor"    => $classColor,
            ],
        );

        return (bool) $insert;
    }
}
