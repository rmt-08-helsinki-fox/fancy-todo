const url = 'http://localhost:4000/';


function auth() {
  if (!localStorage.getItem("token")) {
    $("#main-login").hide();
    $("#login-container").show();
    $("#google-login").show();
    $("#nav-logout").hide();
    $("#register-container").hide();
    $("#add-todo-container").hide();
    $("#todo-list-container").hide();
    $("#add-todo").hide();
    $("#update-todo-container").hide();
  } else {
    getTodos();
    $("#nav-logout").show();
    $("#add-todo").show();
    $("#todo-list-container").show();
    $("#add-todo-container").hide();
    $("#login-container").hide();
    $("#register-container").hide();
    $("#update-todo-container").hide();
    $("#google-login").hide();
    $("#main-login").hide();
  }
}

//* bikinin attribute onClick aja
function clickRegister() {
  $("#click-register").on("click", (e) => {
    e.preventDefault();
    $("#register-container").toggle();
    $("#login-container").hide();
    $("#google-login").hide();
  })
}

function addTodoClick() {
  $("#add-todo").on("click", (e) => {
    e.preventDefault();
    $("#add-todo-container").toggle();
    $("#todo-list-container").slideDown();
    $("#update-todo-container").hide();

  })
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
  })
  .fail((xhr, text) => {
    const err = JSON.parse(xhr.responseText)
    $("#error-container").remove();
    $("#login-container").prepend(`
    <div id="error-container" class="bg-danger text-white">
    <p>${err.errors}</p>
    </div>`)
    console.log(JSON.parse(xhr.responseText));
    console.log(xhr);
    console.log(xhr.responseJSON);
  })
  .always(_ => {
    $("#login-form").trigger("reset")
  })

} 

function register() {
  const email = $("#register-email").val();
  const password = $("#register-password").val();
  console.log(email, password);


  $.ajax({
    url: `${url}users/register`,
    method: "POST",
    data: { email, password }
  })
  .done((res) => {
    console.log(res);
    auth();
    $("#main-login").show();
    $("#login-form").show();
  })
  .fail((xhr, text) => {
    console.log(xhr, text);
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
  })
  .fail((xhr, text) => {
    console.log(xhr, text);
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
              <h5 class="card-title">${todo.title}</h5>
              <p class="card-text">${todo.description}</p>
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
      <label>Title:</label><br>
      <input id="update-title" value="${todo.title}"><br>
      <label>Description:</label><br>
      <textarea id="update-description" cols="20" rows="8">${todo.description}</textarea><br>
      <label>Due Date:</label><br>
      <input type="date" id="update-date" value="${todo.due_date.split('T')[0]}"><br>

      <a href = "#" onClick = confirmEdit(${todo.id}) class="btn btn-success btn-sm mt-2"> save </a>
      <a href = "#" onClick = cancleEdit() class="btn btn-danger btn-sm mt-2"> cancel </a>
    `)
    $("#update-todo-container").slideDown();
    $("#todo-list-container").hide();
    $("#add-todo-container").hide();
  })
  .fail((xhr, text) => {
    console.log(xhr, text);
  })
}

function cancleEdit() {
  $("#update-todo-container").hide();
  $("#todo-list-container").slideDown();
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
    $("#update-todo-container").hide();
    getTodos();
    $("#todo-list-container").slideDown();
  })
  .fail((xhr, text) => {
    console.log(xhr, text);
    console.log(xhr.responseText);
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
    !response.status ? $(`#todo-${todo.id}`).addClass("opacity-1") : $(`#todo-${todo.id}`).removeClass("opacity-1")
    console.log('status: changed');
    console.log(!response.status);
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
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

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
      const time = res.location.localtime
      const date = new Date(time)
      const dates = date.toString().split('G')[0]
      const take = dates.split(' ')
      const output = `${take[0]}, ${take[2]} ${take[1]} ${take[3]}`
      // console.log(time);
      // console.log(res);
      // console.log(location);
      // console.log(icon);
      // console.log(temperature);
      // console.log(weather_desc);
      // console.log(cloud);
      // console.log(pressure);
      // console.log(dates);

      $("#weather").empty();
      $("#weather").append(`

      <div class=" text-center">
          <div class="card">
              <h2 class="card-header">${location}</h2>
              <p class="">${weather_desc}</p>
              <h1 class="">${temperature}&#176;C</h1>
              <p class="">Pressure: ${pressure}</p>
              <p class="">Cloud: ${cloud}</span></p>
              <p class="">${output}</p>
          </div>
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
  const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(() => {
      console.log('User signed out.');
    });
  auth();
}


//* ================= Jquery =============================

$(document).ready( () => {
  weather()
  auth();
  clickRegister();
  addTodoClick();

  $("#nav-login").on("click", (e) => {
    e.preventDefault();
    $("#main-login").toggle();
    $("#login-container").show();
    $("#google-login").show();
    $("#register-container").hide();
  })

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
    $("#login-container").show();
    $("#google-login").show();
    $("#register-container").hide();
  })

})