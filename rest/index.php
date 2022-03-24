<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../vendor/autoload.php'; // run autoloader
require_once 'dao/ComicStoreDao.class.php';

//we use this method so that we don't have to call dao each time we want to use it
Flight::register('comicDao', 'ComicStoreDao');


// Implementing CRUD operations, now through FlightPHP

/**
 * Function to list all comics
 */

  Flight::route('GET /comics', function()
  {
    $comics = Flight::comicDao()->get_all();
    Flight::json($comics);
  });

/**
 * Get individual comic by id
 */

 Flight::route('GET /comics/@id', function($id)
 {
   $comic = Flight::comicDao()->get_by_id($id);
   Flight::json($comic);
 });

 /**
  * add comic to db
  */
  Flight::route('POST /comics', function()
  {
    $request = Flight::request(); // encapsulates the HTTP request into a single object
    $data = $request->data->getData();
    Flight::comicDao()->add($data['name'], $data['description']);
  });

/**
 * delete comic
 */
  Flight::route('DELETE /comics/@id', function($id){
  Flight::comicDao()->delete($id);
  Flight::json(["message" => "deleted"]);
});

Flight::route('/', function()  //define what fucntion will happen on / route
{
  echo "Hello from FlightPHP!";
});

Flight::start(); // start flight framework

?>
