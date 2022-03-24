<?php
require '../vendor/autoload.php'; // run autoloader

Flight::route('/', function()  //define what fucntion will happen on / route
{
  echo "Hello from FlightPHP!";
});

Flight::start(); // start flight framework

 ?>
