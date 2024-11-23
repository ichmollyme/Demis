<?php

class FeedbackController extends Controller
{
    public function __construct() 
    {
        $tableName = 'feedback';
        $tableColumns = '(FullName, Adress, PhoneNumber, Email, CreateDate)';

        parent::__construct($tableName, $tableColumns);
    }

    public function insert($data)
    {
        if ($data && isset($data['fullname'], $data['adress'], $data['phoneNumber'], $data['email'])) 
        {
            $fullName = $data['fullname'];
            $adress = $data['adress'];
            $phoneNumber = $data['phoneNumber'];
            $email = $data['email'];
        }
        else
        {
            throw new Exception('Invalid input data');
        }  

        $stringData = "('$fullName', '$adress', '$phoneNumber', '$email', NOW())";

        return parent::insert($stringData);
    }
}

?>