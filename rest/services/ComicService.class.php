<?php

require_once __DIR__.'../BaseService.class.php';
require_once __DIR__.'/../dao/ComicDao.class.php';

class ComicService extends BaseService{

  protected $dao;

  public function __construct(){
    parent::__construct(new ComicDao());
  }

  public function get_comics_by_category_id($id){
    return $this->dao->get_comics_by_category_id($id);
  }

}

 ?>
