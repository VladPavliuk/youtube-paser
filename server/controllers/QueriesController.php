<?php

namespace Controllers;

class QueriesController extends Controller
{
    public function indexAction()
    {
        return response()->json($this->queryModel->index());
    }

    public function storeAction()
    {
        return response()->json($this->queryModel->store([
            'title' => request()->getPostsVariables()['title']
        ]));
    }

    public function showAction($id)
    {
        return response()->json($this->queryModel->show($id));
    }
}