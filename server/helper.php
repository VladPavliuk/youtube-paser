<?php

function response()
{
    return Container::get('response');
}

function request()
{
    return Container::get('request');
}

function db()
{
    return Container::get('databaseConnection')->get();
}