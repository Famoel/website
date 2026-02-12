<?php
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

// FRAMEWORK
require_once "vendor/autoload.php";
$f3 = \Base::instance();

// CONFIG
$f3->config("config.ini");
$f3->config("db.ini");

require_once "./src/settings.php";

// TIMEZONE
date_default_timezone_set("Europe/Berlin");

// DB
$f3->set(DATABASE,
    new DB\SQL($f3->get("db.DSN"), $f3->get("db.USER"), $f3->get("db.PASS"))
);

// ROUTES
$f3->route("POST /auth/register-user", "AuthController->registerUser");

$f3->run();
