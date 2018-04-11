<?php

class YoutubeParser
{
    protected $domain = 'https://www.youtube.com';
    protected $uriPrefix = '/results?search_query=';
    protected $htmlBody;
    protected $queryResult;

    protected $videosAmount = 10;
    protected $videos = [];
    protected $searchString;

    protected $htmlLoader;
    protected $domDocument;
    protected $domXPath;
    protected $mainModel;

    public function __construct($htmlLoader)
    {
        $this->htmlLoader = $htmlLoader;
        $this->domDocument = new DOMDocument;
        $this->mainModel = new Main;
    }

    public function parseVideosDescriptionToHTML($inputVideos)
    {
        $outputVideos = [];

        foreach ($inputVideos as $video) {
            $outputVideos[] = [
                'title' => $video['title'],
                'mark' => (int) $video['mark'] . '%',
                'description' => htmlspecialchars_decode($video['description'])
            ];
        }

        return $outputVideos;
    }

    public function getVideos($searchString)
    {
        $this->searchString = $this->searchStringToUrlFormat($searchString);

        $this->makeRequest();
        $this->generateDomTree();

        $this->openList();
        return $this->videos;
    }

    protected function openList()
    {
        $classname='yt-lockup-video';
        $nodes = $this->htmlBody->query("//*[contains(@class, '$classname')]/div/div/h3/a[contains(@class, 'yt-uix-tile-link')]");
//        $nodes = $this->htmlBody->query("//*[contains(@class, '$classname')]/div/div/div[contains(@class, 'yt-lockup-description')]");
        $i = 0;
        foreach($nodes as $node) {
            if(++$i > $this->videosAmount) break;
            $videoInDatabase = $this->mainModel->getVideoBySearchQuery($node->textContent, $this->searchString);

            if($videoInDatabase) {
                $this->addVideo($videoInDatabase['video_title'], htmlspecialchars_decode($videoInDatabase['video_description']), $videoInDatabase['video_mark']);
            } else {
                $this->openVideo($this->domain . $node->getAttribute('href'));
            }
        }
    }

    protected function openVideo($url)
    {
        $this->queryResult = $this->htmlLoader->loadHtml($url);
        $dom = new DOMDocument;
        $dom->loadHTML('<?xml encoding="utf-8" ?>' . $this->queryResult);
        $finder = new DomXPath($dom);

//        $classname="yt-uix-tile-link yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink";
        $nodes = $finder->query("//*[contains(@class, 'watch-title-container')]");
        foreach ($nodes as $node) {
            $title = $node->nodeValue;
        }

        $nodes = $finder->query("//*[contains(@id, 'eow-description')]");
        foreach ($nodes as $node) {
            $description = $node->C14N();
//            $description = substr($node->textContent,0, 50);
        }

        $nodes = $finder->query("//div[contains(@class, 'video-extras-sparkbar-likes')]");
        foreach ($nodes as $node) {
            $mark = (double) preg_replace("~width:\s*(\d+.\d+)%~", '$1', $node->getAttribute('style'));
        }

        $this->addVideo($title, $description, $mark);
        $this->mainModel->saveVideoWithSearchQuery(array_values(array_slice($this->videos, -1))[0], $this->searchString);
    }

    public function saveVideo($video, $searchQuery)
    {
        $this->mainModel->saveVideoWithSearchQuery($video, $searchQuery);
    }

    private function addVideo($title, $description, $mark)
    {
        $this->videos[] = [
            'title' => trim($title),
            'description' => htmlspecialchars($description),
            'mark' => $mark,
        ];
    }

    protected function generateDomTree()
    {
        $this->domDocument->loadHTML('<?xml encoding="utf-8" ?>' . $this->queryResult);
        $this->htmlBody = new DomXPath($this->domDocument);
    }

    protected function makeRequest()
    {
        $this->queryResult = $this->htmlLoader
            ->loadHtml($this->domain . $this->uriPrefix . $this->searchString);
    }

    protected function searchStringToUrlFormat($searchString)
    {
        $searchStringsArray = explode(' ', $this->removeExtraSpaces($searchString));

        return implode('+', $searchStringsArray);
    }

    protected function removeExtraSpaces($string)
    {
        return preg_replace('/\s+/', ' ', trim($string));
    }


}