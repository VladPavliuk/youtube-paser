<?php

class MainController extends Controller
{
    public function indexAction()
    {
        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        echo(json_encode(['kus' => 'ne_kus']));
    }
}