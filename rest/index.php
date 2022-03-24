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

Flight::route('/comics', function()
{
  $dao = new ComicStoreDao();
  $comics = $dao->get_all();
  Flight::json($comics);
});

Flight::route('/', function()  //define what fucntion will happen on / route
{
  echo "Hello from FlightPHP!";
});

Flight::start(); // start flight framework

?>
