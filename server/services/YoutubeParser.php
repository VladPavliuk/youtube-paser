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

    public function __construct($htmlLoader)
    {
        $this->htmlLoader = $htmlLoader;
        $this->domDocument = new DOMDocument;
    }

    public function getVideos($searchString)
    {
        $this->searchString = $this->searchStringToUrlFormat($searchString);

        $this->makeRequest();
        $this->generateDomTree();

//        print_r($this->htmlBody);
        $this->getTitles();
        return $this->videos;
    }

    protected function getTitles()
    {
        $classname="yt-uix-tile-link yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink";
        $nodes = $this->htmlBody->query("//*[contains(@class, '$classname')]");

        foreach($nodes as $node) {
            echo($node->nodeValue);
            echo '<br>';

        }
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