$(document).ready(() => {
    authenticate()
    $("#nav-register").on("click", (e) => {
        e.preventDefault()
        $("#register-form").show();
        $("#login-form").hide()
    })
    $("#nav-login").on("click", (e) => {
        e.preventDefault()
        $("#register-form").hide();
        $("#login-form").show()
    })
    $("#register").on("submit", (e) => {
        e.preventDefault()
        $("p").remove(".error-message");
        register()
    })
    $("#login").on("submit", (e) => {
        e.preventDefault()
        $("p").remove(".error-message");
        login()
    })
    $("#nav-task").on("click", (e) => {
        e.preventDefault();
        $("#todo-table-container").show()
        $("#todo-table").show()
        $("#todo-form").hide()
        $("#todo-form-edit").hide()
        $("#weather-form").hide()
        $("#row-weather2").hide()
        getTodo();
    })
    $("#nav-main").on("click", (e) => {
      e.preventDefault();
        if (localStorage.getItem("access_token")){
          $("p").remove(".error-message");
          $("#todo-table-container").hide()
          $("#todo-table").hide()
          $("#todo-form-edit").hide()
          $("#todo-form").show()
          $("#weather-form").hide()
          $("#row-weather2").hide()
        } else {
          authenticate()
        }
    })
    $("#nav-weather").on("click", (e) => {
      e.preventDefault();
          $("p").remove(".error-message");
          $("#todo-table-container").hide()
          $("#todo-table").hide()
          $("#todo-form-edit").hide()
          $("#todo-form").hide()
          $("#weather-form").show()
          $("#row-weather2").hide()
    })

    $("#todo").on("submit", (e) => {
        e.preventDefault()
        addTodo()
    })
    $("#todo-cancel-edit").on("click", (e) => {
        e.preventDefault()
        $("#todo-form-edit").hide()
        $("#todo-table-container").show()
        $("#todo-table").show()
    })
    $("#location-cancel").on("click", (e) => {
        e.preventDefault()
        $("#weather-form").hide()
        $("#todo-table-container").show()
        $("#todo-table").show()
        getTodo();
    })
    $("#nav-logout").on("click", (e) => {
      e.preventDefault()
      logOut()
    })
    $("#nav-login").on("click", (e) => {
      e.preventDefault()
      $("p").remove(".error-message");
    })
    $("#nav-register").on("click", (e) => {
      e.preventDefault()
      $("p").remove(".success-message");
      $("p").remove(".error-message");
    })
    $("#weather").on("submit", (e) => {
      e.preventDefault()
      console.log("kesini")
      postWeather()
    })
})