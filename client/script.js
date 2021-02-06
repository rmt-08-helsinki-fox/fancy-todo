const base_url = "http://localhost:3000/"
let targetedTodoId = 0

function auth() {
  if (!localStorage.getItem("token")) {
    $("#main-page").hide()
    $("#edit-page").hide()
    $("#register-page").hide()
    $("#nav-logout").hide()
    $("#nav-register").show()
    $("#homepage").show()
  } else {
    $("#main-page").show()
    $("#edit-page").hide()
    $("#register-page").hide()
    $("#nav-logout").show()
    $("#nav-register").hide()
    $("#homepage").hide()

    getTodo()
    getNews()
  }
}

$(document).ready(function () {
  auth()
  $("#login-form").on('submit', e => {
    e.preventDefault()
    login()
  })
  $("#nav-register-form").on('submit', e => {
    e.preventDefault()
    $("#homepage").hide()
    $("#register-page").show()
  })
  $("#register-form").on('submit', e => {
    e.preventDefault()
    register()
  })
  $("#logout-form").on('submit', e => {
    e.preventDefault()
    logout()
  })
  $("#add-form").on('submit', e => {
    e.preventDefault()
    addTodo()
  })
  $("#edit-form").on('submit', e => {
    e.preventDefault()
    editPost()
  })
  $("#navbar-logo").on('click', e => {
    e.preventDefault()
    auth()
  })
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: base_url + "users/googlesignin",
    data: {
      token: id_token
    }
  })
    .done(response => {
      localStorage.setItem("token", response.token)
      auth()
    })
    .fail(err => {
      console.log(xhr)
      console.log(textStatus)
    })
}

function login() {
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  $.ajax({
    method: "POST",
    url: base_url + "users/login",
    data: {
      email,
      password
    }
  })
    .done(response => {
      localStorage.setItem("token", response.token)
      auth()
    })
    .fail((xhr, textStatus) => {
      $("#error-message-login").text(xhr.responseJSON.errMsg)
      console.log(xhr)
      console.log(textStatus)
    })
    .always(param => {
      $("#login-form").trigger("reset")
    })
}

function logout() {
  localStorage.removeItem("token")
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  auth()
}

function register() {
  const email = $("#register-email").val()
  const password = $("#register-password").val()
  const name = $("#register-name").val()
  $.ajax({
    method: "POST",
    url: base_url + "users/register",
    headers: {
      token: localStorage.getItem("token")
    },
    data: {
      email,
      password,
      name
    }
  })
    .done(response => {
      auth()
    })
    .fail((xhr, textStatus) => {
      $("#error-message-register").text(xhr.responseJSON.errMsg[0])
      console.log(xhr)
      console.log(textStatus)
    })
}

function addTodo() {
  const title = $("#add-title").val()
  const dueDate = $("#add-dueDate").val()
  const description = $("#add-description").val()
  $.ajax({
    method: "POST",
    url: base_url + "todos/add",
    headers: {
      token: localStorage.getItem("token")
    },
    data: {
      title,
      dueDate,
      description
    }
  })
    .done(response => {
      auth()
    })
    .fail((xhr, textStatus) => {
      console.log(xhr)
      console.log(textStatus)
    })
    .always(param => {
      $("#add-form").trigger("reset")
    })
}

function getTodo() {
  $.ajax({
    method: "GET",
    url: base_url + "todos/list",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      $("#table-todo").empty()
      response.map(e => {
        $("#table-todo").append(`
            <tr>
              <td>${e.title}</td>
              <td>${e.description}</td>
              <td>${e.status}</td>
              <td>${e.dueDate}</td>
              <td><a class="btn btn-secondary" href="#" onclick="editTodo(${e.id})">Edit</a> | <a class="btn btn-success" href="#" onclick="updateStatus(${e.id})">Done!</a> | <a class="btn btn-danger" href="#" onclick="deleteTodo(${e.id})">Delete</a></td>
            </tr>
            `)
      })
    })
    .fail((xhr, textStatus) => {
      console.log(xhr, textStatus)
    })
}

function editTodo(todoId) {
  $.ajax({
    method: "GET",
    url: base_url + "todos/" + todoId,
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      targetedTodoId = response.id
      $("#edit-form").empty()
      $("#edit-form").append(`
          <div class="row">
            <div class="col-1">
              <button type="submit" class="btn btn-primary mr-2">Save</button>
            </div>
            <div class="col-5">
              <input type="text" class="form-control" placeholder="Title" name="title" id="edit-title" value="${response.title}">
            </div>
            <div class="col-3">
              <input type="date" class="form-control" placeholder="" name="dueDate" id="edit-dueDate" value="${response.dueDate}">
            </div>
          </div>
          <div class="row">
            <div class="col-8 offset-1 my-2">
              <input type="text" class="form-control" placeholder="Description" name="description" id="edit-description" value="${response.description}">
            </div>
          </div>`)
      $("#main-page").hide()
      $("#edit-page").show()
    })
    .fail((xhr, textStatus) => {
      console.log(xhr)
      console.log(textStatus)
    })
}

function editPost() {
  const title = $("#edit-title").val()
  const dueDate = $("#edit-dueDate").val()
  const description = $("#edit-description").val()
  $.ajax({
    method: "PUT",
    url: base_url + "todos/" + targetedTodoId,
    headers: {
      token: localStorage.getItem("token")
    },
    data: {
      title,
      dueDate,
      description
    }
  })
    .done(response => {
      $("#main-page").show()
      $("#edit-page").hide()
      auth()
    })
    .fail((xhr, textStatus) => {
      console.log(xhr)
      console.log(textStatus)
    })
}

function updateStatus(todoId) {
  $.ajax({
    method: "PATCH",
    url: base_url + "todos/" + todoId,
    headers: {
      token: localStorage.getItem("token")
    },
    data: {
      status: "closed"
    }
  })
    .done(response => {
      auth()
    })
    .fail((xhr, textStatus) => {
      console.log(xhr)
      console.log(textStatus)
    })
}

function deleteTodo(todoId) {
  $.ajax({
    method: "DELETE",
    url: base_url + "todos/" + todoId,
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      auth()
    })
    .fail((xhr, textStatus) => {
      console.log(xhr)
      console.log(textStatus)
    })
}

function getNews() {
  $.ajax({
    method: "GET",
    url: base_url + "nyt",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(data => {
      $("#news-content").empty()
      data.map(element => {
        $('#news-content').append(`
        <div class="card">
          <img class="card-img-top img-fluid" src="${element.imageUrl}" alt="">
          <div class="card-body card-news-content">
            <h6 class="card-title">${element.title}</h6>
            <a class="card-text btn btn-block btn-primary card-text-news" href="${element.url}" target="_blank">Read More</a>
          </div>
        </div>
      `)
      })
    })
    .fail((xhr, status) => {
      console.log(xhr, status);
    })
}
