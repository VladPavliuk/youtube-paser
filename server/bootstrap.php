<?php

use Services\YoutubeParser;
use Services\HtmlLoader;
use Services\Response;
use Services\Request;
use Router\Router;

require_once('./vendor/autoload.php');
require_once('./Container.php');

Container::set('databaseConnection', new DatabaseConnection);
Container::set('htmlLoader', new HtmlLoader);
Container::set('youtubeParser', new YoutubeParser(
        Container::get('htmlLoader'))
);
Container::set('bootstrapMigrations', new BootstrapMigrations);
Container::set('response', new Response);
Container::set('request', new Request);
Container::set('router', new Router);

/**
 * Register helpers methods
 *
 */
require_once('./helper.php');

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
