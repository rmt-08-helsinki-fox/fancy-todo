$(document).ready(() => {
  auth()
  $("#loginLanding").on("click", () => {
    showLogin()
  })
  $("#registerLanding").on("click", () => {
    showRegister()
  })
  $("#login").on("submit", event => {
    event.preventDefault()
    login()
  })
  $("#register").on("submit", event => {
    event.preventDefault()
    register()
  })
  $("#todoListLink").on("click", event => {
    event.preventDefault()
    auth()
  })
  $("#addTodoLink").on("click", event => {
    event.preventDefault()
    showAddTodo()
  })
  $("#logOut").on("click", event => {
    event.preventDefault()
    localStorage.removeItem("access_token")
    googleSignOut()
    auth()
  })
  $("#addTodoForm").on("submit", event => {
    event.preventDefault()
    addTodo()
  })
})

function auth() {
  if (!localStorage.getItem("access_token")) {
    $("#navbar").hide()
    $("#landing").show()
    $("#register").hide()
    $("#login").hide()
    $("#listTodo").hide()
    $("#addTodo").hide()
    $("#editTodo").hide()
    $("#listHoliday").hide()
  } else {
    $("#todoData").empty()
    $("#holidayData").empty()
    $("#navbar").show()
    $("#landing").hide()
    $("#register").hide()
    $("#login").hide()
    $("#listTodo").show()
    $("#addTodo").hide()
    $("#editTodo").hide()
    $("#listHoliday").show()
    getTodos()
    holidays()
  }
}

function showAddTodo() {
  $("#navbar").show()
  $("#landing").hide()
  $("#register").hide()
  $("#login").hide()
  $("#listTodo").hide()
  $("#addTodo").show()
  $("#editTodo").hide()
  $("#listHoliday").hide()
  $("#addTitle").val("")
  $("#addDesc").val("")
  $("#addStatus").val("")
  $("#addDate").val("")
}

function showRegister() {
  $("#landing").hide()
  $("#register").show()
  $("#login").hide()
  $("#listTodo").hide()
  $("#addTodo").hide()
  $("#editTodo").hide()
  $("#listHoliday").hide()
  $("#loginLink").on("click", event => {
    event.preventDefault()
    showLogin()
  })
}

function showLogin() {
  $("#addTodo").hide()
  $("#landing").hide()
  $("#register").hide()
  $("#login").show()
  $("#listTodo").hide()
  $("editTodo").hide()
  $("#listHoliday").hide()
  $("#loginEmail").val("")
  $("#loginPassword").val("")
  $("#registerLink").on("click", event => {
    event.preventDefault()
    showRegister()
  })
}

function googleSignOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut()
    .then(() => {
      console.log("Userh signed out");
    })
}

const baseUrl = "ec2-54-225-190-241.compute-1.amazonaws.com"

function login() {
  const email = $("#loginEmail").val()
  const password = $("#loginPassword").val()
  $.ajax({
    url: baseUrl + "/users/login",
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done(res => {
      localStorage.setItem("access_token", res.access_token)
      auth()
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt)
    })
    .always(_ => {
      $("#login").trigger("reset")
    })
}

function register() {
  const email = $("#registerEmail").val()
  const password = $("#registerPassword").val()
  $.ajax({
    url: baseUrl + `/users/register`,
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done(res => {
      showLogin()
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt, "ini error");
    })
    .always(_ => {
      $("#register").trigger("reset")
    })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    url: baseUrl + `/users/googleLogin`,
    method: "POST",
    data: {
      google_token: id_token,
    },
  })
    .done((res) => {
      localStorage.setItem("access_token", res.access_token)
      auth()
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt)
    })
}

function getTodos() {
  $("#todoData").empty()
  $.ajax({
    url: baseUrl + "/todos",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done((res) => {
      res.forEach((todo, index) => {
        $("#todoData").append(`
        <tr>
          <td>${index + 1}</td>
          <td>${todo.title}</td>
          <td>${todo.description}</td>
          <td>${todo.status} <a href="#" onclick="showEditStatus(${todo.id})" class="btn btn-primary btn-sm">Edit</a></td>
          <td>${todo.due_date.toString().split('T')[0]}</td>
          <td><a href="#" class="btn btn-primary btn-sm" onclick="destroy(${todo.id})">Delete</a> <a href="#" class="btn btn-primary btn-sm" onclick="showEdit(${todo.id})">Edit Data</a></td>
        </tr>
        `)
      })
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt, "error todos");
    })
}

function destroy(id) {
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: "DELETE",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(_ => {
      getTodos()
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt);
    })
}

function addTodo() {
  const title = $("#addTitle").val()
  const description = $("#addDesc").val()
  const status = $("#addStatus").val()
  const due_date = $("#addDate").val()
  $.ajax({
    url: baseUrl + `/todos`,
    method: "POST",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
    .done(res => {
      auth()
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt);
    })
    .always(_ => {
      $("#addTitle").val("")
      $("#addDesc").val("")
      $("#addStatus").val("")
      $("#addDate").val("")
    })
}

function showEdit(id) {
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(res => {
      $("#navbar").show()
      $("#landing").hide()
      $("#register").hide()
      $("#login").hide()
      $("#listTodo").hide()
      $("#addTodo").hide()
      $("#listHoliday").hide()
      $("#editTodo").show()
      $("#editTitle").val(`${res.title}`)
      $("#editDesc").val(`${res.description}`)
      $("#editStatus").val(`${res.status}`)
      $("#editDate").val(`${res.due_date.toString().split('T')[0]}`)
      $("#editTodoForm").on("submit", event => {
        event.preventDefault()
        editTodo(id)
      })
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt);
    })
}

function editTodo(id) {
  const title = $("#editTitle").val()
  const description = $("#editDesc").val()
  const status = $("#editStatus").val()
  const due_date = $("#editDate").val()
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: "PUT",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
    .done(res => {
      auth()
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt);
    })
}

function showEditStatus(id) {
  $("#todoData").empty()
  $.ajax({
    url: baseUrl + "/todos",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done((res) => {
      res.forEach((todo, index) => {
        if (todo.id === id) {
          $("#todoData").append(`
        <tr>
          <td>${index + 1}</td>
          <td>${todo.title}</td>
          <td>${todo.description}</td>
          <td><form action="#" method="post" id="editStatus">
          <select name="status" id="editTodoStatus" value="${todo.status}">
          <option value="done">done</option>
          <option value="not done">not done</option>
          </select>
          <button class="btn btn-primary-sm" type="submit">Submit</button>
          <form></td>
          <td>${todo.due_date.toString().split('T')[0]}</td>
          <td><a href="#" class="btn btn-primary btn-sm" onclick="destroy(${todo.id})">Delete</a> <a href="#" class="btn btn-primary btn-sm" onclick="showEdit(${todo.id})">Edit Data</a></td>
        </tr>
        `)
        } else {
          $("#todoData").append(`
        <tr>
          <td>${index + 1}</td>
          <td>${todo.title}</td>
          <td>${todo.description}</td>
          <td>${todo.status} </a> <a href="#" onclick="showEditStatus(${todo.id})">Edit</a></td>
          <td>${todo.due_date.toString().split('T')[0]}</td>
          <td><a href="#" onclick="destroy(${todo.id})">Delete</a> <a href="#" onclick="showEdit(${todo.id})">Edit Data</a></td>
        </tr>
        `)
        }
      })
      $("#editStatus").on("submit", event => {
        event.preventDefault()
        editTodoStatus(id)
      })
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt, "error todos");
    })
}

function editTodoStatus(id) {
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: "PATCH",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      status: $("#editTodoStatus").val()
    }
  })
    .done(res => {
      auth()
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt, "error todos");
    })
}

function holidays() {
  $.ajax({
    url: baseUrl + "/holidays",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(res => {
      res.forEach((holiday, index) => {
        $("#holidayData").append(`
      <tr>
        <td>${index + 1}
        <td>${holiday.name}</td>
        <td>${holiday.date}</td>
      </tr>
      `)
      })
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt);
    })
}