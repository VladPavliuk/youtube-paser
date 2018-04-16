<?php

class VideosController extends Controller
{
    public function indexAction()
    {
        return response()->json($this->videoModel->index());
    }

    public function getVideosByQueryAction($query)
    {
        $result = Container::get('youtubeParser')->getVideos($query);
        $result = Container::get('youtubeParser')->parseVideosDescriptionToHTML($result);

        return response()->json($result);
    }

    public function showAction($id)
    {
        return response()->json($this->queryModel->show($id));
    }

    public function destroyAction()
    {

    }
}