// const baseUrl = "https://fancy-todo-hacktiv.herokuapp.com/"
const baseUrl = "http://localhost:3000"

let editStatusId = 0;
let editTodoId = 0;

function auth() {
  if(!localStorage.getItem("accessToken")) {
    $("#logout-link").hide()
    $("#alert").hide()
    $("#login-container").show()
    $("#register-container").hide()
    $("#todo-page").hide()
    $("#addTodo-page").hide()
    $("#editTodo-page").hide()
    $("#editStatus-page").hide()
    $("#news-page").hide()


  } else {
    $("#logout-link").show()
    $("#alert").hide()
    $("#login-container").hide()
    $("#register-container").hide()
    $("#todo-page").show()
    $("#addTodo-page").hide()
    $("#editTodo-page").hide()
    $("#editStatus-page").hide()
    $("#news-page").show()

    showNews()
    showTodo()
  }
}

function notification(errors) {
  $("#alert").text(errors)
  $("#alert").show()
  setTimeout(() => {
    $("#alert").text('')
    $("#alert").hide()
  }, 2000)
}

function linkHome() {
  $("#todo-page").show()
  $("#news-page").show()
  $("#addTodo-page").hide()
  $("#editStatus-page").hide()
  $("#editTodo-page").hide()
}

function registerLink() {
  $("#login-container").hide()
  $("#register-container").show()
  $("#register-link").hide()
  $("#logout-link").hide()
  $("#login-link").show()
  $("#register-container").show()
}

function loginLink() {
  $("#login-container").show()
  $("#register-container").hide()
  $("#register-link").show()
  $("#logout-link").hide()
  $("#login-link").hide()
  $("#register-container").hide()
}

function linkAddTodo(done) {
  if (done) {
    $("#todo-page").show()
    $("#addTodo-page").hide()
    $("#news-page").show()
  } else {
    $("#todo-page").hide()
    $("#addTodo-page").show()
    $("#news-page").hide()
  }
}

function linkEditStatus(done) {
  if (done) {
    $("#todo-page").show()
    $("#editStatus-page").hide()
    $("#news-page").show()
  } else {
    $("#todo-page").hide()
    $("#editStatus-page").show()
    $("#news-page").hide()
  }
}

function linkEditTodo(done) {
  if (done) {
    $("#todo-page").show()
    $("#editTodo-page").hide()
    $("#news-page").show()
  } else {
    $("#todo-page").hide()
    $("#editTodo-page").show()
    $("#news-page").hide()
  }
}

function login() {
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  $.ajax({
    url: `${baseUrl}/login`,
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done((response) => {
    localStorage.setItem("accessToken", response.accessToken)
    auth()
  })
  .fail(({responseText}, text) => {
    notification(responseText.message)
  })
  .always(() => {
    $("#login").trigger("reset")
  })
}

function logout() {
  localStorage.clear()
  let auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut()
  auth()
}

function register() {
  const name = $("#register-name").val()
  const email = $("#register-email").val()
  const password = $("#register-password").val()
  $.ajax({
    url: `${baseUrl}/register`,
    method: "POST",
    data: {
      name,
      email,
      password
    }
  })
  .done(() => {
    auth()
  })
  .fail(({responseText}, text) => {
    notification(responseText)
  })
  .always(() => {
    $("#register").trigger("reset")
  })
}

function showTodo() {
  $.ajax({
    url: `${baseUrl}/todos`,
    method: "GET",
    headers: {
      token: localStorage.getItem("accessToken")
    }
  })
  .done(response => {
    response.forEach((el) => {
      let date = convertDate(el.due_date)
      $("#todo-pages").append(`
        <tr id="all-todo-${el.id}">
          <td>${el.title}</td>
          <td>${el.description}</td>
          <td>${el.status}</td>
          <td>${date}</td>
          <td>
            <a href="#" onclick="readTodoById(${el.id})" class="text-center" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span> Edit Status</a>
            <a href="#" onclick="readTodoForUpdate(${el.id})" class="text-center" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span> Edit Todo</a>
            <a href="#" onclick="deleteTodo(${el.id})" class="text-center" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Delete</a>
          </td>
        </tr>
      `)
    })
  })
  .fail(({responseText}, text) => {
    notification(responseText)
  })
}

function showNews() {
  $.ajax({
    url: `${baseUrl}/news`,
    method: 'GET',
    headers: {
      token: localStorage.getItem("accessToken")
    }
  })
  .done(news => {
    news.dataAPI.forEach((el) => {
      let date = convertDate(el.publishedAt)
      $("#news-pages").append(`
        <tr id="all-news-${el.id}">
          <td>${el.title}</td>
          <td>${date}</td>
        </tr>
      `)
    })
  })
  .fail(({responseText}, text) => {
    notification(responseText)
  })
}

function addTodo() {
  const title = $("#add-title").val()
  const description = $("#add-description").val()
  const status = $("#add-status").val()
  const due_date = $("#add-due_date").val()
  $.ajax({
    url: `${baseUrl}/todos`,
    method: "POST",
    headers: {
      token: localStorage.getItem("accessToken")
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
  .done(response => {
    $("#todo-page").append(`
        <tr id="all-todo-${response.id}">
          <td>${response.title}</td>
          <td>${response.description}</td>
          <td>${response.status}</td>
          <td>${response.due_date}</td>
          <td>
            <a href="#" onclick="readTodoById(${response.id})">Edit Status</a>
            <a href="#" onclick="readTodoForUpdate(${response.id})">Edit Todo</a>
            <a href="#" onclick="deleteTodo(${response.id})">Delete</a>
          </td>
        </tr>
      `)
    linkAddTodo(true)
  })
  .fail(({responseText}, text) => {
    notification(responseText)
  })
  .always(() => {
    $("#addTodo").trigger("reset")
  })
}

function readTodoForUpdate(id) {
  editTodoId = id
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: "GET",
    headers: {
      token: localStorage.getItem("accessToken")
    }
  })
  .done(todos => {
    let date = convertDate(todos.due_date)
    $("#edit-title").val(todos.title)
    $("#edit-description").val(todos.description)
    $("#edit-status").val(todos.status)
    $("#edit-due_date").val(date)
    linkEditTodo()
  })
  .fail(err => {
    alert('your acoount not authorize')
  })
}

function convertDate(date) {
  if (date) {
  date = new Date(date);
  return [date.getFullYear(), date.getMonth()+1, date.getDate()]
      .map(el => el < 10 ? `0${el}` : `${el}`).join('-');
  } else {
    return date;
  }
}

function readTodoById(id) {
  editStatusId = id
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: "GET",
    headers: {
      token: localStorage.getItem("accessToken")
    }
  })
  .done(todos => {
    $("#editStatus").val(todos.status)
    linkEditStatus()
  })
  .fail(err => {
    alert('your acoount not authorize')
  })
}


function editTodo(id) {
  const title = $("#edit-title").val()
  const description = $("#edit-description").val()
  const status = $("#edit-status").val()
  const due_date = $("#edit-due_date").val()
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: "PUT",
    headers: {
      token: localStorage.getItem("accessToken")
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
  .done(response => {
    $(`#all-todo-${id}`).remove()
    $("#todo-page").append(`
        <tr id="all-todo-${response.id}">
          <td>${response.title}</td>
          <td>${response.description}</td>
          <td>${response.status}</td>
          <td>${response.due_date}</td>
          <td>
            <a href="#" onclick="readTodoById(${response.id})">Edit Status</a>
            <a href="#" onclick="readTodoForUpdate(${response.id})">Edit Todo</a>
            <a href="#" onclick="deleteTodo(${response.id})">Delete</a>
          </td>
        </tr>
      `)
    linkEditTodo(true)
  })
  .fail(({responseText}, text) => {
    notification(responseText)
  })
  .always(() => {
    $("#editTodo").trigger("reset")
  })
}

function editStatus(id) {
  const status = $("#editStatus").val()
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: "PATCH",
    headers: {
      token: localStorage.getItem("accessToken")
    },
    data: {
      status
    }
  })
  .done(response => {
    $(`#all-todo-${id}`).remove()
    $("#todo-page").append(`
        <tr id="all-todo-${response.id}">
          <td>${response.title}</td>
          <td>${response.description}</td>
          <td>${response.status}</td>
          <td>${response.due_date}</td>
          <td>
            <a href="#" onclick="readTodoById(${response.id})">Edit Status</a>
            <a href="#" onclick="readTodoForUpdate(${response.id})">Edit Todo</a>
            <a href="#" onclick="deleteTodo(${response.id})">Delete</a>
          </td>
        </tr>
      `)
    linkEditStatus(true)
  })
  .fail(({responseText}, text) => {
    notification(responseText)
  })
}

function deleteTodo(id) {
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: 'DELETE',
    headers: {
      token: localStorage.getItem("accessToken")
    }
  })
  .done(() => {
    $(`#all-todo-${id}`).remove()
    // auth()
  })
  .fail(err => {
    alert('your acoount not authorize')
  })
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    url: `${baseUrl}/googleLogin`,
    method: "POST",
    data: {
      googleToken: id_token
    }
  })
  .done((google) => {
    localStorage.setItem("accessToken", google.accessToken)
    auth()
  })
  .fail(({responseText}, text) => {
    notification(responseText)
  })
}

$(document).ready(() => {
  auth()

  $("#register").on("submit", (e) => {
    e.preventDefault()
    register()
  })

  $("#login").on("submit", (e) => {
    e.preventDefault()
    login()
  })

  $("#addTodo").on("submit", (e) => {
    e.preventDefault()
    addTodo()
  })

  $("#edit-status-todo").on("submit", (e) => {
    e.preventDefault()
    editStatus(editStatusId)
  })

  $("#editTodo").on("submit", (e) => {
    e.preventDefault()
    editTodo(editTodoId)
  })

})