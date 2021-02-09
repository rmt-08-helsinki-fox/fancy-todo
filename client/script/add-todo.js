$(document).ready(() => {
  $(".btn-cancel-add").on("click", () => {
    $("#list-todo").show();
    $("#add-container").hide();
    $("#tab2").hide();
    $("#tab1").show();
    $("#manual-menu").addClass("active");
    $("#search-menu").removeClass("active");
  })

  $("#btn-add-todo").on("click", () => {
    getMovies()
    $("#tab2").hide();
    $("#list-todo").hide();
    $("#add-container").show();
  })

  $("#btn-edit-todo").on("click", () => {
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
    const due_date = $("#edit-due_date").val()
    const data = JSON.parse(localStorage.getItem("selectedEditTodo"))
    $.ajax({
      url: 'http://localhost:3001/todos/' + data.id,
      method: "PUT",
      data: { title, description, due_date },
      headers: { 
        token: localStorage.getItem("access_token")
       }
    })
    .done( res => {
      generateListTodo();
      $("#edit-container").hide()
      $("#list-todo").show()
    })
    .fail( err => {
      swal("Something Wrong", err.responseJSON.error, "error")
    })
    .always( _=> {
      $("#form-edit").trigger("reset")
    })
  })

  $("#btn-add-todo-manual").on("click", (e) => {
    e.preventDefault()
    const title = $("#add-title").val()
    const description = $("#add-description").val()
    const due_date = $("#add-due_date").val()
    $.ajax({
      url: 'http://localhost:3001/todos',
      method: "POST",
      data: { title, description, due_date },
      headers: { 
        token: localStorage.getItem("access_token")
       }
    })
    .done( res => {
      generateListTodo();
      $("#add-container").hide()
      $("#list-todo").show()
    })
    .fail( err => {
      swal("Something Wrong", err.responseJSON.error, "error")
    })
    .always( _=> {
      $("#form-add-manual").trigger("reset")
    })
  })

  $("#btn-add-todo-search").on("click", (e) => {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("selectedMovie")) 
    const title = data.title
    const description = data.overview
    const image = data.poster_path
    const due_date = $("#search-due_date").val()
    $.ajax({
      url: 'http://localhost:3001/todos',
      method: "POST",
      data: { title, description, due_date, image },
      headers: { 
        token: localStorage.getItem("access_token")
       }
    })
    .done( res => {
      generateListTodo();
      $("#add-container").hide()
      $("#list-todo").show()
    })
    .fail( err => {
      swal("Something Wrong", err.responseJSON.error, "error")
    })
    .always( _=> {
      $("#form-add-manual").trigger("reset")
    })
  })

  const getMovies = () => {
    $.ajax({
      url: 'http://localhost:3001/movies',
      method: 'GET',
      headers: {
        token: localStorage.getItem('access_token')
      }
    })
    .done( res => {
      res.results.forEach( (data, index) => {
        dataStringify = JSON.stringify(data)

        $("#list-movie").append(`
        <div class="col">
          <div class="card" style="width: max-content;cursor: pointer; border-radius: 20px" onclick='onClickedMovie(JSON.stringify(${dataStringify}))'>
            <img src="${data.poster_path}" width="220px" height="330px" style=" border-radius: 20px" />
            <div class="card-desc">
              <b>${data.title}</b><br/>
              "${data.overview.slice(0, 50) + "..."}"
            </div>
          </div>
        </div>
        `)
      })
    })
    .fail( err => {
      swal("Something Wrong", err.responseJSON.error, "error")
    })
  }

  

  // menu tab controller
  $("#search-menu").on("click", () => {
    $("#manual-menu").removeClass("active");
    $("#search-menu").addClass("active");
    $("#tab1").hide();
    $("#tab2").show();
  });
  $("#manual-menu").on("click", () => {
    $("#manual-menu").addClass("active");
    $("#search-menu").removeClass("active");
    $("#tab1").show();
    $("#tab2").hide();
  });
});
