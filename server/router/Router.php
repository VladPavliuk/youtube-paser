<?php

/**
 * Class Router execute running controllers and action.
 * Based on request URI.
 *
 */
class Router
{
    /**
     * Start router
     *
     * Router constructor.
     * @param AnalyzerURI $analyzerURI
     * @param AnalyzerInnerPath $analyzerInnerPath
     */
    public function __construct(
        AnalyzerURI $analyzerURI,
        AnalyzerInnerPath $analyzerInnerPath
    ) {
        $singleRoute = $analyzerURI->matchRoute();
        $analyzerInnerPath->defineInnerPath($singleRoute);

        $this->runActionMethod(
            $analyzerInnerPath->getControllerObject(),
            $analyzerInnerPath->getActionMethodName(),
            $analyzerInnerPath->getActionParameters()
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