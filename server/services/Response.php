<?php

class Response
{
    public function json($responseBody)
    {
        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: PUT, GET, POST");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

        echo(json_encode($responseBody));
        return;
    }

}