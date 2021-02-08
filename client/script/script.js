$(document).ready(() => {
  checkPage()

  // anchor from login-form to register-form
  $('#register-button').click((e) => {
    e.preventDefault()
    showRegister()
  })

  // anchor from register-form to login-form
  $('#login-button').click((e) => {
    e.preventDefault()
    showLogin()
  })

  // button submit register-form
  $('#register-button-submit').click((e) => {
    e.preventDefault()
    register()
  })

  // button submit login form
  $('#login-button-submit').click((e) => {
    e.preventDefault()
    login()
  })

  // navbar logout
  $('#logout-nav').click((e) => {
    e.preventDefault()
    logout()
  })

  // navbar add todo
  $('#createTodo-nav').click((e) => {
    e.preventDefault()
    showCreate()
  })

  // button add todo form
  $('#saveCreateModal').click((e) => {
    e.preventDefault()
    createTodo()
  })

  $('#saveCityAllWeather').click((e) => {
    e.preventDefault()
    getAllWeathers()
  })

})