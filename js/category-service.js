var CategoryService = {
    init: function(){
      $('#addCategoryForm').validate({
        submitHandler: function(form) {
          var category = Object.fromEntries((new FormData(form)).entries());
          CategoryService.add(category);
        }
      });

      CategoryService.list();
    },

    list:function(){
      $.get("rest/categories", function(data) {
        $("#category-list").html("");

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
                      <p>Category: <span class="fw-bolder">` + data[i].name + `</span></p>
                      <p>Description: <span class="fw-bolder">` + data[i].description + `</span></p>
                    </div>
                  </div>
                  <div class="btn-group" role="group">
                   <button type="button" class="btn btn-primary edit-category-button" onclick="CategoryService.get(` + data[i].id + `)">Edit</button>
                   <button type="button" class="btn btn-danger edit-category-button" onclick="CategoryService.delete(` + data[i].id + `)">Delete</button>
                 </div>
                </div>
              </div>
            </div> `;
        }
        $("#category-list").html(html);
      });
    },

    get: function(id){
      $.get('rest/categories/' + id, function(data) {
        $('.edit-category-button').attr('disabled', true);
        console.log(data);

        $("#id").val(data.id);
        $("#update_name").val(data.name);
        $("#update_description").val(data.description);
        $("#update_agegroup").val(data.agegroup);

        $("#updateCategoryModal").modal("show");

        $('.edit-category-button').attr('disabled', false);
      });
    },

    add:function(category){
      $.ajax({
        url: 'rest/categories/',
        type: 'POST',
        data: JSON.stringify(category),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#category-list").html(`
            <div class="spinner-grow text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <h3>Loading...</h3>`);
            CategoryService.list();
            $("#addCategoryModal").modal("hide");
        }
      });
    },

    update:function(){
      $('.save-category-change-button').attr('disabled', true);
      var category = {};
      category.name = $('#update_name').val();
      category.description = $('#update_description').val();
      category.agegroup = $('#update_agegroup').val();

      $.ajax({
        url: 'rest/categories/' + $('#id').val(),
        type: 'PUT',
        data: JSON.stringify(category),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#updateCategoryModal").modal("hide");
            $('.save-category-change-button').attr('disabled', false);
            $("#category-list").html(`
            <div class="spinner-grow text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <h3>Loading...</h3>`);
            CategoryService.list();
        }
      });
    },

    delete:function(id){
      $('.edit-category-button').attr('disabled', true);
      $.ajax({
        url: 'rest/categories/' + id,
        type: 'DELETE',
        success: function(result) {
            $("#category-list").html(`
            <div class="spinner-grow text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <h3>Loading...</h3>`);
            CategoryService.list();
        }
      });
    },
}
