<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../vendor/autoload.php'; // run autoloader
require_once 'dao/ComicStoreDao.class.php';


// Implementing CRUD operations, now through FlightPHP

/**
 * Function to list all comics
 */

  Flight::route('GET /comics', function()
  {
    $dao = new ComicStoreDao();
    $comics = $dao->get_all();
    Flight::json($comics);
  });

/**
 * Get individual comic by id
 */

 Flight::route('GET /comics/@id', function($id)
 {
   $dao = new ComicStoreDao();
   $comics = $dao->get_by_id($id);
   Flight::json($comics);
 });

Flight::route('/', function()  //define what fucntion will happen on / route
{
  echo "Hello from FlightPHP!";
});

Flight::start(); // start flight framework

?>
