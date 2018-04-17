<?php

return [
    'POST:queries' => 'Queries/store',
    'GET:queries' => 'Queries/index',
    'GET:queries/(.+)' => 'Queries/show/$1',

    'POST:search-videos/(.+)' => 'Videos/searchVideos/$1',
    'GET:get-videos-by-query/(.+)' => 'Videos/getVideosByQuery/$1'
];