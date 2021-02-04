const baseurl = "http://localhost:3001/"

function auth() {
  if(!localStorage.getItem("token_key")) {
    $("#login-form").show();
    $("#nav-logout").hide();
    $("#add-todo").hide();
    $("#todo-list").hide();
  } else {
    $("#login-form").hide();
    $("#nav-logout").show();
    $("#add-todo").show();
    $("#todo-list").show();

  }
}

function login() {
  const email = $("#loginEmail").val();
  const password = $("#loginPassword").val();
  console.log(email, password)
}

function register() {}

function addTodo() {}

function getTodos() {
  $.ajax({
    url: baseurl + 'todos',
    method: "GET",
    headers: {token_key: localStorage.getItem('token_key')}
  })
  .done(todos => {
    $("#todo-list").empty();
    data.foreach(el => {
      $("#todo-list").append(`
      <tr>
        <td>${el.title}</td>
        <td>${el.description}</td>
        <td>${el.status}</td>
        <td>${el.due_date}</td>
      </tr>
      `)
    })
  })
  .fail((err) => {
    console.error(err)
  })
}

// function editTodo() {
//   $.ajax({
//     url: baseurl + `todos/${id}`,
//     method: "PUT",
//     headers: {token_key: localStorage.getItem('token_key')}
//   })
//   .done(edits => {
//     $("#")
//   })
// }

function deleteTodo() {}

$(document).ready(() => {
  auth()

  $("#login-form").on("submit", (el) => {
    el.preventDefault();
    $.ajax({
      url: baseurl + 'login',
      method: 'POST',
      data: {email, password}
    })
    .done(user => {
      localStorage.setItem('token_key', data.token_key);
      getTodos()
    })
  })
})
