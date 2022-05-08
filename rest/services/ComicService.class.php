<?php

require_once __DIR__.'../BaseService.class.php';
require_once __DIR__.'/../dao/ComicDao.class.php';

class ComicService extends BaseService{

  private $dao;

  public function __construct(){
    parent::__construct(new ComicDao());
  }

}

 ?>
