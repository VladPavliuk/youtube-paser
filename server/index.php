<?php

require_once('./configs/db_config.php');

require_once("./router/AnalyzerURI.php");
require_once("./router/AnalyzerInnerPath.php");
require_once('./router/Router.php');

(new Router(
    new AnalyzerURI,
    new AnalyzerInnerPath
));