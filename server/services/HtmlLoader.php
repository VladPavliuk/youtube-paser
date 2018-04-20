<?php

namespace Services;

class HtmlLoader
{
    public function loadHtml($url): string
    {
        return file_get_contents($url);
    }
}