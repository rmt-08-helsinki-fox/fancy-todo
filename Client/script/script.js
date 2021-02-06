const baseurl = "http://localhost:3001/"

function auth() {
  if(!localStorage.getItem("token_key")) {
    $("#login-form").show();
    $("#register-form").show();
    $("#add-todo").hide();
    $("#todo-list").hide();
  } else {
    $("#login-form").hide();
    $("#register-form").hide();
    $("#add-todo").show();
    $("#todo-list").show();
    getTodos()
  }
}

function login() {
  const email = $("#loginEmail").val();
  const password = $("#loginPassword").val();
  console.log(email, password)

  $.ajax({
    url: baseurl + "login",
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done(response => {
    localStorage.setItem("token_key", response.token_key)
    auth()
  })
  .fail((err, text) => {
    console.log({err, text})
  })
}

function register() {
  const regEmail = $("#registerEmail").val()
  const regPassword = $("registerPassword").val()

  $.ajax({
    url: baseurl + "register",
    method: "POST",
    data: {
      regEmail,
      regPassword
    }
  })
  .done(response => {
    $("#login-form").show();
    $("#nav-logout").hide();
    $("#add-todo").hide();
    $("#todo-list").hide();
  })
  .fail((err, text) => {
    console.log({err, text})
  })
  .always(() => {
    $("#registerEmail").val()
    $("registerPassword").val()
  })
}

function addTodo() {
  const title = $("#addTitle").val()
  const description = $("#addDescription").val()
  const status = $("#addStatus").val()
  const due_date = $("#addDue").val()

  $.ajax({
    url: baseurl + "todos/",
    method: "POST",
    data: {
      title,
      description,
      status,
      due_date
    },
    headers: {token_key: localStorage.getItem('token_key')}
  })
  .done(todos => {
    $("#todo-list").empty()
    auth()
  })
  .fail((err, text) => {
    console.log(err, text);
  })
}

function getTodos() {
  $.ajax({
    url: baseurl + 'todos/',
    method: "GET",
    headers: {token_key: localStorage.getItem('token_key')}
  })
  .done(todos => {
    $("#todo-list").empty();
    todos.foreach(el => {
      $("#todo-container").append(`
      <tr>
        <td>${el.title}</td>
        <td>${el.description}</td>
        <td>${el.status}</td>
        <td>${el.due_date}</td>
        <td>
          <a href="">Edit</a>
          <a href="">Delete</a>
        </td>
      </tr>
      `)
    })
  })
  .fail((err, text) => {
    console.error({err, text})
  })
}

// function findTodo(id) {
//   $.ajax({
//     url: baseurl + `todos/${id}`,
//     method: 'GET',
//     headers: {token_key: localStorage.getItem('token_key')}
//   })
//   .done(todos => {

//   })
// }
function editTodo() {
  const title = $("#editTitle").val()
  const description = $("#editDescription").val()
  const status = $("#editStatus").val()
  const due_date = $("editDue").val()
  $.ajax({
    url: baseurl + `todos/${id}`,
    method: "PUT",
    headers: {
      token_key: localStorage.getItem('token_key')
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
  .done(edits => {
    auth()
  })
  .fail((err, text) => {
    console.log(err, text)
  })
  .always(() => {
    $("#editTodo").trigger("reset")
  })
}

function deleteTodo(id) {
  $.ajax({
    url: baseurl + `todos/${id}`,
    method: 'DELETE',
    headers: {
      token_key: localStorage.getItem('token_key')
    }
  })
  .done(() => {
    $("deleteTodo").remove()
  })
  .fail((err, text) => {
    console.log(err, text)
  })
}

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  const token_id = googleUser.getAuthResponse().token_id;
  $.ajax({
    url: baseurl + "googleLogin",
    method: "POST",
    data: {
      googleToken: token_id
    }
  })
  .done(user => {
    localStorage.setItem("token_key", response.token_key)
    auth()
  })
  .fail((err, text) => {
    console.log(err, text)
  })
}


$(document).ready(() => {
  auth()

  $("#login-form").on("click", (el) => {
    el.preventDefault()
    login()
  })

  $("#loginBtn").on("submit", (el) => {
    el.preventDefault()

  })

  $("#register-form").on("submit", (el) => {
    el.preventDefault()
    $("#login-form").hide();
    $("#nav-logout").hide();
    $("#register-form").show();
    $("#todo-list").hide();
  })


})
