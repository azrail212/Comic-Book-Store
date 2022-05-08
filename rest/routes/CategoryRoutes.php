<?php

 /**
 * Function to list all categories
 */
  Flight::route('GET /categories', function()
  {
    Flight::json(Flight::categoryService()->get_all());
  });

/**
 * Get individual category
 */
  Flight::route('GET /categories/@id', function($id)
  {
   Flight::json(Flight::categoryService()->get_by_id($id));
  });

 /**
  * add category to db
  */
  Flight::route('POST /categories', function()
  {
    Flight::json(Flight::categoryService()->add(Flight::request()->data->getData()));
  });

/**
 * delete category
 */
  Flight::route('DELETE /categories/@id', function($id)
  {
    Flight::categoryService()->delete($id);
    Flight::json(["message" => "deleted"]);
  });

  /**
   * update category by id
   */
  Flight::route('PUT /categories/@id', function($id)
  {
    $data = Flight::request()->data->getData();
    $data['id'] = $id;
    Flight::json(Flight::categoryService()->update($data));
  });

 ?>
