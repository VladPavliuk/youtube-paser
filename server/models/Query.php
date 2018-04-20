<?php

namespace Models;

use Models\Interfaces\IStandardActions;

class Query extends Model implements IStandardActions
{
    public function index()
    {
        $queriesList = [];

        $query = db()->prepare("SELECT * FROM search_queries");
        $query->execute();

        while ($row = $query->fetch()) {
            $queriesList[] = [
                'id' => $row['id'],
                'value' => urldecode($row['search_query'])
            ];
        }

        return $queriesList;
    }

    public function store($item)
    {
        $query = db()->prepare("INSERT INTO search_queries (search_query) VALUE (:search_query)");
        $query->execute([
            'search_query' => $item['title']
        ]);

        return true;
    }

    public function show($id)
    {
        $item = [];
        $query = db()->prepare("SELECT * FROM search_queries WHERE id = :id");
        $query->execute([
            ':id' => $id
        ]);

        while ($row = $query->fetch()) {
            $item = [
                'id' => $row['id'],
                'value' => urldecode($row['search_query'])
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