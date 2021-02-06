$(document).ready(() => {
  //navbar "click"
  $("#nav-signOut").on("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    auth()
  })
  $("#nav-signUp").on("click", (e) => {
    e.preventDefault()
    $("#nav-signOut").hide()
    $("#nav-my-todo").hide()
    $("#nav-create").hide()
    $("#nav-home").hide()
    $("#todos").hide()
    $("#nav-signUp").hide()
    $("#nav-signIn").show()
    $("#title-sign").text("Sign Up")
    $("#signUpIn").show()
  })
  $("#nav-signIn").on("click", (e) => {
    e.preventDefault()
    $("#nav-signOut").hide()
    $("#nav-my-todo").hide()
    $("#nav-create").hide()
    $("#todos").hide()
    $("#nav-home").hide()
    $("#nav-signIn").hide()
    $("#nav-signUp").show()
    $("#title-sign").text("Sign In")
    $("#signUpIn").show()
  })
  $("#nav-home").on("click", (e) => {
    e.preventDefault()
  })
  $("#nav-my-todo").on("click", (e) => {
    e.preventDefault()
  })
  $("#nav-create").on("click", (e) => {
    e.preventDefault()
  })
})