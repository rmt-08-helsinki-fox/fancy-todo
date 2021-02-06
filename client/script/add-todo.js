$(document).ready(() => {
  $(".btn-cancel-add").on("click", () => {
    $("#list-todo").show();
    $("#add-container").hide();
  })

  $("#btn-add-todo").on("click", () => {
    $("#tab2").hide();
    $("#list-todo").hide();
    $("#add-container").show();
  })

  $("#btn-add-todo-manual").on("click", (e) => {
    e.preventDefault()
    const title = $("#add-title").val()
    const description = $("#add-description").val()
    const due_date = $("#add-due_date").val()
    console.log('test', title, description, due_date);
    $.ajax({
      url: 'http://localhost:3001/todos',
      method: "POST",
      data: { title, description, due_date },
      headers: { 
        token: localStorage.getItem("access_token")
       }
    })
    .done( res => {
      console.log(res);
      generateListTodo();
      $("#add-container").hide()
      $("#list-todo").show()
    })
    .fail( err => {
      console.log(err);
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
      console.log(res);
      generateListTodo();
      $("#add-container").hide()
      $("#list-todo").show()
    })
    .fail( err => {
      console.log(err);
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

        const data1item = `
        <div class="col">
          <div class="card" style="width: max-content">
            <img src="${data.poster_path}" width="220px" height="330px" />
            <div class="card-desc">
              <b>${data.title}</b><br/>
              "${data.overview.slice(0, 77) + "..."}"
            </div>
          </div>
        </div>
        `
        $("#list-movie").append(`
        <div class="col">
          <div class="card" style="width: max-content;cursor: pointer" onclick='localStorage.setItem("selectedMovie", JSON.stringify(${dataStringify}));$("#list-movie").empty();'>
            <img src="${data.poster_path}" width="220px" height="330px" />
            <div class="card-desc">
              <b>${data.title}</b><br/>
              "${data.overview.slice(0, 77) + "..."}"
            </div>
          </div>
        </div>
        `)
      })
      console.log(res);
    })
    .fail( err => {
      console.log(err);
    })
  }

  

  // menu tab controller
  $("#search-menu").on("click", () => {
    getMovies()
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
