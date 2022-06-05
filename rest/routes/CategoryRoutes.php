<?php

 /**
 * @OA\Get(path="/categories", tags={"comics"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all comic categories from the API. ",
 *         @OA\Response( response=200, description="List of categories.")
 * )
 */
  Flight::route('GET /categories', function()
  {
    Flight::json(Flight::categoryService()->get_all());
  });

/**
* @OA\Get(path="/categories/{id}", tags={"comics"}, security={{"ApiKeyAuth": {}}},
*     @OA\Parameter(in="path", name="id", example=1, description="Id of category"),
*     @OA\Response(response="200", description="Fetch individual category")
* )
*/
  Flight::route('GET /categories/@id', function($id)
  {
   Flight::json(Flight::categoryService()->get_by_id($id));
  });

/**
* @OA\Get(path="/categories/{id}/comics", tags={"comics"}, security={{"ApiKeyAuth": {}}},
*     @OA\Parameter(in="path", name="id", example=1, description="List comics"),
*     @OA\Response(response="200", description="Fetch category's comics")
* )
*/
  Flight::route('GET /categories/@id/comics', function($id){
    Flight::json(Flight::comicService()->get_comics_by_category_id($id));
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
    Flight::json(Flight::categoryService()->update($id, $data));
  });

 ?>
