<?php

class HtmlLoader
{
    protected $url;

    public function __construct(string $url = '')
    {
        $this->setUrl($url);
    }

    public function setUrl(string $url): void
    {
        $this->url = $url;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function loadHtml(): string
    {
        return file_get_contents($this->url);
    }
}