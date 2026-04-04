<?php

class RaidController extends MainController
{
    public function getRaidList()
    {
        echo json_encode($this->RaidListModel->selectAll());
    }

    public function getRaidPlan()
    {
        $selectRaidPlan = $this->RaidPlanModel->selectAll();
        $selectRaidList = $this->RaidListModel->selectAll();

        $currentDatetime = new DateTime();
        $dateFormat      = "Y-m-d";
        $data            = [];

        // get raidplan data from current date or later
        foreach ($selectRaidPlan as $i => $raidPlan) {
            $startDatetime = new DateTime($raidPlan["start"]);

            if ($startDatetime->format($dateFormat) >= $currentDatetime->format($dateFormat)
                && (int) $raidPlan["isDeleted"] === 0) {

                $data[$i] = $raidPlan;
                // datetime output format
                $data[$i]["start"] = WEEK_DAYS[(int) $startDatetime->format("w")] . " " . $startDatetime->format("- d.m. | H:i");
            }
        }

        // get raid name and mode data from raidlist to current raidplan
        foreach ($data as $i => $raidPlan) {

            foreach ($selectRaidList as $raidList) {
                if ((int) $raidPlan["raidListId"] === (int) $raidList["id"]
                    && (int) $raidList["isDeleted"] === 0) {

                    $data[$i]["name"] = $raidList["name"];
                    $data[$i]["mode"] = $raidList["mode"];
                }
            }
        }

        echo json_encode($data);
    }

    public function getCurrentRaidEntrys()
    {
        $currentDatetime = new DateTime();

        $currentEntrys = [];

        /* get entrys from raidplan there start datetime is greater or equal to current datetime */
        foreach ($this->RaidPlanModel->selectAll() as $plan) {
            $startDatetime = new DateTime($plan["start"]);

            foreach ($this->RaidEntryModel->selectAll() as $entry) {

                if ($startDatetime->format("Y-m-d") >= $currentDatetime->format("Y-m-d")
                    && $plan["isDeleted"] === 0
                    && $entry["raidPlanId"] === $plan["id"]
                    && $entry["isDeleted"] === 0) {

                    $currentEntrys[] = $entry;
                }
            }
        }

        echo json_encode($currentEntrys);
    }

    public function createRaidPlan()
    {
        $req  = file_get_contents(PHP_INPUT);
        $data = json_decode($req, true);

        $raidListId  = (int) trim($data["raidListId"]);
        $startDate   = trim($data["startDate"]);
        $startTime   = trim($data["startTime"]);
        $createdFrom = trim($data["createdFrom"]);

        if ($raidListId === 0 || $startDate === "" || $startTime === "" || $createdFrom === "") {
            throw new Exception("Create Raid Plan: RaidListId or StartDate or StartTime or CreatedFrom is empty!");
        }

        $startDatetime   = new DateTime("$startDate $startTime");
        $currentDatetime = new DateTime();

        if ($startDatetime < $currentDatetime) {
            $this->Message->setMessage("In der Vergangenheit kann kein Raid geplant werden!", true);

            echo json_encode($this->Message->getMessage());
            return;
        }

        $insertRaidPlan = $this->RaidPlanModel->insertRaidPlan(
            $raidListId,
            $startDatetime->format("Y-m-d H:i:s"),
            $createdFrom
        );

        if (! $insertRaidPlan) {
            $this->Message->setMessage("Beim erstellen des Raidplans ist ein Fehler aufgetreten!", true);

            echo json_encode($this->Message->getMessage());
            return;
        }

        $this->Message->setMessage("Der Raidplan wurde erfolgreich erstellt!", false);

        echo json_encode($this->Message->getMessage());
    }

    public function enterRaid()
    {
        $req  = file_get_contents(PHP_INPUT);
        $data = json_decode($req, true);

        $user          = trim($data["user"]);
        $raidPlanId    = (int) trim($data["raidPlanId"]);
        $characterName = trim($data["characterName"]);
        $characterRole = trim($data["characterRole"]);
        $classListId   = (int) trim($data["classListId"]);

        $currentDatetime = new DateTime();

        if ($user === "" || $raidPlanId === 0 || $characterName === "" || $characterRole === "" || $classListId === 0) {
            throw new Exception("Enter Raid: User or RaidPlanId or CharacterName or CharacterRole or ClassListId is empty!");
        }

        /* check if raid has already started */
        foreach ($this->RaidPlanModel->selectAll() as $raidPlan) {
            if ($raidPlanId === (int) $raidPlan["id"]) {
                $startRaid = new DateTime($raidPlan["start"]);

                if ($currentDatetime->format("Y-m-d H:i:s") >= $startRaid->format("Y-m-d H:i:s")) {
                    $this->Message->setMessage("Dieser Raid hat bereits begonnen!", true);

                    echo json_encode($this->Message->getMessage());
                    return;
                }

                break;
            }
        }

        /* check if user is already in raid */
        foreach ($this->RaidEntryModel->selectAll() as $raidEntry) {
            if ((int) $raidEntry["raidPlanId"] === (int) $raidPlan["id"]) {

                if ($user === $raidEntry["user"] && $raidEntry["isDeleted"] === 0) {
                    $this->Message->setMessage("Du bist bereits in diesem Raid!", true);

                    echo json_encode($this->Message->getMessage());
                    return;
                }
            }
        }

        /* get class color */
        $classColor = "";

        foreach ($this->ClassListModel->selectAll() as $classList) {
            if ($classListId === (int) $classList["id"]) {
                $classColor = $classList["color"];
                break;
            }
        }

        if ($classColor === "") {
            throw new Exception("Enter Raid: ClassColor is empty!");
        }

        /* insert raid entry */
        $insert = $this->RaidEntryModel->insertRaid(
            $user,
            $raidPlanId,
            $characterName,
            $characterRole,
            $classColor
        );

        if ($insert) {
            $this->Message->setMessage("Du bist dem Raid erfolgreich beigetreten!", false);

            echo json_encode($this->Message->getMessage());
        }
    }
}
