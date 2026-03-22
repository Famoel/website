<?php
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS");

// framework
require_once "vendor/autoload.php";
$f3 = \Base::instance();

// config
require_once "./src/settings.php";
$f3->config("config.ini");
$f3->config("db.ini");

date_default_timezone_set("Europe/Berlin");

// database
$f3->set(DATABASE,
    new DB\SQL($f3->get("db.DSN"), $f3->get("db.USER"), $f3->get("db.PASS"))
);

/* ROUTES */

// auth
$f3->route("POST /auth/register-user", "AuthController->registerUser");
$f3->route("POST /auth/login-user", "AuthController->loginUser");

// session
$f3->route("POST /session/start", "SessionController->startSession");
$f3->route("POST /session/check", "SessionController->checkSession");

// chat
$f3->route("POST /chat/send", "ChatController->send");
$f3->route("GET /chat/data", "ChatController->getData");

// class list
$f3->route("GET /class-list/get-class-list", "ClassListController->getClassList");

// user character
$f3->route("POST /user-character/create-character", "UserProfileController->createCharacter");
$f3->route("GET /user-character/user-character-list", "UserProfileController->getUserCharacterList");

// planner | raid
$f3->route("GET /planer/raid/get-raid-list", "RaidController->getRaidList");

$f3->run();
