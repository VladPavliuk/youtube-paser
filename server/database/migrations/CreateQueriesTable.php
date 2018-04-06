<?php

class CreateQueriesTable
{
    public static function run()
    {
        return 'CREATE TABLE queries (id INTEGER, Query VARCHAR(255)) UNIQUE PRIMARY INDEX(id);';
    }
}