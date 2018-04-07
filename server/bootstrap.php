<?php

require_once('./configs/db_config.php');
require_once("./database/DatabaseConnection.php");
require_once("./database/migrations/BootstrapMigrations.php");

require_once("./router/AnalyzerURI.php");
require_once("./router/AnalyzerInnerPath.php");
require_once('./router/Router.php');
require_once('./services/HtmlLoader.php');

require_once('./Container.php');

Container::set('htmlLoader', new HtmlLoader);
Container::set('bootstrapMigrations', new BootstrapMigrations);
Container::set('router', new Router);

/**
 * Run the app
 *
 */
Container::get('router')->run();