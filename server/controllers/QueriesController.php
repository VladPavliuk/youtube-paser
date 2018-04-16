<?php

class QueriesController extends Controller
{
    public function indexAction()
    {
        return response()->json($this->queryModel->index());
    }

    public function storeAction()
    {

    }

    public function showAction()
    {

    }

    public function updateAction()
    {

    }

    public function destroyAction()
    {

    }
}