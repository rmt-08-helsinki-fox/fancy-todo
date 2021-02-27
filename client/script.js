const baseUrl = 'https://fancy-todo-list-app.herokuapp.com/'

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function(){

  auth()
  
  $('#navbarSignIn').click(() => {
    $("#sign-out-navbar").hide()
    $("#sign-in-navbar").show()
    $("#sign-up-navbar").show()
    $("#sign-up-page").hide()
    $("#sign-in-page").show()
    $("#addTodo-page").hide()
    $("#editTodo-page").hide()
    $("#noTask").hide()
    $("#todos-table").hide()
  })

  $('#navbarSignUp').click(() => {
    $("#sign-out-navbar").hide()
    $("#sign-in-navbar").show()
    $("#sign-up-navbar").show()
    $("#sign-up-page").show()
    $("#sign-in-page").hide()
    $("#addTodo-page").hide()
    $("#editTodo-page").hide()
    $("#noTask").hide()
    $("#todos-table").hide()
  })

  $('#navbarSignOut').click(() => {
    signOut()

    $("#sign-out-navbar").hide()
    $("#sign-in-navbar").show()
    $("#sign-up-navbar").show()
    $("#sign-up-page").hide()
    $("#sign-in-page").show()
    $("#addTodo-page").hide()
    $("#editTodo-page").hide()
    $("#noTask").hide()
    $("#todos-table").hide()
  })

  $('#signInForm').submit((e) => {
    e.preventDefault()
    signIn()
  })

  $('#signUpForm').submit((e) => {
    e.preventDefault()
    signUp()
  })

  $('#addTodoBtn').click(() => {
    $("#sign-out-navbar").show()
    $("#sign-in-navbar").hide()
    $("#sign-up-navbar").hide()
    $("#sign-up-page").hide()
    $("#sign-in-page").hide()
    $("#editTodo-page").hide()
    $("#addTodo-page").show()
    $("#todos-table").hide()
  })

  $('#addTodoForm').submit((e) => {
    e.preventDefault()
    createTodo()
  })

  $('#editTodoForm').submit((e) => {
    e.preventDefault()
    updateTodo(updateTodoId)
  })

  $('#fancyTodoList').click(() => {
    if (localStorage.getItem('access_token')) {
      $("#editTodo-page").hide()
      $("#addTodo-page").hide()
      $("#todos-table").show()
    }
  })

});