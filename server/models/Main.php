<?php

class Main
{
    public function getMatchedQueries($searchString)
    {
        $connection = Container::get('databaseConnection')->get();
        $query = $connection->prepare("SELECT * FROM search_queries WHERE search_query LIKE :search_query");

        $query->execute([
            ':search_query' => '%' . $searchString . '%'
        ]);

        $matchedQueries = [];
        while($row = $query->fetch()) {
            $matchedQueries[] = [
                'id' => $row['id'],
                'value' => $row['search_query']
            ];
        }

        return $matchedQueries;
    }

    public function getVideosInfoBySearchQuery($searchQuery)
    {
        $connection = Container::get('databaseConnection')->get();
        $searchQueryObject = $this->checkIsSearchQueryExists($searchQuery);

        $query = $connection->prepare("SELECT * FROM search_queries_videos WHERE search_query_id = :search_query_id");
        $query->execute([
            ':search_query_id' => $searchQueryObject["id"]
        ]);

        return $query->fetchAll();
    }

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

        $query->execute();
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