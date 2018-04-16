<?php

function response()
{
    return Container::get('response');
}

function db()
{
    return Container::get('databaseConnection')->get();
}