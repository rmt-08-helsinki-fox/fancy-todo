const baseUrl = "http://localhost:4410"

$(document).ready(function() {
  authentication();

  $("#btn-login").on("click", (event) => {
    event.preventDefault();
    login();
  })

  $("#btn-register").on("click", event => {
    event.preventDefault();
    register();
  })

  $("#btn-register-inlogin").on("click", (event) => {
    event.preventDefault();
    $("#login-area").hide();
    $("#register-area").show();
  })

  $("#btn-login-inregister").on("click", event => {
    event.preventDefault();
    $("#login-area").show();
    $("#register-area").hide();
  })

  $("#navbar-login").on("click", event => {
    event.preventDefault();
    $("#register-errors").empty();
    $("#login-area").show();
    $("#register-area").hide();
  })

  $("#navbar-register").on("click", event => {
    event.preventDefault();
    $("#login-errors").empty();
    $("#register-area").show();
    $("#login-area").hide();
  })


  $("#navbar-logout").on("click", event => {
    event.preventDefault();
    localStorage.clear();
    signOut();
    authentication()
  })

  $("#btn-logout").on("click", (event) => {
    event.preventDefault();
    localStorage.clear();
    $("#dashboard").hide();
    $("#login-area").show();
  })

  //JAN GANGGU CODE DIATAS


  $("#btn-get-add-todo").on("click", (event) => {
    event.preventDefault();
    $("#anime-area").hide();
    $("#add-todo-area").show();
  })

  $("#btn-get-anime").on("click", event => {
    event.preventDefault();
    $("#add-todo-area").hide();
    $("#anime-area").show();
    getAnime();
  })


  $("#btn-cancel-add-todo").on("click", (event) => {
    event.preventDefault();
    $("#add-todo-area").hide();
  })

  $("#btn-add-todo").on("click", event => {
    event.preventDefault();
    addTodo("self");
  })


  $("body").click(function( event ) {
    event.preventDefault();
    if(event.target.id === "add-anime-to-todo") {
      addTodo("recommendation");
    } else if(event.target.id === "btn-close-add-anime") {
      $("#anime-area").empty().hide();
    } else if(event.target.id.match(/delete-btn*/g)) {
      const id = Number(event.target.id.split("_")[1])
      deleteTodo(id);
    } else if(event.target.id.match(/btn-edit-todo*/g)) {
      const id = Number(event.target.id.split("_")[1])
      updateTodo(id);

    } else if(event.target.id.match(/btn-add-member*/g)) {
      const id = Number(event.target.id.split("_")[1])
      const member_email = $("#member-email").val();
      $.ajax({
        url: baseUrl + '/todos/'+id+'/members',
        method: "PATCH",
        headers: { access_token: localStorage.access_token },
        data: { todoId: id, member_email }
      })
        .done(response => {
          authentication()
        })
        .fail(err => {
          console.log(err)
        })

    } else if(event.target.id.match(/todo-member-tab*/g)) {
      const tabId = event.target.id.split("_")[1]
      $(`#${event.target.id}`).addClass('active');
      $(`#todo-detail_${tabId}`).removeClass('active');
        $.ajax({
          url: baseUrl + "/todos/" + tabId,
          method: "GET",
          headers: { access_token: localStorage.access_token }
        })
        .done(todo => {
          $("#member-list-area").empty();
          $(`#todo-container-body${tabId}`).empty().append(`
          <div class="container" id="member-container">
            <div id="member-list-area"></div>
            <div id="add-member-area">
              <input type="email" id="member-email" placeholder="enter email">
              <button type="submit" class="btn btn-primary" id="btn-add-member_${tabId}">add member</button>
             </div>
          </div>
        `)
          todo.UserTodos.forEach(user => {
            $("#member-list-area").append(`
              <p>${user.member_email}</p>
            `)
          })
        })


    } else if(event.target.id.match(/todo-detail*/g)) {
      const tabId = event.target.id.split("_")[1]
      $(`#todo-detail_${tabId}`).addClass('active');
      $(`#todo-member-tab_${tabId}`).removeClass('active');
      $.ajax({
        url: baseUrl + "/todos/"+tabId,
        method: "GET",
        headers: { access_token: localStorage.access_token }
      })
        .done(todo => {
          let bgColor;
          if(todo.status === "incomplete") {
            bgColor = "red";
          } else {
            bgColor = "green";
          }
          let dateTimeFormatted = new Date(todo.due_date).toUTCString()
          dateTimeFormatted = dateTimeFormatted.slice(0, dateTimeFormatted.length-13)
          $(`#todo-container-body${tabId}`).empty().append(`
              <div class="card-body text-start">
                  <h5 class="card-title">
                        ${todo.title}
                        <span
                        style="background-color: ${bgColor}; border-radius: 3px; padding: 0 5px;"
                        >${todo.status}</span>
                  </h5>
                  <p class="card-text">${todo.description}</p>
                  <div class="text-end">
                    <div class="text-start">
                        <strong>Author:</strong> ${todo.Users[0].email} <strong>Due to:</strong> ${dateTimeFormatted}
                    </div>
                  </div>
              </div>
        `)
        })
        .fail(err => {
          console.log(err)
        })

    } else if(event.target.id.match(/edit-status-btn*/g)) {
      const id = Number(event.target.id.split("_")[1])
      let status = event.target.id.split("_")[2]
      if(status === "complete") {
        status = "incomplete"
      } else {
        status = "complete"
      }
      console.log(status)
      patchTodo(id, status)
    }

    else if(event.target.id.match(/btn-cancel-add-todo*/g)) {
      const id = Number(event.target.id.split("_")[1])

      $.ajax({
        url: baseUrl + `/todos/${id}`,
        method: "GET",
        headers: { access_token: localStorage.access_token }
      })
        .done(todo => {
          let dateTimeFormatted = new Date(todo.due_date).toUTCString()
          dateTimeFormatted = dateTimeFormatted.slice(0, dateTimeFormatted.length-13)
          $(`#todo-container-body${todo.id}`).empty().append(`
              <div class="card-body text-start">
                  <h5 class="card-title">${todo.title}</h5>
                  <p class="card-text">${todo.description}</p>
                  <div class="text-end">
                    <div class="text-start">
                        Due to: ${dateTimeFormatted}
                    </div>
                  </div>
              </div>
      `)
        })

    }


    else if(event.target.id.match(/edit-btn*/g)) {
      const id = Number(event.target.id.split("_")[1])
      $.ajax({
        url: baseUrl + `/todos/${id}`,
        method: "GET",
        headers: { access_token: localStorage.access_token }
      })
        .done(response => {
          const due_dateFormatted = new Date(response.due_date).toISOString().slice(0, 10);
          $(`#todo-container-body${response.id}`).empty().append(`
                <form>
                <div class="row mb-3">
                    <label for="title-add-todo" class="col-sm-2 col-form-label">Title</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="title-edit-todo${response.id}" value="${response.title}">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="date-add-todo" class="col-sm-2 col-form-label">Due Date</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="date-edit-todo${response.id}" value="${due_dateFormatted}">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="description-add-todo" class="col-sm-2 col-form-label">Description</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" id="description-edit-todo${response.id}">${response.description}</textarea>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" id="btn-edit-todo_${response.id}">edit todo</button>
                <button type="submit" class="btn btn-primary" id="btn-cancel-add-todo_${response.id}">cancel</button>
            </form>
      `)
        })
        .fail(err => {
          console.log(err)
        })

    }

  });


  $("#todo-member").on("click", event => {
    event.preventDefault();
    $("#todo-detail").removeClass("active");
    $("#todo-member").addClass("active");
    $("#todo-container").empty()
      .append(`
            <div class="card-body">
                <h5 class="card-title">ini member</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
    `)
  })
})

function getTodoMember(id) {
  $.ajax({
    url: baseUrl + "/todos/"+id,
    method: "POST",
    headers: { access_token: localStorage.access_token }
  })
}




function updateTodo(id) {
  const title = $(`#title-edit-todo${id}`).val();
  const description = $(`#description-edit-todo${id}`).val();
  const due_date = $(`#date-edit-todo${id}`).val();
  $.ajax({
      url: baseUrl + `/todos/${id}`,
      method: "PUT",
      headers: { access_token: localStorage.access_token },
      data: { title, description, due_date }
    })
    .done(response => {
      authentication();
    })
    .fail(err => {
      console.log(err)
    })
}

function patchTodo(id, status) {
  $.ajax({
      url: baseUrl + `/todos/${id}`,
      method: "PATCH",
      headers: { access_token: localStorage.access_token },
      data: { status }
    })
    .done(response => {
      authentication();
    })
    .fail(err => {
      console.log(err)
    })
}



function deleteTodo(todoId) {
  console.log(todoId)
  $.ajax({
    url: baseUrl + `/todos/${todoId}`,
    method: "DELETE",
    headers: { access_token: localStorage.access_token }
  })
    .done(response => {
      authentication();
    })
    .fail(err => {
      console.log(err)
    })
}


function getTodos() {
  $.ajax({
      url: baseUrl + "/todos",
      method: "GET",
      headers: { access_token: localStorage.access_token }
    })
    .done(response => {
      $("#todo-container").empty();

      response.forEach((todo, i) => {
        let bgColor;
        if(todo.status === "incomplete") {
          bgColor = "red";
        } else {
          bgColor = "green";
        }
        let dateTimeFormatted = new Date(todo.due_date).toUTCString()
        dateTimeFormatted = dateTimeFormatted.slice(0, dateTimeFormatted.length-13)
        $("#todo-container").append(`
        <div class="card text-center" style="margin: 10px 0;">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs justify-content-between">
                    <li class="nav-item">
                        <h4 class="nav-link active" aria-current="true" id="todo-detail_${todo.id}">Todo</h4>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="todo-member-tab_${todo.id}">Member</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-info text-end" id="edit-status-btn_${todo.id}_${todo.status}">A</a>
                        <a class="btn btn-warning text-end" id="edit-btn_${todo.id}">Edit</a>
                        <a class="btn btn-danger text-end" id="delete-btn_${todo.id}">Delete</a>
                    </li>
                </ul>
            </div>
          <div id="todo-container-body${todo.id}">
              <div class="card-body text-start">
                  <h5 class="card-title">
                        ${todo.title}
                        <span
                        style="background-color: ${bgColor}; border-radius: 3px; padding: 0 5px;"
                        >${todo.status}</span>
                  </h5>
                  <p class="card-text">${todo.description}</p>
                  <div class="text-end">
                    <div class="text-start">
                        <strong>Author:</strong> ${todo.Users[0].email} <strong>Due to:</strong> ${dateTimeFormatted}
                    </div>
                  </div>
              </div>
          </div>
        </div>
    `)
      })
    })
    .fail(err => {
      console.log(err)
    })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
      url: baseUrl + "/login-google",
      method: "POST",
      data: { id_token },
    })
    .done((response) => {
      localStorage.setItem("access_token", response.access_token);
      authentication();
      $("#dashboard-area").show();
    })
    .fail((err) => {
      $("div.center form .login-error-message").empty();
      err.responseJSON.messages.forEach((errMessage) => {
        $("div.center form .login-error-message").append(`
            <p id="error-register" style="margin: -5px 0; color: red;">${errMessage}</p>
        `);
      });
    })
}



function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function authentication() {
  if(localStorage.access_token) {
    $("#dashboard-area").show();
    $("#login-area").hide();
    $("#add-todo-area").hide();
    $("#register-area").hide();
    $("#navbar-login").hide();
    $("#navbar-register").hide();
    $("#navbar-logout").show();
    getDashboard();
    $("#anime-area").hide();
  } else {
    $("#navbar-login").show();
    $("#navbar-register").show();
    $("#navbar-logout").hide();
    $("#add-todo-area").hide();
    $("#dashboard").hide();
    $("#register-area").hide();
    $("#login-area").show();
  }
}







function addTodo(from) {
  let title, due_date, description;
  if(from === "recommendation") {
    const animeTitle = localStorage.anime_title;
    const animeEpisode = localStorage.anime_episode;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    title = `watch ${animeTitle}`
    due_date = currentDate
    description = `total of ${animeEpisode} episodes on ${animeTitle} to watch`
  } else {
    title = $("#title-add-todo").val();
    due_date = $("#date-add-todo").val();
    description = $("#description-add-todo").val();
  }
  $.ajax({
    url: baseUrl + "/todos",
    method: "POST",
    headers: { access_token: localStorage.access_token },
    data: { title, description, due_date }
  })
    .done(response => {
      $("#add-todo-area").hide();
      getTodos();
    })
    .fail((err) => {
      console.log(err)
    })
}





function login() {
  const email = $("#login-email").val();
  const password = $("#login-password").val();

  $.ajax({
    url: baseUrl + "/login",
    method: "POST",
    data: { email, password }
  })
    .done(response => {
      localStorage.setItem("access_token", response.access_token)
      getDashboard();
      authentication();
    })
    .fail(errors => {
      $("#login-errors").empty();
      errors.responseJSON.errors.forEach(error => {
        $("#login-errors").prepend(`
            <p style="color: red;">${error}</p>
        `)
      })
    })
}



function register() {
  const email = $("#register-email").val();
  const password = $("#register-password").val();

  $.ajax({
    url: baseUrl + "/register",
    method: "POST",
    data: { email, password }
  })
    .done(response => {
      $("#login-area").show();
      $("#add-todo-area").hide();
      $("#register-area").hide();
      $("#dashboard-area").hide();
    })
    .fail(errors => {
      console.log(errors)
      $("#register-errors").empty();
      errors.responseJSON.errors.forEach(error => {
        $("#register-errors").prepend(`
            <p style="color: red; margin: -5px 0;">${error}</p>
        `)
      })
    })
}

async function getDashboard() {
  $("#dashboard-area").show();
  getTodos();
  getUsers();
  getAccount();
}

function getUsers(){
  $.ajax({
    url: baseUrl + "/users",
    method: "GET",
    headers: { access_token: localStorage.access_token }
  })
    .done(response => {
      $("#user-list").empty();
      response.forEach((user, i) => {
        $("#user-list").append(`
         <h6 class="card-title">${i+1}. ${user.email}</h6>
        `)
      })
    })
    .fail(err => {
      console.log(err)
    })
}

function getAccount() {
  $.ajax({
    url: baseUrl + "/user",
    method: "GET",
    headers: { access_token: localStorage.access_token }
  })
    .done(user => {
      $("#user-profile").empty().append(`
        <p className="card-text">${user.email}</p>
      `)
    })
    .fail(err => {
      console.log(err)
    })
}


function getAnime() {
  $.ajax({
    url: baseUrl + "/todos/anime",
    method: "GET",
    headers: { access_token: localStorage.access_token }
  })
    .done(response => {
      localStorage.setItem("anime_title", response.title)
      localStorage.setItem("anime_episode", response.episodes)
      $("#anime-area").empty()
        .show()
        .append(`
            <div class="row g-0">
                <div class="col-md-4" id="anime-image-cover">
                    <img src="${response.image_url}" alt="${response.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${response.title}</h5>
                        <p class="card-text">Rating: <strong>${response.rating}</strong> by <strong>${response.rating_by}</strong> users.</p>
                        <p class="card-text">Genres: ${response.genres.join(", ")}</p>
                        <p class="card-text">${response.synopsis.slice(0, 155)} . . .</p>
                        <a class="btn btn-primary text-end" id="add-anime-to-todo">Add todo</a>
                        <a class="btn btn-primary text-end" id="btn-close-add-anime">close</a>
                    </div>
                </div>
            </div>
      `)
    })
    .fail(err => {
      console.log(err)
    })
}