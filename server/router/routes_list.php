<?php

return [
    'POST:queries' => 'Main/',
    'GET:queries' => 'Queries/index',

    'GET:all-search-queries' => 'Main/allSearchQueries',
    'GET:search/(.+)' => 'Main/search/$1',
    'GET:match-with-exists/(.+)' => 'Main/matchWithExistingQueries/$1',
    'GET:get-query-info/(.+)' => 'Main/getQueryInfo/$1',
    'GET:' => 'Main/index',
];