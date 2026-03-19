<?php

class UserProfileController extends MainController
{
    public function createCharacter()
    {
        $req  = file_get_contents(PHP_INPUT);
        $data = json_decode($req, true);

        $username      = trim($data["username"]);
        $charaktername = trim($data["charaktername"]);
        $classListId   = trim($data["classListId"]);
        $characterTyp  = trim($data["characterTyp"]);

        if ($charaktername === "" || $classListId === 0 || $characterTyp === "" || $username === "") {
            throw new Exception("User Profile, create Character: Username or Charaktername or ClassListId or CharacterTyp is empty!");
        }

        if (strlen($charaktername) > CHARACTER_NAME_LENGTH) {
            $this->Message->setMessage("Der Charaktername darf maximal " . CHARACTER_NAME_LENGTH . " Zeichen lang sein!", true);

            echo json_encode($this->Message->getMessage());
            return;
        }

        if ($this->UserCharacterListModel->checkIfCharacterExists($charaktername)) {
            $this->Message->setMessage("Der Charaktername existiert bereits!", true);

            echo json_encode($this->Message->getMessage());
            return;
        }

        if ($characterTyp === "main") {
            if ($this->UserCharacterListModel->checkIfUserHasAlreadyMainCharacter($username)) {
                $this->Message->setMessage("Du hast bereits einen Hauptcharakter!", true);

                echo json_encode($this->Message->getMessage());
                return;
            }
        }

        $isValid = $this->UserCharacterListModel->insertCharacter($charaktername, $username, $characterTyp, $classListId);

        if ($isValid) {
            $this->Message->setMessage("Charakter erfolgreich eingetragen!", false);
        }

        echo json_encode([ ...$this->Message->getMessage(), "isValid" => $isValid]);
    }

    public function userCharacterList()
    {
        if (! isset($_GET["username"])) {
            throw new Exception("User Profile, user Character List: Username is empty!");
        }

        $username = trim($_GET["username"]);

        echo json_encode($this->UserCharacterListModel->getCharactersFromUser($username));
    }
}
