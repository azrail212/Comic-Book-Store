<?php

class ComicStoreDao
{
  private $conn;

  /**
  *constructor of dao class
  */
  public function __construct()
  {
    /**
    * $servername = "sql.freedb.tech";
    * $username = "freedb_webuser";
    * $password = "mGTsx87Z7Nh*#Ea";
    * $schema = "freedb_comic-book-store";
    */

    $servername = "localhost";
    $username = "root";
    $password = "17110000";
    $schema = "comicbookstore";
    $this->conn = new PDO("mysql:host=$servername;dbname=$schema", $username, $password);

    //set PDO error mode to Exception
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  /**
  * method used to add comics to database
  */
  public function add($name, $description)
  {
    $stmt = $this->conn->prepare("INSERT INTO comics(name, description) VALUES
                                (:name, :description)");
    $stmt->execute(['name' => $name, 'description' => $description]);
  }

  /**
  * Method to read all comics
  **/
  public function get_all()
  {
    $stmt = $this->conn->prepare("SELECT * FROM comics");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  /**
   * Get individual comic by its id
   */
   public function get_by_id($id)
   {
     $stmt = $this->conn->prepare("SELECT * FROM comics where id=:id");
     $stmt->execute(['id' => $id]);
     $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
     return reset($result); //move the array's pointer to the first element, so that we get it returned
   }

  /**
  * delete comic record from db
  */
  public function delete($id){
    $stmt = $this->conn->prepare("DELETE FROM comics where id=:id");
    $stmt->bindParam(':id', $id); // SQL injection prevention
    $stmt->execute();
  }

  /**
  * update comic record
  */
  public function update($id, $name, $description)
  {
    $stmt = $this->conn->prepare("UPDATE comics SET name = :name,
                                  description = :description where id = :id");
    $stmt->execute(['id' => $id, 'name' => $name, 'description' => $description]);
  }
}
 ?>
