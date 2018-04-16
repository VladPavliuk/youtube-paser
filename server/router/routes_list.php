<?php

return [
    'POST:queries' => 'Queries/store',
    'GET:queries' => 'Queries/index',
    'GET:queries/(.+)' => 'Queries/show/$1',

    'POST:search-videos/(.+)' => 'Videos/getVideosByQuery/$1',

    'GET:all-search-queries' => 'Main/allSearchQueries',
    'GET:search/(.+)' => 'Main/search/$1',
    'GET:match-with-exists/(.+)' => 'Main/matchWithExistingQueries/$1',
    'GET:get-query-info/(.+)' => 'Main/getQueryInfo/$1',
    'GET:' => 'Main/index',
];