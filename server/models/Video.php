<?php

class Video extends Model implements IStandardActions
{
    public function index()
    {
        $queriesList = [];

        $query = db()->prepare("SELECT * FROM search_queries_videos");
        $query->execute();

        while ($row = $query->fetch()) {
            $queriesList[] = [
                'id' => $row['id'],
                'title' => $row['video_title'],
                'mark' => $row['video_mark'],
                'description' => $row['video_description'],
                'search_query_id' => $row['search_query_id'],
            ];
        }

        return $queriesList;
    }

    public function store($item)
    {
        $query = db()->prepare("INSERT INTO search_queries_videos (search_query_id, video_title, video_mark, video_description) 
                      VALUES(:search_query_id, :video_title, :video_mark, :video_description)");

        $query->execute([
            ':search_query_id' => $item['query_id'],
            ':video_title' => $item['title'],
            ':video_mark', $item['mark'],
            ':video_description', $item['description']
        ]);

        return true;
    }

    public function show($id)
    {
        $item = [];
        $query = db()->prepare("SELECT * FROM search_queries_videos WHERE id = :id");
        $query->execute([
            ':id' => $id
        ]);

        while ($row = $query->fetch()) {
            $item = [
                'id' => $row['id'],
                'title' => $row['video_title'],
                'mark' => $row['video_mark'],
                'description' => $row['video_description']
            ];
        }

        return $item;
    }

    public function update($id, $item)
    {

    }

    public function destroy($id)
    {

    }
}