<?php

class HtmlParser
{
    protected $domModule;

    public function __construct()
    {
        $this->domModule= new DOMDocument;
    }

    public function getModule()
    {
        return $this->domModule;
    }


}