<?php

class VideosController extends Controller
{
    public function indexAction()
    {
        return response()->json($this->videoModel->index());
    }

    public function getVideosByQueryAction($queryId)
    {
        return response()->json($this->videoModel->getByQueryId($queryId));
    }

    public function searchVideosAction($query)
    {
        $result = Container::get('youtubeParser')->getVideos($query);
        $result = Container::get('youtubeParser')->parseVideosDescriptionToHTML($result);

        return response()->json($result);

    }

    public function showAction($id)
    {
        return response()->json($this->queryModel->show($id));
    }
}