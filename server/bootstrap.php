<?php

require_once('./configs/db_config.php');
require_once("./database/DatabaseConnection.php");
require_once("./database/migrations/BootstrapMigrations.php");

require_once("./models/Main.php");

require_once("./router/AnalyzerURI.php");
require_once("./router/AnalyzerInnerPath.php");
require_once('./router/Router.php');
require_once('./services/HtmlLoader.php');
require_once('./services/HtmlParser.php');
require_once('./services/YoutubeParser.php');
require_once('./services/Response.php');

require_once('./Container.php');

Container::set('databaseConnection', new DatabaseConnection);
Container::set('htmlLoader', new HtmlLoader);
Container::set('htmlParser', new HtmlParser);
Container::set('youtubeParser', new YoutubeParser(
        Container::get('htmlLoader'))
);
Container::set('bootstrapMigrations', new BootstrapMigrations);
Container::set('response', new Response);
Container::set('router', new Router);

/**
 * Run the migrations
 *
 */
Container::get('bootstrapMigrations')->run();

/**
 * Run the app
 *
 */
Container::get('router')->run();
