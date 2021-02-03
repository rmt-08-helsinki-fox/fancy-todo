$(document).ready(() => {
  checkPage()

  $('#register-button').click((e) => {
    e.preventDefault()
    showRegister()
  })

  $('#login-button').click((e) => {
    e.preventDefault()
    showLogin()
  })

  $('#register-button-submit').click((e) => {
    e.preventDefault()
    register()
  })

  $('#login-button-submit').click((e) => {
    e.preventDefault()
    login()
  })

  $('#logout-nav').click((e) => {
    e.preventDefault()
    logout()
  })

  $('#createTodoButton').click((e) => {
    e.preventDefault()
    showCreate()
  })

  $('#saveCreateModal').click((e) => {
    e.preventDefault()
    createTodo()
  })

})