const {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  patchTodo,
  getDashboard,
  getTodoMember
} = require("./todo")

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
      url: baseUrl + "/login-google",
      method: "POST",
      data: { id_token },
    })
    .done((response) => {
      localStorage.setItem("access_token", response.access_token);
      authentication();
      $("#dashboard-area").show();
    })
    .fail((err) => {
      $("div.center form .login-error-message").empty();
      err.responseJSON.messages.forEach((errMessage) => {
        $("div.center form .login-error-message").append(`
            <p id="error-register" style="margin: -5px 0; color: red;">${errMessage}</p>
        `);
      });
    })
}

function authentication() {
  if(localStorage.access_token) {
    $("#dashboard-area").show();
    $("#login-area").hide();
    $("#add-todo-area").hide();
    $("#register-area").hide();
    $("#navbar-login").hide();
    $("#navbar-register").hide();
    $("#navbar-logout").show();
    getDashboard();
    $("#anime-area").hide();
  } else {
    $("#navbar-login").show();
    $("#navbar-register").show();
    $("#navbar-logout").hide();
    $("#add-todo-area").hide();
    $("#dashboard").hide();
    $("#register-area").hide();
    $("#login-area").show();
  }
}


function login() {
  const email = $("#login-email").val();
  const password = $("#login-password").val();

  $.ajax({
      url: baseUrl + "/login",
      method: "POST",
      data: { email, password }
    })
    .done(response => {
      localStorage.setItem("access_token", response.access_token)
      getDashboard();
      authentication();
    })
    .fail(errors => {
      $("#login-errors").empty();
      errors.responseJSON.errors.forEach(error => {
        $("#login-errors").prepend(`
            <p style="color: red;">${error}</p>
        `)
      })
    })
}


function register() {
  const email = $("#register-email").val();
  const password = $("#register-password").val();

  $.ajax({
      url: baseUrl + "/register",
      method: "POST",
      data: { email, password }
    })
    .done(response => {
      $("#login-area").show();
      $("#add-todo-area").hide();
      $("#register-area").hide();
      $("#dashboard-area").hide();
    })
    .fail(errors => {
      console.log(errors)
      $("#register-errors").empty();
      errors.responseJSON.errors.forEach(error => {
        $("#register-errors").prepend(`
            <p style="color: red; margin: -5px 0;">${error}</p>
        `)
      })
    })
}

function getUsers(){
  $.ajax({
      url: baseUrl + "/users",
      method: "GET",
      headers: { access_token: localStorage.access_token }
    })
    .done(response => {
      $("#user-list").empty();
      response.forEach((user, i) => {
        $("#user-list").append(`
         <h6 class="card-title">${i+1}. ${user.email}</h6>
        `)
      })
    })
    .fail(err => {
      console.log(err)
    })
}

function getAccount() {
  $.ajax({
      url: baseUrl + "/user",
      method: "GET",
      headers: { access_token: localStorage.access_token }
    })
    .done(user => {
      $("#user-profile").empty().append(`
        <p className="card-text">${user.email}</p>
      `)
    })
    .fail(err => {
      console.log(err)
    })
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

module.exports = {
  authentication,
  onSignIn,
  login,
  register,
  getUsers,
  getAccount,
  signOut
}
