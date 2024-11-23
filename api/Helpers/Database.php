<?php

class Database 
{
    private $host = 'localhost';
    private $dbname = 'testtask';
    private $username = 'root';
    private $password = '123456789';
    private $port = 3306;
    private $pdo;

    public function connect() 
    {
        if ($this->pdo === null) 
        {
            try 
            {
                $dsn = "mysql:host={$this->host};dbname={$this->dbname};port={$this->port};charset=utf8";

                $this->pdo = new PDO($dsn, $this->username, $this->password);
                $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                return $this->pdo;
            } 
            catch (PDOException $e) 
            {
                die("Ошибка подключения к базе данных: " . $e->getMessage());
            }
        }

        return $this->pdo;
    }

    public function query($sql) 
    {
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute();

        return $stmt;
    }

    public function fetchAll($sql) {
        $stmt = $this->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function fetchOne($sql) {
        $stmt = $this->query($sql);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

?>