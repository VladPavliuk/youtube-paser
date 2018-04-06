<?php

class MainController extends Controller
{
    public function indexAction()
    {
        echo(json_encode(['kus' => 'ne_kus']));
    }
}