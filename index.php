<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once("rest/dao/ComicStoreDao.class.php");

$dao = new ComicStoreDao();

$op = $_REQUEST['op']; //example: http://localhost/comicstore/?op=get

switch ($op) {
  case 'insert':
    $name = $_REQUEST['name'];
    $description = $_REQUEST['description'];
    $dao->add($name, $description);
    break;

  case 'delete':
    $id = $_REQUEST['id'];
    $dao->delete($id);
    echo "DELETED $id";
    break;

  case 'update':
    $id = $_REQUEST['id'];
    $name = $_REQUEST['name'];
    $description = $_REQUEST['description'];
    $dao->update($id, $name, $description);
    echo "UPDATED $id";
    break;

  case 'get':
  default:
    $results = $dao->get_all();
    print_r($results);
    break;
}

?>
