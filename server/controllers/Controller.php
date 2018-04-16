<?php

class Controller
{
    protected $mainModel;
    protected $queryModel;

    public function __construct()
    {
        $this->mainModel = new Main();
        $this->queryModel = new Query();
    }
}