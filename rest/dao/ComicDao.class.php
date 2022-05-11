<?php

require_once __DIR__.'/BaseDao.class.php';

class ComicDao extends BaseDao{

  /**
  *constructor of dao class
  */
  public function __construct(){
    parent::__construct("comics");
  }

  public function get_comics_by_category_id($category_id){
    return $this->query("SELECT * FROM comics WHERE category_id = :category_id", ['category_id' => $category_id]);
  }
}

?>
