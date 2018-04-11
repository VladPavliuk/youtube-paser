<?php

return [
    'GET:search/(.+)' => 'Main/search/$1',
    'GET:match-with-exists/(.+)' => 'Main/matchWithExistingQueries/$1',
    'GET:get-query-info/(.+)' => 'Main/getQueryInfo/$1',
    'GET:' => 'Main/index',
];