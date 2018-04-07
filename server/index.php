<?php

require_once('./configs/db_config.php');
require_once("./database/DatabaseConnection.php");
require_once("./database/migrations/BootstrapMigrations.php");

require_once("./router/AnalyzerURI.php");
require_once("./router/AnalyzerInnerPath.php");
require_once('./router/Router.php');

BootstrapMigrations::run();

(new Router(
    new AnalyzerURI,
    new AnalyzerInnerPath
));