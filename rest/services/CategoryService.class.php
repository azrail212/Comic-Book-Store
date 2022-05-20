<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/CategoryDao.class.php';

class CategoryService extends BaseService{

  protected $dao;

  public function __construct(){
    parent::__construct(new CategoryDao());
  }

}

 ?>
