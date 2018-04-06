<?php

class CreateQueriesTable
{
    public static function run()
    {
        $query = DatabaseConnection::get()->prepare('CREATE TABLE queries (id INTEGER, Query VARCHAR(255)) UNIQUE PRIMARY INDEX(id)');
        $query->execute();
    }
}