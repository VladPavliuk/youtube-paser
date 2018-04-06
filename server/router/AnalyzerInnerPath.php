<?php

/**
 * Trait AnalyzerControllerConnect
 *
 * Require array of inner path elements name
 * Define: controllers, action, parameters
 *
 */
class AnalyzerInnerPath
{
    // Path to folder with controllers
    private $controllersFolderPath = './controllers/';

    //> list of initial path variables
    private $controllerObj = null;
    private $actionMethod = "indexAction";
    private $actionParameters = [];
    //<

    //> List of error messages
    private $controllerCoreClassError = "Файлу із головним класом контролер не знайдено";
    private $controllerFileError = "Файлу із контролером не знайдено";
    private $controllerClassError = "Клас контролер не знайдено";
    private $actionMethodError = "Метод в контролері не знайдено";
    //<

    /**
     * Define Controller, action, parameters
     *
     * @param $innerPathArray
     */
    public function defineInnerPath($innerPathArray)
    {
        $innerPathArray = explode('/', $innerPathArray);

        $this->defineControllerClass(array_shift($innerPathArray));
        $this->defineActionMethod(array_shift($innerPathArray));
        $this->defineActionParameters($innerPathArray);
    }

    private function defineControllerClass($controllerClass)
    {
        $controllerClass = ucfirst($controllerClass);
        $controllerClass = $controllerClass . 'Controller';

        $this->includeCoreControllerFile();
        $this->includeControllerFile($controllerClass);
        $this->getControllerObj($controllerClass);
    }

    public function getControllerObject()
    {
        return $this->controllerObj;
    }

    public function getActionMethodName()
    {
        return $this->actionMethod;
    }

    public function getActionParameters()
    {
        return $this->actionParameters;
    }

    /**
     * Include file with parent controllers class
     * which will extends to every controllers class
     *
     */
    private function includeCoreControllerFile()
    {
        // Define full path
        $coreControllerFile = $this->controllersFolderPath . 'Controller.php';

        if (file_exists($coreControllerFile)) {
            require_once($coreControllerFile);
        } else {
            exit($this->controllerCoreClassError);
        }
    }

    /**
     * Include file with Controller class file
     *
     */
    private function includeControllerFile($controllerClass)
    {
        // Define full path
        $controllerFile = $this->controllersFolderPath . $controllerClass . '.php';

        // Checking Controller file exists.
        if (file_exists($controllerFile)) {
            require_once($controllerFile);
        } else {
            exit($this->controllerFileError);
        }
    }

    /**
     * Create Controller class object
     *
     */
    private function getControllerObj($controllerClass)
    {
        // Checking class exists in file.
        if (class_exists($controllerClass)) {
            $this->controllerObj = new $controllerClass();
        } else {
            // Some went wrong!
            exit($this->controllerClassError);
        }
    }

    private function defineActionMethod($actionMethod)
    {
        $actionMethod = ucfirst($actionMethod);
        $actionMethod = $actionMethod . 'Action';

        // Checking action exists in object.
        if (method_exists($this->controllerObj, $actionMethod)) {
            $this->actionMethod = $actionMethod;
        } else {
            // Some went wrong!
            exit($this->actionMethodError);
        }
    }

    private function defineActionParameters($actionParameters)
    {
        $this->actionParameters = $actionParameters;
    }
}