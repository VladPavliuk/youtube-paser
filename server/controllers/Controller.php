<?php

class Controller
{
    protected $mainModel;

    public function __construct()
    {
        $this->mainModel = new Main();
    }
}