<?php

class CreateSearchQueriesVideosTable
{
    public static function run()
    {
        $query = Container::get('databaseConnection')->get()
            ->prepare('CREATE TABLE search_queries_videos (
                                  id INT NOT NULL AUTO_INCREMENT,
                                  video_title VARCHAR(255),
                                  video_mark DOUBLE,
                                  video_description TEXT,
                                  search_query_id INT NOT NULL, 
                                  PRIMARY KEY (id), 
                                  FOREIGN KEY (search_query_id) REFERENCES search_queries(id) ,
                                  CONSTRAINT unique_index UNIQUE (video_title, search_query_id))
                                ');
        $query->execute();
    }
}