<?php

class Main
{
    public function saveResult($searchString, $result)
    {
        $queryId = $this->saveQuery($searchString);
            foreach ($result as $video) {
            $this->saveVideo($video, $queryId);
        }
    }

    private function saveVideo($video, $queryId)
    {
        $connection = Container::get('databaseConnection')->get();
        $query = $connection->prepare("INSERT INTO queries_results (query_id, title, mark, description) 
                      VALUES(:query_id, :video_title, :mark, :description)");
        $result = $query->execute([
            ':query_id' => $queryId,
            ':video_title' => $video['title'],
            ':mark' => $video['mark'],
            ':description' => $video['description']
        ]);

        if (!$result) {
            exit('error while inserting query result');
        }
    }

    private function checkIsVideoAlreadyExists($queryId, $videoTitle)
    {
        $connection = Container::get('databaseConnection')->get();
        $query = $connection->prepare("SELECT count(1) FROM queries_results WHERE query_id = {}");

        $result = $query->execute();
    }

    private function saveQuery($queryTitle)
    {
        $connection = Container::get('databaseConnection')->get();
        $query = $connection->prepare("INSERT INTO queries (query) VALUES(:query)");
        $result = $query->execute([
            ':query' => $queryTitle
        ]);
        if ($result) {
            return $connection->lastInsertId();
        }

        exit('error while inserting query');
    }
}