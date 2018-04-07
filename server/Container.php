<?php

class Container
{
    protected static $container;

    private function __construct()
    {}

    public static function get($key)
    {
        return self::$container[$key];
    }

    public static function set($key, $instance)
    {
        return self::$container[$key] = $instance;
    }

}