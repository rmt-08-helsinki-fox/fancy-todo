const url = 'https://fancy-todo-app-server.herokuapp.com/';


function auth() {
  if (!localStorage.getItem("token")) {
    $("#login-container").show(500);
    $("#google-login").show(500);
    $("#click-register").show(500);
    $("#greeting").show();
    $("#nav-logout").hide();
    $("#register-container").hide();
    $("#add-todo-container").hide();
    $("#todo-list-container").hide();
    $("#add-todo").hide();
    $("#weather").hide();
    $("#update-todo-container").hide();
  } else {
    getTodos();
    weather();
    $("#nav-logout").show();
    $("#add-todo").show();
    $("#weather").show();
    $("#todo-list-container").slideDown();
    $("#greeting").hide();
    $("#add-todo-container").hide();
    $("#login-container").hide();
    $("#register-container").hide();
    $("#update-todo-container").hide();
  }
}

// ============= Buttons =====================
function clickRegister() {
  $("#click-register").on("click", (e) => {
    e.preventDefault();
    $("#register-container").show(500);
    $("#login-container").hide();
    $("#google-login").hide();
  })
}

function addTodoClick() {
  $("#add-todo").on("click", (e) => {
    e.preventDefault();
    $("#error-container").remove();
    $("#add-todo-container").toggle(500);
    $("#update-todo-container").hide();
    $("#todo-list-container").show(500);

  })
}

function cancleEdit() {
  $("#error-container").remove();
  $("#update-todo-container").hide();
  $("#todo-list-container").slideDown();
}



//* ==================== Login & Registrer =====================

function login() {
  const email = $("#login-email").val();
  const password = $("#login-password").val();

  console.log(email, password);
  $.ajax({
    url: `${url}users/login`,
    method: "POST",
    data: { email, password }
  })
  .done(res => {
    console.log(res);
    localStorage.setItem("token", res.accessToken);
    auth();
    $("#error-container").remove();
  })
  .fail((xhr, text) => {
    const err = JSON.parse(xhr.responseText)
    $("#error-container").remove();
    $("#login-container").prepend(`
    <div id="error-container" class="bg-danger text-white">
    <p>${err.errors}</p>
    </div>`)
    console.log(xhr.responseJSON);
  })
  .always(_ => {
    $("#login-form").trigger("reset")
  })

} 

function register() {
  const email = $("#register-email").val();
  const password = $("#register-password").val();
  const city = $("#register-city").val();
  console.log(email, password, city);


  $.ajax({
    url: `${url}users/register`,
    method: "POST",
    data: { email, password, city }
  })
  .done((res) => {
    console.log(res);
    auth();
    $("#error-container").remove();

  })
  .fail((xhr, text) => {
    console.log(xhr, text);
    let err = xhr.responseJSON
    console.log(err);
    $("#error-container").remove();
    $("#register-container").prepend(`
    <div id="error-container" class="bg-danger text-white">
    <p>${err.errors}</p>
    </div>`)
  })
  .always(_ => {
    $("#register-form").trigger("reset")
  })
}

//*==================== CRUD ========================

function addTodo() {
  const title = $("#add-title").val();
  const description = $("#add-description").val();
  const due_date = $("#add-date").val();

  $.ajax({
    url: `${url}todos`,
    method: "POST",
    data: {title, description, due_date },
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done(res => {
    console.log(res);
    getTodos();
    $("#add-todo-container").hide("slow")
    $("#error-container").remove();
  })
  .fail((xhr, text) => {
    console.log(xhr, text);
    const err = xhr.responseJSON
    console.log(err);
    $("#error-container").remove();
    $("#add-todo-container").prepend(`
    <div id="error-container" class="bg-danger text-white">
    <p>${err.errors}</p>
    </div>`)
  })
  .always(_ => {
    $("#add-form").trigger("reset")
  })
}

function getTodos() {
  $.ajax({
    url: `${url}todos`,
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done(data => {
    console.log(data);
    $("#todo-list").empty();
    data.todos.forEach((todo, i) => {
      console.log(todo.status, 'dari list');
      $("#todo-list").append(`
      <div class="card bg-ligt mb-3" style="width: 25rem;" id="todo-${todo.id}">
        <div class="card-header">
          <div class="row">
            <div class="col-8">
              <p class="bg-warning text-white text-center rounded">
                Must be done <br>
                ${data.moment[i]}
              </p>
            </div>
            <div class="col-4">
              <a href = "#" onClick = update(${todo.id}) class="btn btn-outline-primary"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> </a>
              <a href = "#" onClick = destroy(${todo.id}) class="btn btn-outline-danger"> <i class="fa fa-trash" aria-hidden="true"></i> </a>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-9">
              <h5 class="card-title" id="title-${todo.id}">${todo.status ? '<s>' + todo.title + '</s>' : todo.title}</h5>
              <p class="card-text" id="description-${todo.id}">${todo.status ? '<s>' + todo.description + '</s>' : todo.description}</p>
            </div>
            <div class="col-3 text-center">
              <div class="form-check-inline">
                <form id="update-status">
                  <label class="form-check-label" for="complete">
                      <input type="checkbox" onClick= cheklist(${todo.id}) class="form-check-input" id="update-status" ${todo.status ? 'checked' : ''}>
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      `)
    })
  })
  .fail((xhr, text) => {
    console.log(xhr);
    const msg = JSON.parse(xhr['responseText'])
    console.log(msg);
  })
}

function update(todoId) {
  let todo = null;

  $.ajax({
    url: `${url}todos/${todoId}`,
    method: 'GET',
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done(res => {
    todo = res;
    console.log(todo);
    $("#update-form").empty()
    $("#update-form").append(`
      <div class="row">
        <div class="col-5 ms-2">
          <label class="form-label">Title:</label><br>
          <input class="form-control" id="update-title" value="${todo.title}"><br>
        </div>
        <div class="col me-2">
          <label class="form-label">Due Date:</label><br>
          <input class="form-control" type="date" id="update-date" value="${todo.due_date.split('T')[0]}"><br>
        </div>
      </div>
      <div class="row ms-2 me-2 mb-2">
        <label class="form-label">Description:</label><br>
        <textarea class="form-control" id="update-description" cols="10" rows="3">${todo.description}</textarea><br>
      </div>
    
      <a href = "#" onClick = confirmEdit(${todo.id}) class="btn btn-success mt-2"> save </a>
      <a href = "#" onClick = cancleEdit() class="btn btn-danger mt-2"> cancel </a>
    `)
    $("#update-todo-container").slideDown();
    $("#todo-list-container").hide();
    $("#add-todo-container").hide();
  })
  .fail((xhr, text) => {
    console.log(xhr, text);
  })
}

function confirmEdit(todoId) {

  const title = $("#update-title").val();
  const description = $("#update-description").val();
  const due_date = $("#update-date").val();
  // console.log(todoId);
  // console.log(title, description, due_date);

  console.log(`${url}todos/${todoId}`);
  $.ajax({
    url: `${url}todos/${todoId}`,
    method: 'PUT',
    data: {title, description, due_date},
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done(todo => {
    console.log(todo);
    console.log('todo updated');
    $("#error-container").remove();
    $("#update-todo-container").hide();
    getTodos();
    $("#todo-list-container").slideDown();
  })
  .fail((xhr, text) => {
    console.log(xhr, text);
    const err = xhr.responseJSON
    $("#error-container").remove();
    $("#update-todo-container").prepend(`
    <div id="error-container" class="bg-danger text-white">
    <p>${err.errors}</p>
    </div>`)
  })
}

function cheklist(todoId) {
  let todo;
  
  $.ajax({
    url: `${url}todos/${todoId}`,
    method: 'GET',
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done(res => {
    todo = res
    return $.ajax({
      url: `${url}todos/${todoId}`,
      method: 'PATCH',
      data: {
        status: todo.status ? false : true
      },
      headers: {
        token: localStorage.getItem("token")
      }
    })
  })
  .done(response => {
    const updatedTodo = response
    console.log('status: changed');
    console.log(!response.status);
    if(!response.status) {
      $(`#title-${updatedTodo.id}`).html(`
      <h5 class="card-title" id="title-${updatedTodo.id}"><s>${updatedTodo.title}</s></h5>
      `)
      $(`#description-${updatedTodo.id}`).html(`
      <p class="card-text" id="description-${updatedTodo.id}"><s>${updatedTodo.description}</s></p>
      `)
    } else {
      $(`#title-${updatedTodo.id}`).html(`
      <h5 class="card-title" id="title-${updatedTodo.id}">${updatedTodo.title}</h5>
      `)
      $(`#description-${updatedTodo.id}`).html(`
      <p class="card-text" id="description-${updatedTodo.id}">${updatedTodo.description}</p>
      `)

    }
  })
  .fail(err => {
    console.log(err);
  })
}



function destroy(todoId) {
  $.ajax({
    url: `${url}todos/${todoId}`,
    method: 'DELETE',
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done(() => {
    $(`#todo-${todoId}`).remove();
    getTodos();
    console.log('Todo destroyed');
  })
  .fail((xhr, text) => {
    console.log(xhr, text);
  })

}

//* ===================== OAuth Google ========================
function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: `${url}users/googleLogin`,
    method: 'POST',
    data: {
      googleToken: id_token
    }
  })
  .done(res => {
    localStorage.setItem("token", res.accessToken)
    auth();
  })
  .fail((xhr, text) => {
    console.log(xhr, text);
  })  

}


//* ===================== 3rdParty ========================

  function weather() {

    $.ajax({
      url: `${url}weather/`,
      method: "GET",
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .done(res => {
      const location = res.request.query
      const weather = res.current
      const temperature = weather.temperature
      const icon = weather.weather_icons[0]
      const weather_desc = weather.weather_descriptions[0]
      const cloud = weather.cloudcover
      const pressure = weather.pressure
      const getTheDate = res.location.localtime
      const date = new Date(getTheDate)
      const dateString = date.toString().split('G')[0]
      const splitDate = dateString.split(' ')
      const formatedDate = `${splitDate[0]}, ${splitDate[2]} ${splitDate[1]} ${splitDate[3]}`

      $("#weather").empty();
      $("#weather").append(`

      <div class="card-header bg-info">
            <h2>${location}</h2>
          </div>

          <div class="card-body">

            <div class="row">

              <div class="col">
                <img class="card-img"
                  src="${icon}"
                  alt="light-rain">
              </div>

              <div class="col" style="margin-top: 2rem;">
                <h3 class="">${weather_desc}</h3>
              </div>

            </div>

            <h1 class="">${temperature}&#176;C</h1>

            <div class="row">
              <div class="col">
                <p class="">Pressure</p>
                <p class="">${pressure}</p>
              </div>
              <div class="col">
                <p class="">Cloud</p>
                <p class="">${cloud}</p>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <p class="">${formatedDate}</p>
          </div>
      `)
    })
    .fail((xhr, text) => {
      console.log(xhr);
    })

  }



//* ===================== Logout ========================

function logout() {
  localStorage.clear();
  $("#error-container").remove();
  const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(() => {
      console.log('User signed out.');
    });
  auth();
}


//* ================= Document Ready =============================

$(document).ready( () => {
  auth();
  clickRegister();
  addTodoClick();

  $("#register-form").on("submit", (e) => {
    e.preventDefault();
    register();
  })
  
  $("#login-form").on("submit", (e) => {
    e.preventDefault();
    login();
  })


  $("#nav-logout").on("click", (e) => {
    e.preventDefault();
    logout();
  })

  $("#add-form").on("submit", (e) => {
    e.preventDefault();
    addTodo();
  })
  $("#btn-register-cancel").on("click", (e) => {
    e.preventDefault();
    $("#error-container").remove();
    $("#login-container").show(500);
    $("#google-login").show(500);
    $("#register-container").hide();
  })

})