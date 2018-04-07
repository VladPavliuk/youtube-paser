<?php

class Main
{
    public function saveResult($searchString, $result)
    {
        print_r($result[0]);


        $connection = Container::get('databaseConnection')->get();
        $connection->prepare('INSERT INTO queries (query) VALUES(' + $result + ')');
        $connection->execute();
        exit('databaseConnection');
    }

}