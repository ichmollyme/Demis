<?php

function sendJsonResponse($data, $statusCode = 200) 
{
    header('Content-Type: application/json');
    http_response_code($statusCode);

    echo json_encode($data);

    exit;
}

function requestProcessing($requestMethod, $requestUri, $path, $controller)
{
    $controllerName = strtolower(str_replace("Controller", "", get_class($controller)));

    if (preg_match("#^/api/$controllerName\?limit=(\d+)&sort=([a-zA-Z]+)$#", $requestUri, $matches))
    {
        return $controller->getLimit((int)$matches[1], $matches[2]);
    }

    if (preg_match("#^/api/$controllerName/(\d+)$#", $path, $matches))
    {
        $result = $controller->getById((int)$matches[1]);

        if ($result === false){
            return 'Invalid input data';
        }

        return $result;
    }

    if ($requestMethod === 'GET')
    {
        return $controller->getAll();
    }

    if ($requestMethod === 'POST')
    {
        $data = json_decode(file_get_contents('php://input'), true);

        try
        {
            $controller->insert($data);

            return 'Ok';
        }
        catch (Exception $e)
        {
            return $e->getMessage();
        }
    }

    return null;
}

?>