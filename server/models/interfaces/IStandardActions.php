<?php

interface IStandardActions
{
    public function index();
    public function store($item);
    public function show($id);
    public function update($id, $item);
    public function destroy($id);
}