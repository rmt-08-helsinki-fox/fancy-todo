const baseUrl = `http://localhost:3000`;

function auth() {
  if (localStorage.getItem("access_token")) {
    $("#register").hide()
    $("#login").show()
    $(".g-signin2").hide()
    $("#home-nav").show()
    $("#edit-user-nav").show()
    $("#logout-nav").show()
    $("#home").show()
    getTodo()
  } else {
    $("#login").show()
    $("#register").hide()
    $(".g-signin2").show()
    $("#home-nav").hide()
    $("#edit-user-nav").hide()
    $("#logout-nav").hide()
    $("#home").hide()
  }
}

function login() {
  const email = $("#loginEmail").val();
  const password = $("#loginPassword").val();
  $.ajax({
    url: `${baseUrl}/user/login`,
    method: "POST",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      localStorage.setItem("access_token", response.access_token)
      localStorage.setItem("full_name", response.full_name)
      localStorage.setItem("email", response.email)
      localStorage.setItem("city", response.city)
      auth()
    })
    .fail((xhr, text) => {
      swal("Login failed", "Invalid Email or Password", "error")
      console.log(xhr, text)
    })
    .always((_) => {
      $("#form-login").trigger("reset")
    })
}

function register() {
  const full_name = $("#inputNama").val()
  const city = $("#inputCity").val()
  const email = $("#inputEmail").val()
  const password = $("#inputPassword").val()
  $.ajax({
    url: `${baseUrl}/user/register`,
    method: "POST",
    data: {
      full_name,
      city,
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

function getTodo() {

}

function updateUser() {

}

function updateTodo() {

}


// ---------------------------------------
$(document).ready(() => {
  auth()

  $('#form-login').on("submit", (e) => {
    e.preventDefault()
    login()
  })

  $("#link-register").on("click", (e) => {
    e.preventDefault()
    $("#title-sign").text("Register")
    $("#register").show()
    $("#email-section-input").show()
    $("#direct-login").show()
    $("#login").hide()
  })

  $('#form-register').on("submit", (e) => {
    e.preventDefault()
    if (localStorage.getItem("access_token")) {
      getTodo()
      updateUser()
      updateTodo()
    } else {
      register()
    }
  })
})