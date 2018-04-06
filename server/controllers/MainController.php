<?php

class MainController extends Controller
{
    public function indexAction()
    {
        print_r(DatabaseConnection::get());
    }
}