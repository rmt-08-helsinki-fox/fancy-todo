$(document).ready(() => {
  auth()
  $("#data-form-create-todo").on("submit", (e) =>{
    e.preventDefault()
    createTodo()
  })

  $("#link-login").on("click", (e) =>{
    e.preventDefault()
    auth()
  })
  $("#link-register").on("click", (e) =>{
    e.preventDefault()
    register()
  })

  $("#login-form").on("submit", (e) =>{
    e.preventDefault()
    login()
  })

  $("#nav-logout").on("click", (e) => {
    e.preventDefault()
    logout()
  })

  $("#form-register-user").on("submit", (e) =>{
    e.preventDefault()
    createUser()
  })

  $("#id-add-todo").on("click", (e) => {
    e.preventDefault()
    addTodo()
  })

  $("#data-form-edit-todo").on("submit", (e) => {
    e.preventDefault()
    postEditTodo()
  })

  $("#back").on("click", (e) => {
    e.preventDefault()
    auth()
  })
})