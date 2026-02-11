<?php
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

require_once "vendor/autoload.php";
$f3 = \Base::instance();

$f3->config("config.ini");
$f3->config("db.ini");

$f3->set("DB",
    new DB\SQL($f3->get("db.DSN"), $f3->get("db.USER"), $f3->get("db.PASS"))
);

// ROUTES
$f3->route("POST /auth/register-user", "AuthController->registerUser");

$f3->run();
