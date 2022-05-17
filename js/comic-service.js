var ComicService = {

    list:function(){
      $.get("rest/comics", function(data) {
        $("#comic-list").html("");

        var html = "";
        for (let i = 0; i < data.length; i++) {
          html += `
            <div class="col">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                </svg>

                <div class="card-body">
                  <h2>` + data[i].comic_name + `</h2>
                  <p class="card-text">` + data[i].comic_description + `</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p>Category: <span class="fw-bolder">` + data[i].comic_category_id + `</span></p>
                      <p>Price: <span class="fw-bolder">` + data[i].price + '$' + `</span></p>
                    </div>
                  </div>
                  <div class="btn-group" role="group">
                   <button type="button" class="btn btn-primary edit-comic-button" onclick="ComicService.get(` + data[i].id + `)">Edit</button>
                   <button type="button" class="btn btn-danger edit-comic-button" onclick="ComicService.delete(` + data[i].id + `)">Delete</button>
                 </div>
                </div>
              </div>
            </div> `;
        }
        $("#comic-list").html(html);
      });
    },

  get_comics_by_category_id: function(comic_category_id){
    $("#comic-list").html(`<div class="spinner-grow text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <h3>Loading...</h3>`);
  $.get('rest/categories/'+ comic_category_id +'/comics', function(data) {
    var html = "";

    for(let i = 0; i < data.length; i++){
      html +=
      `<div class="col">
        <div class="card shadow-sm">
          <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
          </svg>

          <div class="card-body">
            <h2>` + data[i].comic_name + `</h2>
            <p class="card-text">` + data[i].comic_description + `</p>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <p>Category: <span class="fw-bolder">` + data[i].comic_category_id + `</span></p>
                <p>Price: <span class="fw-bolder">` + data[i].price + '$' + `</span></p>
              </div>
            </div>
            <div class="btn-group" role="group">
             <button type="button" class="btn btn-primary edit-comic-button" onclick="ComicService.get(` + data[i].id + `)">Edit</button>
             <button type="button" class="btn btn-danger edit-comic-button" onclick="ComicService.delete(` + data[i].id + `)">Delete</button>
           </div>
          </div>
        </div>
        </div>`;
    }
    $("#comic-list").html(
      `<div>
      <a href="#" class="btn btn-primary my-2 btn-lg" data-bs-toggle="modal" data-bs-target="#addComicModal">Add comic</a>`
      +html+
      `</div>`);
  });

  $('#addComicForm').validate({
    submitHandler: function(form) {
      var added_comic = Object.fromEntries((new FormData(form)).entries());
      console.log(added_comic);
      ComicService.add(added_comic);
      toastr.info("Adding ...");

    }
  });

},

    get: function(id) {
      $.get('rest/comics/' + id, function(data) {
        $('.edit-comic-button').attr('disabled', true);
        console.log(data);

        $("#comic_id").val(data.id);
        $("#update_comic_name").val(data.comic_name);
        $("#update_comic_description").val(data.comic_description);
        $("#select-category").val(data.comic_category_id);
        $("#update_price").val(data.price);

        $("#updateComicModal").modal("show");

        $('.edit-comic-button').attr('disabled', false);
      });
    },

    add:function(comic){
      $.ajax({
        url: 'rest/comics/',
        type: 'POST',
        data: JSON.stringify(comic),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#comic-list").html(`
            <div class="spinner-grow text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <h3>Loading...</h3>`);
            ComicService.list();
            $("#addComicModal").modal("hide");
        toastr.success("Added !");

        }
      });
    },

    update: function() {
      $('.save-comic-change-button').attr('disabled', true);
      var comic = {};
      comic.comic_name = $('#update_comic_name').val();
      comic.description = $('#update_comic_description').val();
      comic.comic_category_id = $('#select-category').val();
      comic.price = $('#update_price').val();

      $.ajax({
        url: 'rest/comics/' + $('#id').val(),
        type: 'PUT',
        data: JSON.stringify(comic),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
          $("#updateComicModal").modal("hide");
          $('.save-comic-change-button').attr('disabled', false);
          $("#comic-list").html(`
              <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <h3>Loading...</h3>`);
          ComicService.list();
        }
      });
    },

    delete:function(id){
      $('.edit-comic-button').attr('disabled', true);
      toastr.info("Deleting in background ...");

      $.ajax({
        url: 'rest/comics/' + id,
        type: 'DELETE',
        success: function(result) {
            $("#comic-list").html(`
            <div class="spinner-grow text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <h3>Loading...</h3>`);
            toastr.success("Deleted !");

            ComicService.list();
        },

        error: function(XMLHttpRequest, textStatus, errorThrown) {
       alert("Status: " + textStatus); alert("Error: " + errorThrown);
     }
      });
    },
}
