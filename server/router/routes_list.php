<?php

return [
    'GET:search/([a-zA-Z|\d]+)' => 'Main/search/$1',
    'GET:match-with-exists/([a-zA-Z|\d]+)' => 'Main/matchWithExistingQueries/$1',
    'GET:get-query-info/([a-zA-Z|\d]+)' => 'Main/matchWithExistingQueries/$1',
    'GET:' => 'Main/index',
];