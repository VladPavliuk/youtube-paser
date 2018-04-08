<?php

class CreateQueriesResultsTable
{
    public static function run()
    {
        $query = Container::get('databaseConnection')->get()
            ->prepare('CREATE TABLE queries_results (
                                  id INT NOT NULL AUTO_INCREMENT,
                                  title VARCHAR(255),
                                  mark DOUBLE,
                                  description TEXT,
                                  query_id INT NOT NULL, 
                                  PRIMARY KEY (id), 
                                  FOREIGN KEY (query_id) REFERENCES queries(id) ,
                                  CONSTRAINT unique_index UNIQUE (title, query_id))
                                ');
        $query->execute();
    }
}