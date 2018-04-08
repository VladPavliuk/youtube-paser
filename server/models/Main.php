<?php

class Main
{
    public function saveResult($searchString, $result)
    {
        $previousQuery = $this->checkIsSearchQueryExists($searchString);
        $queryId = $previousQuery ? $previousQuery["id"] : $this->saveQuery($searchString);

        foreach ($result as $video) {
            $this->saveVideo($video, $queryId);
        }
    }

    private function saveVideo($video, $queryId)
    {
        $connection = Container::get('databaseConnection')->get();
        $query = $connection->prepare("INSERT INTO search_queries_videos (search_query_id, video_title, video_mark, video_description) 
                      VALUES(:search_query_id, :video_title, :video_mark, :video_description)");

        $query->bindParam(':search_query_id', $queryId);
        $query->bindParam(':video_title', $video['title']);
        $query->bindParam(':video_mark', $video['mark']);
        $query->bindParam(':video_description', $video['description']);

        $result = $query->execute();

//        if (!$result) {
//            echo '<br>';
//            print_r($query);
//            echo '<br>';
//            print_r($video);
//            echo '<br>';
//            echo $queryId;
//            echo '<br>';
//            exit('error while inserting query result');
//        }
    }

    private function checkIsSearchQueryExists($searchQuery)
    {
        $connection = Container::get('databaseConnection')->get();
        $query = $connection->prepare("SELECT * FROM search_queries WHERE search_query = :search_query");

        $query->execute([
            ':search_query' => $searchQuery
        ]);

        return $query->rowCount() > 0 ? $query->fetch() : false;
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