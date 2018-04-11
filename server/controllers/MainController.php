<?php

class MainController extends Controller
{
    public function searchAction($searchString)
    {
        $result = Container::get('youtubeParser')->getVideos($searchString);
        $result = Container::get('youtubeParser')->parseVideosDescriptionToHTML($result);

        return Container::get('response')->json($result);
    }

    public function matchWithExistingQueriesAction($searchString)
    {
        return Container::get('response')->json(
            $this->mainModel->getMatchedQueries($searchString)
        );
    }

    public function getQueryInfoAction($queryString)
    {
        return Container::get('response')->json(
            $this->mainModel->getVideosInfoBySearchQuery($queryString)
        );
    }

    public function indexAction()
    {
        return Container::get('response')->json(['test' => 'test']);
    }
}