$(document).ready(() => {
  auth()
  $("#login-container").hide()
  $("#nav-register").addClass("active")

  $("#nav-login").click(() => {
    $(this).addClass("active");
      $("#nav-register").removeClass("active")
        $("#login-container").show()
          $("#register-container").hide()
  })

  $("#nav-register").click(() => {
    $(this).addClass("active");
      $("#nav-login").removeClass("active")
          $("#register-container").show()
            $("#login-container").hide()
  })
  // Register
  $("#register-form").on("submit", (event) => {
    event.preventDefault()
    register()
  })
  // Login
  $("#login-form").on("submit", (event) => {
    event.preventDefault()
    login()
  })
  // Google-Login
  $("#googleLogin").on("click", (event) => {
    event.preventDefault()
    onSignIn(googleUser)
  })
  // Add todos
  $("#add-todos-form").on("submit", (event) => {
    event.preventDefault()
    addTodos()
  })
  // Update todos
  $("#update-todos-form").on("submit", (event) => {
    event.preventDefault()
    updateTodosById()
  })

  $("#nav-logout").on("click", (event) => {
    event.preventDefault()
    logout()
  })
})