<?php

class MainController extends Controller
{
    public function searchAction($searchString)
    {
        $result = Container::get('youtubeParser')->getVideos($searchString);
        return Container::get('response')->json($result);
    }

    public function indexAction()
    {


//        Container::get('htmlLoader')->setUrl('https://www.youtube.com/results?search_query=php+youtube+parser');
//        print_r(htmlspecialchars(Container::get('htmlLoader')->loadHtml()));

//        $dom = new DOMDocument;
/*        $dom->loadHTML('<?xml encoding="utf-8" ?>' . Container::get('htmlLoader')->loadHtml());*/
//
//        $finder = $domx = new DomXPath($dom);
//        $classname="yt-uix-tile-link yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink";
//        $nodes = $finder->query("//*[contains(@class, '$classname')]");
////        print_r($nodes);
//
//        foreach($nodes as $node) {
//            echo($node->nodeValue);
//            echo '<br>';
//
//        }

//        foreach($dom->getElementsByTagName('a') as $link) {
//            echo $link->getAttribute('href');
//            echo "<br />";
//        }


//        $htmlParser = Container::get('htmlParser');
//        print_r($htmlParser->getModule);


        return Container::get('response')->json(['asd' => 'asd']);
    }
}