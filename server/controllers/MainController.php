<?php

class MainController extends Controller
{
    public function searchAction($searchString)
    {
        $result = Container::get('youtubeParser')->getVideos($searchString);
        $this->mainModel->saveResult($searchString, $result);

        return Container::get('response')->json($result);
    }

    public function matchWithExistingQueriesAction($searchString)
    {
        return Container::get('response')->json(
            $this->mainModel->getMatchedQueries($searchString)
        );
    }

    public function indexAction()
    {
        return Container::get('response')->json(['asd' => 'asd']);
    }
}