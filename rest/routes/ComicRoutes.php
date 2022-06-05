<?php
// Implementing CRUD operations, now through FlightPHP

 /**
  * @OA\Get(path="/comics", tags={"comics"}, security={{"ApiKeyAuth": {}}},
  *         summary="Return all comics from the API. ",
  *         @OA\Response( response=200, description="List of todos.")
  * )
  */
  Flight::route('GET /comics', function()
  {
    Flight::json(Flight::comicService()->get_all());
  });

/**
 * Get individual comic by id
 */
  Flight::route('GET /comics/@id', function($id)
  {
   Flight::json(Flight::comicService()->get_by_id($id));
  });

 /**
  * add comic to db
  */
  Flight::route('POST /comics', function()
  {
    Flight::json(Flight::comicService()->add(Flight::request()->data->getData()));
  });

/**
 * delete comic
 */
  Flight::route('DELETE /comics/@id', function($id)
  {
    Flight::comicService()->delete($id);
    Flight::json(["message" => "deleted"]);
  });

  /**
   * update comic by id
   */
  Flight::route('PUT /comics/@id', function($id)
  {
    $data = Flight::request()->data->getData();
    $data['id'] = $id;
    Flight::json(Flight::comicService()->update($id, $data));
  });

  ?>
