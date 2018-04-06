<?php

/**
 * Trait AnalyzerURI
 * return array of inner path elements name
 *
 */
class AnalyzerURI
{
    // Path to routes array
    private $routesPath = "./router/routes_list.php";

    //> List of error messages
    private $routesArrayError = "Масиву із роутерами не було знайдено";
    private $routeError = "Роут не знайдено";
    //<

    /**
     * Define single route
     *
     * @return array
     */
    public function matchRoute()
    {
        $requestUri = $this->getHttpMethod() . ":" . $this->getURI();

        foreach ($this->getRoutesArray() as $routeURI => $routePath) {
            if (preg_match("~^$routeURI$~", $requestUri)) {
                return preg_replace("~$routeURI~", $routePath, $requestUri);
            }
        }

        exit($this->routeError);
    }

    /**
     * Get string of request URI.
     *
     * @return string
     */
    private function getURI()
    {
        $requestUri = $_SERVER['REQUEST_URI'];

        if (isset($requestUri)) {
            return trim($requestUri, '/');
        }
    }

    /**
     * Get Http request method
     *
     * @return string
     */
    private function getHttpMethod()
    {
        return $_SERVER["REQUEST_METHOD"];
    }

    /**
     * Get array of routes.
     *
     * @return array
     */
    private function getRoutesArray()
    {
        if (file_exists($this->routesPath)) {
            return include($this->routesPath);
        }
        // No routes file
        exit($this->routesArrayError);
    }
}