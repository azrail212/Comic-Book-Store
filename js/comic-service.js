var ComicService = {
    init: function(){
      $('#addComicForm').validate({
        submitHandler: function(form) {
          var comic = Object.fromEntries((new FormData(form)).entries());
          ComicService.add(comic);
        }
      });

      ComicService.list();
    },

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
                  <h2>` + data[i].name + `</h2>
                  <p class="card-text">` + data[i].description + `</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p>Category: <span class="fw-bolder">` + data[i].category_id + `</span></p>
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

    get_comics_by_category_id_modal: function(category_id){
    $("#category-comics").html('loading ...');
    $.get('rest/categories/'+ category_id +'/comics', function(data) {
      var html = "";
      for(let i = 0; i < data.length; i++){
        html +=
        `<div style="border:1px solid darkgrey; padding:15px; margin:5px;">
              <p class="fw-bolder">` + data[i].name + `</p>
              <p class="card-text">` + data[i].description + `</p>
        </div>`;
      }
      $("#category-comics").html(html);
    });
    $("#comicsModal").modal('show');
  },

  get_comics_by_category_id_new_page: function(category_id){
  $("#category-comics").html('loading ...');
  $.get('rest/categories/'+ category_id +'/comics', function(data) {
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
            <h2>` + data[i].name + `</h2>
            <p class="card-text">` + data[i].description + `</p>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <p>Category: <span class="fw-bolder">` + data[i].category_id + `</span></p>
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
  });
  window.open("rest/categories/"+ category_id +"/comics");

},

    get: function(id){
      $.get('rest/comics/' + id, function(data) {
        $('.edit-comic-button').attr('disabled', true);
        console.log(data);

        $("#id").val(data.id);
        $("#update_name").val(data.name);
        $("#update_description").val(data.description);
        $("#update_category_id").val(data.category_id);
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
        }
      });
    },

    update:function(){
      $('.save-comic-change-button').attr('disabled', true);
      var comic = {};
      comic.name = $('#update_name').val();
      comic.description = $('#update_description').val();
      comic.category_id = $('#update_category_id').val();
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
      $.ajax({
        url: 'rest/comics/' + id,
        type: 'DELETE',
        success: function(result) {
            $("#comic-list").html(`
            <div class="spinner-grow text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <h3>Loading...</h3>`);
            ComicService.list();
        }
      });
    },
}
