<?php

class DatabaseConnection
{
    public function get()
    {
        $dbParams = include('./configs/db_config.php');

        $dbHost = $dbParams['host'];
        $dbName = $dbParams['database'];
        $dbUser = $dbParams['user'];
        $dbPassword = $dbParams['password'];

        return new PDO("mysql:host={$dbHost};dbname={$dbName}", $dbUser, $dbPassword);
    }
}