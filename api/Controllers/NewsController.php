<?php

class NewsController extends Controller
{
    public function __construct() 
    {
        $tableName = 'news';
        $tableColumns = '(Name, Body, Date)';

        parent::__construct($tableName, $tableColumns);
    }

    public function insert($data)
    {
        if ($data && isset($data['name'], $data['body'])) 
        {
            $name = $data['name'];
            $body = $data['surname'];
        }
        else
        {
            throw new Exception('Invalid input data');
        } 

        $stringData = "('$name', '$body', NOW())";

        return parent::insert($stringData);
    }
}

?>