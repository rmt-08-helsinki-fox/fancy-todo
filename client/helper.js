const base_url = "http://localhost:3000/"
function auth() {
  if(!localStorage.getItem("access_token")) {
    $("#login-container").show()
    $("#register-container").show()
    $("#nav-login").show()
    $("#nav-register").show()
    $("#add-todos-container").hide()
    $("#list-todos-container").hide()
    $("#nav-logout").hide()
    $("#update-container").hide()
  } else {
    $("#login-container").hide()
    $("#register-container").hide()
    $("#nav-login").hide()
    $("#nav-register").hide()
    $("#nav-logout").show()
    $("#add-todos-container").show()
    $("#list-todos-container").show()
    getTodos()
    $("#update-container").hide()
  }
}

// Login OAuth Google
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: base_url + "users/googleLogin",
    method: "POST",
    data: {
      googleToken:id_token
    }
  })
    .done((response) => {
      // console.log(response)
      localStorage.setItem("access_token", response.access_token)
      auth()
    })
    .fail(err => {
      console.log(err)
    })
}
// Register
function register() {
  const email = $("#emailRegister").val()
  const password = $("#passwordRegister").val()
  $.ajax({
    url: base_url + "users/register",
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done((response) => {
      console.log(response)
    })
    .fail((xhr, status) => {
      console.log(xhr, status)
    })
    .always(() => {
      $("#register-form").trigger("reset")
    })
}
// Login
function login() {
  const email = $("#emailLogin").val()
  const password = $("#passwordLogin").val()
  $.ajax({
    url: base_url + "users/login",
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done((response) => {
      console.log(response)
      localStorage.setItem("access_token", response.access_token)
      auth()
    })
    .fail((xhr, status) => {
      console.log(xhr, status)
    })
    .always(() => {
      $("#login-form").trigger("reset")
    })
}
// Logout
function logout() {
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  auth()
  $("#login-container").hide()
}
// Get Todos
function getTodos() {
  $.ajax({
    url: base_url + "todos",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(data => {
      $("#tbody-id").empty()
      data.forEach(value => {
        $("#tbody-id").append(`
          <tr>
            <td>${value.title}</td>
            <td>${value.description}</td>
            <td>${value.due_date}</td>
            <td>
              <a href="#" onclick="updateTodos(${value.id})">Update Todos</a> 
              <a class="w3-btn w3-green" href="#" onclick="hapus(${value.id})">Delete Todos</a>
            </td>
          </tr>
        `)
      })
    })
    .fail((xhr, status) => {
      console.log(xhr, status)
    })
}
// Add Todos
function addTodos() {
  const title = $("#titleTodos").val()
  const description = $("#descriptionTodos").val()
  const due_date = $("#due_dateTodos").val()
  $.ajax({
    url: base_url + "todos",
    method: "POST",
    data: {
      title,
      description,
      due_date
    }, 
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(response => {
      console.log(response)
      auth()
    })
    .fail((xhr, status) => {
      console.log(xhr, status)
    })
    .always(() => {
      $("#add-todos-form").trigger("reset")
    })
}

function updateTodos(id) {
  $("#add-todos-container").hide()
  $("#list-todos-container").hide()
  $("#update-container").show()
  
  $.ajax({
    url: base_url + "todos/" + id,
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done((dataFindById) => {
      $("#titleTodosUpdate").val(dataFindById.title)
      $("#descriptionTodosUpdate").val(dataFindById.description)
      $("#due_dateTodosUpdate").val(dataFindById.due_date.substring(0,10))
    })
    .fail((err, status) => {
      console.log(err, status)
    })
}

function updateTodosById() {
  const title = $("#titleTodosUpdate").val()
  const description = $("#descriptionTodosUpdate").val()
  const due_date = $("#due_dateTodosUpdate").val()
    $.ajax({
        url: base_url + "todos/" + id,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title,
          description,
          due_date
        }
    })
}
function hapus(id) {
  $.ajax({
    url: base_url + "todos/" + id,
    method: "DELETE",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(() => {
      getTodos()
    })
    .fail((err, status) => {
      console.log(err, status)
    })
}
