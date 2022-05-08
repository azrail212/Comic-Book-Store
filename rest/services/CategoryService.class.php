<?php

require_once __DIR__.'/../dao/BaseService.class.php';
require_once __DIR__.'/../dao/CategoryDao.class.php';

class CategoryService extends BaseService{

  private $dao;

  public function __construct(){
    parent::__construct(new CategoryDao());
  }

}

 ?>
