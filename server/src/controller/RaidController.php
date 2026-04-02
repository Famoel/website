<?php

class RaidController extends MainController
{
    public function getRaidList()
    {
        echo json_encode($this->RaidListModel->selectAll());
    }

    public function createRaidPlan()
    {
        $req  = file_get_contents(PHP_INPUT);
        $data = json_decode($req, true);

        $raidListId  = trim($data["raidListId"]);
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

        $insertRaidPlan = $this->RaidPlanModel->insertRaidPlan($raidListId, $startDatetime->format("Y-m-d H:i:s"), $createdFrom);

        if (! $insertRaidPlan) {
            $this->Message->setMessage("Beim erstellen des Raidplans ist ein Fehler aufgetreten!", true);

            echo json_encode($this->Message->getMessage());
            return;
        }

        $this->Message->setMessage("Der Raidplan wurde erfolgreich erstellt!", false);

        echo json_encode($this->Message->getMessage());
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

    public function enterRaid()
    {
        $req  = file_get_contents(PHP_INPUT);
        $data = json_decode($req, true);

        var_dump($data);
    }
}
