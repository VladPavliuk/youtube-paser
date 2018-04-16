<?php

class Model
{
    protected function getFields($initialModelObj, ...$requestFields)
    {
        $outerObject = [];

        foreach ($initialModelObj as $fieldKey => $fieldValue) {
            if (in_array($fieldKey, $requestFields, true)) {
                $outerObject[$fieldKey] = $fieldValue;
            }
        }

        return $outerObject;
    }
}