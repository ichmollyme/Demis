<?php
include 'Helpers/RouterFunctions.php';
include 'Controllers/Controller.php';
include 'Controllers/FeedbackController.php';
include 'Controllers/NewsController.php';
include 'Helpers/Database.php';


$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];
$path = parse_url($requestUri, PHP_URL_PATH);

$response = null;

if (strpos($path, '/api/feedback') === 0)
{
    $controller = new FeedbackController();

    $response = requestProcessing($requestMethod, $requestUri, $path, $controller);
}

if (strpos($path, '/api/news') === 0)
{
    $controller = new NewsController();

    $response = requestProcessing($requestMethod, $requestUri, $path, $controller);
}

if ($response === null)
{
    sendJsonResponse(["error" => "Not Found"], 404);
}

if ($response === 'Invalid input data')
{
    sendJsonResponse(["error" => "Invalid input data"], 400);
}

sendJsonResponse($response, 200);

?>