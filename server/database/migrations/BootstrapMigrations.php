<?php

require_once('./database/migrations/CreateSearchQueriesTable.php');
require_once('./database/migrations/CreateSearchQueriesVideosTable.php');

class BootstrapMigrations
{
    public function run()
    {
        CreateSearchQueriesTable::run();
        CreateSearchQueriesVideosTable::run();
    }
}