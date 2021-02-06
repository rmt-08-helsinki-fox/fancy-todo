const base_url = "http://localhost:3000/"
function auth() {
  if(!localStorage.getItem("access_token")) {
    $("#login-container").show()
    $("#register-container").hide()
    $("#nav-login").show()
    $("#nav-register").show()
    $("#add-todos-container").hide()
    $("#list-todos-container").hide()
    $("#nav-logout").hide()
    $("#update-container").hide()
    $("#yourTodos").hide()
    $("#addTodos-nav").hide()
    $("#yourProject").hide()
    $("#available-project-container").hide()
    $("#list-project-container").hide()
  } else {
    $("#login-container").hide()
    $("#register-container").hide()
    $("#nav-login").hide()
    $("#nav-register").hide()
    $("#nav-logout").show()
    $("#add-todos-container").hide()
    $("#available-todos-container").show()
    $("#update-container").hide()
    $("#yourTodos").show()
    $("#addTodos-nav").show()
    $("#yourProject").show()
    getTodos()
    $("#list-todos-container").show()
    $("#available-project-container").hide()
    getProject()
    $("#list-project-container").show()
    userProjectList()
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
      Swal.fire(
        'Register Succes!',
        'Kamu dapat login sekarang'
      )
    })
    .fail((xhr, status) => {
      console.log(xhr)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: xhr.responseJSON.error.join('<br/>')
      })
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: xhr.responseJSON,
      })
    })
    .always(() => {
      $("#login-form").trigger("reset")
    })
}
// Logout
function logout() {
  localStorage.clear()
  auth()
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
  });
  $("#login-container").show()
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
      data.forEach((value,i) => {
        $("#tbody-id").append(`
          <tr>
            <td>${value.title}</td>
            <td>${value.description}</td>
            <td>${value.due_date}</td>
            <td>${value.status ? 'Finished' : 'Pending'}</td>
            <td>
              <a class="btn btn-success"href="#" onclick="updateTodosStatus(${value.id},${value.status})">Update Status</a>
              <a class="btn btn-primary" href="#" onclick="updateTodos(${value.id})">Update Todos</a> 
              <a class="btn btn-danger" href="#" onclick="hapus(${value.id})">Delete Todos</a>
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: xhr.responseJSON.error.join('<br/>')
      })
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
      $("#update-todos-form").find('input[name=todo_id]').val(id);
      $("#titleTodosUpdate").val(dataFindById.title)
      $("#descriptionTodosUpdate").val(dataFindById.description)
      $("#due_dateTodosUpdate").val(dataFindById.due_date.substring(0,10))
    })
    .fail((err, status) => {
      console.log(err, status)
    })
}

function updateTodosStatus(id,currentStatus) {
  let status = !currentStatus;
  $.ajax({
    url: base_url + 'todos/' + id,
    method: "PATCH",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data:{
      status
    }
  })
    .done(response => {
      Swal.fire(
        'Good job!',
        'Updated status succes',
        'success'
      )
      auth()
    })
    .fail((xhr, status) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: xhr.responseJSON,
      })
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

function getProject() {
  $.ajax({
    url: base_url + "todos/projectList",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(data => {
    $("#tbody-id-project").empty()
    data.forEach((value,i) => {
      $("#tbody-id-project").append(`
        <tr>
          <td id="title-${i}">${value.title}</td>
          <td id="url-${i}">${value.url}</td>
          <td>
            <a href="#" onclick="addProject(${i})">Add Project</a>
          </td>
        </tr>
      `)
    })
  })
  .fail((xhr, status) => {
    console.log(xhr, status)
  })
}

function addProject(id) {
  const title = $(`#title-${id}`).text()
  const url = $(`#url-${id}`).text()
  $.ajax({
    url: base_url + `todos/addProject`,
    method: "POST",
    data: {
      title,
      url
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(response => {
      auth()
    })
    .fail((xhr,txt) => {
      console.log(xhr,txt)
    })
}

function userProjectList() {
  $.ajax({
    url: base_url + `todos/userProjectList`,
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(dataProject => {
      console.log(dataProject)
      $("#tbody-project-user").empty()
      dataProject.forEach((value,i) => {
        $("#tbody-project-user").append(`
          <tr>
            <td id="id-${i}">${i+1}</td>
            <td id="title-${i}">${value.title}</td>
            <td id="url-${i}">${value.url}</td>
            <td id="userId-">${value.User.email}</td>
            <td align="center" >
              <a class="btn btn-danger" onclick="deleteProject(${value.id})">Delete</a>
            </td>
          </tr>
        `)
      })
    })
    .fail((xhr, status) => {
      console.log(xhr, status)
    })
}

function deleteProject(id) {
  $.ajax({
    url: base_url + `todos/deleteProjectUser/${id}`,
    method: "DELETE",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(response => {
      Swal.fire(
        'Good job!',
        'Succes deleted data',
        'success'
      )
      userProjectList()
    })
    .fail((xhr, status) => {
      console.log(xhr, status)
    })
}