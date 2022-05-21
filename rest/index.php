<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;

  require_once __DIR__.'/../vendor/autoload.php';
  require_once __DIR__.'/services/ComicService.class.php';
  require_once __DIR__.'/services/CategoryService.class.php';
  require_once __DIR__.'/dao/UserDao.class.php';


  //we use this method so that we don't have to call dao each time we want to use it
  Flight::register('comicService', 'ComicService');
  Flight::register('categoryService', 'CategoryService');
  Flight::register('userDao', 'UserDao');

  Flight::map('error', function(Exception $ex){
      // Handle error
      Flight::json(['message' => $ex->getMessage()], 500);
  });

  // middleware method for login
  Flight::route('/*', function(){
    // JWT decode
    $path = Flight::request()->url;
    if ($path == '/login') return TRUE; // exclude login route

    $headers = getallheaders();
    if (@!$headers['Authorization']){
      Flight::json(["message" => "Authorization is missing"], 403);
      return FALSE;
    }else{
      try {
        $decoded = (array)JWT::decode($headers['Authorization'], new Key(Config::JWT_SECRET(), 'HS256'));
        Flight::set('user', $decoded);
        return TRUE;
      } catch (\Exception $e) {
        Flight::json(["message" => "Authorization token is not valid"], 403);
        return FALSE;
      }
    }
  });

  require_once __DIR__.'/routes/ComicRoutes.php';
  require_once __DIR__.'/routes/CategoryRoutes.php';
  require_once __DIR__.'/routes/UserRoutes.php';

  Flight::start(); // start flight framework

?>
