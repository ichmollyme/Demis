<?php

class Controller
{
    private $tableName;
    private $tableColumns;

    public function __construct($tableName, $tableColumns) 
    {
        $this->tableName = $tableName;
        $this->tableColumns = $tableColumns;
    }

    public function getAll()
    {
        $db = new Database();

        return $db->fetchAll("SELECT * FROM {$this->tableName}");
    }

    public function getById($id)
    {
        $db = new Database();
        
        return $db->fetchOne("SELECT * FROM {$this->tableName} WHERE Id = $id");
    }

    public function getLimit($limit, $sort = 'asc')
    {
        $db = new Database();

        if ($sort !== 'asc' && $sort !== 'desc') 
        {
            $sort = 'asc';
        }

        return $db->fetchAll("SELECT * FROM {$this->tableName} ORDER BY CreateDate $sort LIMIT $limit");
    }

    public function insert($data)
    {
        $db = new Database();

        $db->fetchOne("INSERT INTO {$this->tableName} {$this->tableColumns} VALUES $data");
    }
}

?>