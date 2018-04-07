<?php

class CreateQueriesTable
{
    public static function run()
    {
        $query =  Container::get('databaseConnection')->get()
            ->prepare('CREATE TABLE queries (
                                  id INT NOT NULL AUTO_INCREMENT, 
                                  query VARCHAR(255), 
                                  PRIMARY KEY (id)) 
                                ');
        $query->execute();
    }
}