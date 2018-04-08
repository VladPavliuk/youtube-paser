<?php

class CreateSearchQueriesTable
{
    public static function run()
    {
        $query = Container::get('databaseConnection')->get()
            ->prepare('CREATE TABLE search_queries (
                                  id INT NOT NULL AUTO_INCREMENT, 
                                  search_query VARCHAR(255), 
                                  PRIMARY KEY (id),
                                  CONSTRAINT unique_index UNIQUE (search_query)) 
                                ');
        $query->execute();
    }
}