$(document).ready(() => {
  auth()
  $("#login-container").addClass("active")

  $("#nav-login").click(() => {
    $("#login-container").show()
      $("#register-container").hide()
  })

  $("#nav-register").click(() => {
      $("#register-container").show()
        $("#login-container").hide()
  })
  $("#login-ahref").click(() => {
    $("#login-container").show()
  })
  $("#addTodos-nav").click(() => {
    $("#add-todos-container").show()
    $("#list-todos-container").hide()
    $("#update-container").hide()
    $("#available-project-container").hide()
    $("#list-project-container").hide()
  })
  $("#yourTodos").click(() => {
    $("#list-todos-container").show()
    $("#add-todos-container").hide()
    $("#update-container").hide()
    $("#available-project-container").hide()
    $("#list-project-container").show()
  })
  $("#yourProject").click(() => {
    $("#list-todos-container").hide()
    $("#add-todos-container").hide()
    $("#update-container").hide()
    $("#available-project-container").show()
    $("#list-project-container").hide()
  })
  $("#addProject-nav").click(() => {
    $("#list-todos-container").hide()
    $("#add-todos-container").hide()
    $("#update-container").hide()
    $("#add-project-container").show()
    $("#available-project-container").hide()
    $("#list-project-container").hide()
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
    $("#list-todos-container").show()
    $("#add-todos-container").hide()
  })
  // Update todos
  $("#update-todos-form").on("submit", (event) => {
    event.preventDefault()
    const title = $("#titleTodosUpdate").val()
    const description = $("#descriptionTodosUpdate").val()
    const due_date = $("#due_dateTodosUpdate").val()
    const id = $("#update-todos-form").find('input[name=todo_id]').val();
    $.ajax({
        url: base_url + "todos/" + id,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title,
          description,
          due_date
        }
    })
      .done(data => {
        Swal.fire(
          'Good job!',
          'Updated Succesfully',
          'success'
        )
        auth()
      })
      .fail((err, status) => {
        console.log(err, status)
      })
  })

  $("#nav-logout").on("click", (event) => {
    event.preventDefault()
    logout()
  })
})