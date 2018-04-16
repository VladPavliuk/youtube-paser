<?php

class MainController extends Controller
{
    public function searchAction($searchString)
    {
        $result = Container::get('youtubeParser')->getVideos($searchString);
        $result = Container::get('youtubeParser')->parseVideosDescriptionToHTML($result);

        return response()->json($result);
    }

    public function matchWithExistingQueriesAction($searchString)
    {
        return response()->json($this->mainModel->getMatchedQueries($searchString));
    }

    public function allSearchQueriesAction()
    {
        return response()->json($this->mainModel->getAllSearchQueriesAction());
    }

    public function getQueryInfoAction($queryString)
    {
        return response()->json($this->mainModel->getVideosInfoBySearchQuery($queryString));
    }
}