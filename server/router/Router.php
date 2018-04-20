<?php

namespace Router;

/**
 * Class Router execute running controllers and action.
 * Based on request URI.
 *
 */
class Router
{
    protected $analyzerURI;
    protected $analyzerInnerPath;

    /**
     * Start router
     *
     * Router constructor.
     */
    public function __construct() {
       $this->analyzerURI = new AnalyzerURI();
       $this->analyzerInnerPath = new AnalyzerInnerPath();
    }

    public function run()
    {
        $singleRoute = $this->analyzerURI->matchRoute();
        $this->analyzerInnerPath->defineInnerPath($singleRoute);

        $this->runActionMethod(
            $this->analyzerInnerPath->getControllerObject(),
            $this->analyzerInnerPath->getActionMethodName(),
            $this->analyzerInnerPath->getActionParameters()
        );
    }

    /**
     * Run action method if all OK
     *
     * @param $controllerObj
     * @param $actionMethod
     * @param $actionParameters
     */
    private function runActionMethod($controllerObj, $actionMethod, $actionParameters)
    {
        call_user_func_array([$controllerObj, $actionMethod], $actionParameters);
    }
}