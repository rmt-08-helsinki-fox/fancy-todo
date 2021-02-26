const baseUrl = `http://localhost:3000`;

function auth() {
  if (localStorage.getItem("access_token")) {
    $("#form-register").hide()
    $("#form-login").hide()
    $("#navbar").show()
    $("#weather").show()
    $("#todos").show()
    $("#card-add-todo").hide()
    $("#edit-todo").hide()
    getTodo()
  } else {
    $("#form-register").hide()
    $("#form-login").show()
    $("#navbar").hide()
    $("#weather").hide()
    $("#todos").hide()
    $("#card-add-todo").hide()
    $("#edit-todo").hide()
  }
}

$(document).ready(() => {
  auth()
  $("#form-login").on("submit", (e) => {
    e.preventDefault()
    login()
  })
  $("#link-register").on("click", (e) => {
    e.preventDefault()
    $("#form-register").show()
    $("#form-login").hide()
  })
  $('#form-register').on("submit", (e) => {
    e.preventDefault()
    register()
  })
  $("#link-login").on("click", (e) => {
    e.preventDefault()
    $("#form-login").show()
    $("#form-register").hide()
  })
  $("#btn-add").on("click", (e) => {
    e.preventDefault()
    $("#card-add-todo").show()
    $("#cardTodo").hide()
  })
  $("#btn-cancel").on("click", (e) => {
    e.preventDefault()
    $("#card-add-todo").hide()
    $("#cardTodo").show()
  })
  $("#card-add-todo").on("submit", (e) => {
    e.preventDefault()
    addTodo()
    $("#cardTodo").show()
  })
})

function login() {
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  $.ajax({
    url: `${baseUrl}/user/login`,
    method: "POST",
    data: {
      email,
      password,
    }
  })
    .done((response) => {
      localStorage.setItem("access_token", response.access_token)
      auth()
    })
    .fail((xhr, text) => {
      swal("Login failed", xhr.responseJSON.error, "error")
      console.log(xhr, text)
    })
    .always((_) => {
      $("#form-login").trigger("reset")
    })
}

function onSignIn() {
  const token = googleUser.getAuthResponse().id_token
  $.ajax({
    url: `${baseUrl}/user/googlelogin`,
    method: "POST",
    data: {
      token
    },
  })
    .done((response) => {
      console.log(response)
      localStorage.setItem("access_token", response.access_token)
      auth()
    })
    .fail((xhr, text) => {
      console.log(xhr, text)
    })
    .always((_) => {
      $("#form-login").trigger("reset")
    })
}

function register() {
  const full_name = $("#register-fullname").val()
  const email = $("#register-email").val()
  const password = $("#register-password").val()
  $.ajax({
    url: `${baseUrl}/user/register`,
    method: "POST",
    data: {
      full_name,
      email,
      password
    }
  })
    .done((response) => {
      console.log(response)
      auth()
    })
    .fail((xhr, text) => {
      swal("Something Wrong", xhr.responseJSON.error, "error")
      console.log(xhr, text)
    })
    .always(_ => {
      $("#form-register").trigger("reset")
    })
}

function addTodo() {
  const title = $("#add-title").val()
  const due_date = $("#add-date").val()
  const description = $("#add-description").val()
  $.ajax({
    url: `${baseUrl}/todos`,
    method: "POST",
    data: {
      title,
      due_date,
      description
    },
    headers: {
      token: localStorage.getItem("access_token")
    }
  })
    .done((response) => {
      console.log(response)
      $("#card-add-todo").hide()
      getTodo()
    })
    .fail((xhr, text) => {
      swal("Something Wrong", xhr.responseJSON.error[0], "error")
      console.log(xhr, text)
    })
    .always(_ => {
      $("#card-add-todo").trigger("reset")
    })
}

function getTodo() {
  $.ajax({
    url: `${baseUrl}/todos`,
    method: "GET",
    headers: {
      token: localStorage.getItem("access_token")
    }
  })
    .done((todo) => {
      todo.forEach(el => {
        $("#cardTodo").append(`
          <div class="card border-info mb-3 id="detail-card">
            <div class="card-body">
              <input type="checkbox" id="checkbox" onclick="updateStatus(${el.id})">
              <h3>${el.title}</h3>
              <p>Description: ${el.description}</p>
              <p>Due Date: ${el.due_date}</p>
              <a href="#" class="btn btn-primary my-3" onclick="editForm(${el.id})">Edit</a>
              <a href="#" class="btn btn-danger my-3" onclick="deleteTodo(event, ${el.id})">Delete</a>
            </div>
          </div>
        `)
      })
    })
    .fail((xhr, text) => {
      console.log(xhr, text)
    })
}

function editForm(id) {
  $("#cardTodo").hide()
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      token: localStorage.getItem("access_token")
    }
  })
    .done((todo)=> {
      $("#todos").append(`
        <form id="form-edit">
          <div class="mb-3 mx-5 mt-3">
            <h3>Edit Task</h3>
            <label for="edit-title" class="form-label">Title:</label>
            <input type="text" class="form-control" id="edit-title" value="${todo.title}" required>
          </div>
          <div class="mb-3 mx-5">
            <label for="edit-date" class="form-label">Due Date:</label>
            <input type="date" class="form-control" id="edit-date" value="${todo.due_date.split('T')[0]}" required>
          </div>
          <div class="mb-3 mx-5">
            <label for="edit-description" class="form-label">Description:</label>
            <input class="form-control" id="edit-description" value="${todo.description}" required></input>
          </div>
          <div class="text-center">
            <button onclick=updateTodo("${todo.id}") class="btn btn-primary my-3">Save</button>
            <button onclick=cancelEdit(event) class="btn btn-danger my-3">Cancel</button>
          </div>
        </div>
      `)
    })  
    .fail((xhr, text) => {
      console.log(xhr, text)
    })
}

function updateTodo(id) {
  $.ajax({
    method: "PUT",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      token: localStorage.getItem("access_token")
    },
    data: {
      title: $('#edit-title').val(),
      due_date: $('#edit-date').val(),
      description: $('#edit-description').val()
    }
  })
    .done(data => {
      $("#form-edit").hide()
      $("#cardTodo").show()
      getTodo()
    })
    .fail((xhr, text) => {
      swal("Something Wrong", xhr.responseJSON.error[0], "error")
      console.log(xhr, text)
    })
    .always(() => {
      $('#edit-date').val('')
    })
}

function cancelEdit(event) {
  event.preventDefault()
  $("#form-edit").hide()
  $("#cardTodo").show()
}

function deleteTodo(event, id) {
  event.preventDefault()
  $.ajax({
    method: "DELETE",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      token: localStorage.getItem("access_token")
    }
  })
    .done((data) => {
      console.log(data)
      swal("Deleted!", "Refresh to update page", "success")
    })
}

function updateStatus(id) {
  $.ajax({
    method: 'PATCH',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      token: localStorage.getItem("access_token")
    },
    data: {
      status: true
    }
  })
    .done((data) => {
      console.log(data)
    })
}