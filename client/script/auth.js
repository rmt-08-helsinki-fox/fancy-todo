const auth = () => {
  if (localStorage.getItem("access_token")) {
    $("#page-title").show();
    $("#list-todo").show();
    $("#add-container").hide();
    $("#login-container").hide();
    $("#register-container").hide();
  } else {
    $("#page-title").hide();
    $("#list-todo").hide();
    $("#add-container").hide();
    $("#login-container").show();
    $("#register-container").hide();
  }
}

$(document).ready(() => {

  // login
  $("#btn-login").on("click", e => {
    e.preventDefault()
    const email = $("#email-login").val()
    const password = $("#password-login").val()

    $.ajax({
      method: "POST",
      url: "http://localhost:3001/login",
      data: {
        email, password
      }
    })
    .done( res => {
      localStorage.setItem("access_token", res.access_token)
      auth()
    })
    .fail( err => {
      swal("Something Wrong", err.responseJSON.error, "error")
    })
  })

  // register
  $("#btn-register").on("click", e => {
    e.preventDefault()
    const email = $("#email-register").val()
    const password = $("#password-register").val()

    $.ajax({
      method: "POST",
      url: "http://localhost:3001/register",
      data: {
        email, password
      }
    })
    .done( res => {
      swal("Great!", res.message, "success")
      $("#login-container").show();
      $("#register-container").hide();
    })
    .fail( err => {
      swal("Something Wrong", err.responseJSON.errors.join(', '), "error")
    })
    .always( _=> {
      $("#form-register").trigger("reset")
    })
  })
  
  // login & register route
  $("#register").on("click", (e) => {
    e.preventDefault()
    $("#login-container").hide();
    $("#register-container").show();
  })
  $("#login").on("click", (e) => {
    e.preventDefault()
    $("#login-container").show();
    $("#register-container").hide();
  })
})

$("#btn-logout").on("click", () => {
  localStorage.clear()
  auth()
})

auth()