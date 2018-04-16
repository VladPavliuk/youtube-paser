<?php

class Controller
{
    protected $mainModel;
    protected $queryModel;
    protected $videoModel;

    public function __construct()
    {
        $this->mainModel = new Main();
        $this->queryModel = new Query();
        $this->videoModel = new Video();
    }
}