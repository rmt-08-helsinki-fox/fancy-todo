const baseUrl = 'http://localhost:3000/'

$(document).ready(function() {
  authenticate()
})

function authenticate() {
  if (localStorage.access_token) {
    $('#logout-navbar').show();
    $('#home-navbar').show();
    $('#login-form').hide();
    $('#register-form').hide();
    $('#main-page').show();
    $('#form-add-todo').hide();
    $('#btn-cancel-add-form').hide();
    $('#btn-add-todo').show();
    fetchTodo()
  } else {
    $('#logout-navbar').hide();
    $('#home-navbar').hide();
    $('#login-form').show();
    $('#register-form').hide();
    $('#main-page').hide();
  }
}

function registerbtn(event) {
  event.preventDefault();
  $('#logout-navbar').hide();
  $('#home-navbar').hide();
  $('#login-form').hide();
  $('#register-form').show();
  $('#main-page').hide();
}

function loginbtn(event) {
  event.preventDefault();
  authenticate()
}

function register(event) {
  event.preventDefault();
  const email = $('#input-email-register').val()
  const password = $('#input-password-register').val()

  $.ajax({
    url: baseUrl + 'register',
    method: 'POST',
    data: {
      email,
      password
    }
  })
    .done(data => {
      authenticate()
    })
    .fail(err => {
      const errors = err.responseJSON.message.errors
      let outputError = []
      errors.forEach(error => {
        outputError.push(error.message)
      })
      
      Swal.fire(outputError.join('\n'))
    })
    .always(_ => {
      $('#input-email-register').val('')
      $('#input-password-register').val('')
    })
}

function login(event) {
  event.preventDefault();
  const email = $('#input-email-login').val()
  const password = $('#input-password-login').val()

  $.ajax({
    url: baseUrl + 'login',
    method: 'POST',
    data: {
      email,
      password
    }
  })
    .done(data => {
      localStorage.setItem('access_token', data.access_token)
      authenticate()
    })
    .fail(err => {
      Swal.fire(err.responseJSON.message)
    })
    .always(_ => {
      $('#input-email-login').val('')
      $('#input-password-login').val('')
    })
}

function logout() {
  localStorage.clear();
  authenticate();
}

function btnAddtodo() {
  $('#form-add-todo').show()
  $('#btn-cancel-add-form').show()
  $('#btn-add-todo').hide()
}

function addTodo(event) {
  event.preventDefault();
  const title = $('#title-todo').val()
  const description = $('#desc-todo').val()
  const due_date = $('#date-todo').val()
  const access_token = localStorage.access_token

  $.ajax({
    url: baseUrl + 'todos',
    method: 'POST',
    data: {
      title,
      description,
      due_date
    },
    headers: {
      access_token
    }
  })
    .done(response => {
      authenticate()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
    .always(_ => {
      $('#title-todo').val('')
      $('#desc-todo').val('')
      $('#date-todo').val('')
    })
}

function fetchTodo() {
  const access_token = localStorage.access_token

  $.ajax({
    url: baseUrl + 'todos',
    method: 'GET',
    headers: {
      access_token
    }
  })
    .done(response => {
      console.log(response)
      $('#todos').empty();
      response.forEach(todos => {
        if(todos.status === false) {
          $('#todos').append(`
          <div class="card-block">
            <h4 class="card-title">${todos.title}</h4>
            <p>${todos.description}</p>
            <a href="" class="btn btn-primary btn-sm">Edit</a>
            <a href="" class="btn btn-primary btn-sm">Delete</a>
            <a href="" class="btn btn-danger btn-sm">Not Done</a>
          </div>
          `)
        } else {
          $('#todos').append(`
          <div class="card-block">
            <h4 class="card-title">${todos.title}</h4>
            <p>${todos.description}</p>
            <a href="" class="btn btn-primary btn-sm">Edit</a>
            <a href="" class="btn btn-primary btn-sm">Delete</a>
            <a href="" class="btn btn-success btn-sm">Done</a>
          </div>
          `)
        }
      })
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}