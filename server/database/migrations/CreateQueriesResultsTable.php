<?php

class CreateQueriesResultsTable
{
    public static function run()
    {
        $query =  Container::get('databaseConnection')->get()
            ->prepare('CREATE TABLE queries_results (
                                  id INT NOT NULL AUTO_INCREMENT,
                                  query_id INT NOT NULL, 
                                  PRIMARY KEY (id), 
                                  FOREIGN KEY (query_id) REFERENCES queries(id) ) 
                                ');
        $query->execute();
    }
}