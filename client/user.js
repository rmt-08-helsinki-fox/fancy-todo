const baseUrl = "http://localhost:3000/users/"

function authenticate() {
  if (!localStorage.getItem("token")) {
    $("#container-user-signin").show()
    $("#container-user-signup").hide()
    $("#container-todo-all").hide()
    $("#logout").hide()
  } else {
    $("#container-user-signin").hide()
    $("#container-user-signup").hide()
    $("#container-todo-all").show()
    $("#logout").show()
  }
}

function signin() {
  const email = $("#signin-email").val()
  const password = $("#signin-password").val()
  $.ajax({
    method: "POST",
    url: baseUrl + "signIn",
    data: {
      email,
      password
    }
  })
    .done((users) => {
      localStorage.setItem("token", users.accessToken)
      authenticate()
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
    .always(_ => {
      $("#signin-email").val("")
      $("#signin-password").val("")
    })
}

function signup() {
  const email = $("#signup-email").val()
  const password = $("#signup-password").val()
  $.ajax({
    method: "POST",
    url: baseUrl + "signUp",
    data: {
      email,
      password
    }
  })
    .done(_ => {
      authenticate()
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
    .always(_ => {
      $("#signup-email").val("")
      $("#signup-password").val("")
    })
}

function logout() {
  localStorage.clear()
  authenticate()
}

$(document).ready(() => {
  authenticate()
  $("#form-signin").on("submit", (e) => {
    e.preventDefault()
    signin()
  })

  $("#logout").on("click", (e) => {
    e.preventDefault()
    logout()
  })

  $("#show-signup-form").on("click", (e) => {
    e.preventDefault()
    $("#container-user-signin").hide()
    $("#container-user-signup").show()
  })

  $("#form-signup").on("submit", (e) => {
    e.preventDefault()
    signup()
  })

  $("#cancel-signup-form").on("click", (e) => {
    e.preventDefault()
    authenticate()
  })
})