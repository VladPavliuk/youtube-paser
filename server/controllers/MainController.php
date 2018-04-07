<?php

class MainController extends Controller
{
    public function indexAction()
    {
        Container::get('htmlLoader')->setUrl('https://www.youtube.com/results?search_query=php+youtube+parser');
        print_r(Container::get('htmlLoader')->loadHtml());

//        header('Content-type: application/json');
//        header("Access-Control-Allow-Origin: *");
//        header("Access-Control-Allow-Methods: PUT, GET, POST");
//        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//        echo(json_encode(['kus' => 'ne_kus']));
    }
}