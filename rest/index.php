<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

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

  require_once __DIR__.'/routes/ComicRoutes.php';
  require_once __DIR__.'/routes/CategoryRoutes.php';
  require_once __DIR__.'/routes/UserRoutes.php';

  Flight::start(); // start flight framework

?>
