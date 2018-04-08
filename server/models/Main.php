<?php

class Main
{
    public function saveResult($searchString, $result)
    {
        print_r($this->checkIsSearchQueryExists($searchString));
//        $queryId = $this->saveQuery($searchString);
//            foreach ($result as $video) {
//            $this->saveVideo($video, $queryId);
//        }
    }

    private function saveVideo($video, $queryId)
    {
        $connection = Container::get('databaseConnection')->get();
        $query = $connection->prepare("INSERT INTO search_queries_videos (search_query_id, video_mark, video_mark, video_description) 
                      VALUES(:search_query_id, :video_title, :video_mark, :video_description)");
        $result = $query->execute([
            ':search_query_id' => $queryId,
            ':video_title' => $video['title'],
            ':video_mark' => $video['mark'],
            ':video_description' => $video['description']
        ]);

        if (!$result) {
            exit('error while inserting query result');
        }
    }

    private function checkIsSearchQueryExists($searchQuery)
    {
        $connection = Container::get('databaseConnection')->get();
        $query = $connection->prepare("SELECT * FROM search_queries WHERE search_query = :search_query");
        $result = $query->execute([
            ':search_query' => $searchQuery
        ]);
        return $result === 1 ? $result->fetchAll() : false;
    }

    private function saveQuery($queryTitle)
    {
        $connection = Container::get('databaseConnection')->get();
        $query = $connection->prepare("INSERT INTO search_queries (search_query) VALUES(:search_query)");
        $result = $query->execute([
            ':search_query' => $queryTitle
        ]);
        if ($result) {
            return $connection->lastInsertId();
        }

        exit('error while inserting query');
    }
}