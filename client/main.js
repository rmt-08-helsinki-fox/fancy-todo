const baseUrl = 'http://localhost:3000/'

$(document).ready(() => {
  auth()
  generateQuotes()

  setInterval(() => {
    generateQuotes()
  }, 10000)

  $('#link-signin').click(event => {
    event.preventDefault()
    generateQuotes()
    $('#signin-form').fadeIn('slow')
    $('#home-page').hide()
    $('#signup-form').hide()
  })

  $('.link-home').click(event => {
    event.preventDefault()
    generateQuotes()
    auth()
    $('#signin-form').hide()
    $('#home-page').fadeIn('slow')
    $('#signup-form').hide()
    $('#show-all-todo').hide()
    if (localStorage.getItem('access_token')) {
      $('#home-text').text(`Have you add your todo today ?`)
    }
  })

  $('#btn-signup').click(event => {
    event.preventDefault()
    $('#home-page').hide()
    $('#signup-form').fadeIn('slow')
  })

  $('#link-signup').click(event => {
    event.preventDefault()
    generateQuotes()
    $('#signin-form').hide()
    $('#home-page').hide()
    $('#signup-form').fadeIn('slow')
  })

  $('#signin-field').on('submit', event => {
    event.preventDefault()
    signin()
  })

  $('#link-signout').click(event => {
    event.preventDefault()
    auth()
    signout()
    generateQuotes()
  })

  $('#signup-field').on('submit', event => {
    event.preventDefault()
    signup()
  })

  $('#link-todo').click(event => {
    event.preventDefault()
    showTodo()
    $('#edit-todo').hide()
    $('#show-all-todo').show()
    $('#signin-form').hide()
    $('#home-page').hide()
    $('#signup-form').hide()
  })

  $('#btn-add').click(event => {   
    event.preventDefault()
    showTodo()
    $('#show-all-todo').show()
    $('#signin-form').hide()
    $('#home-page').hide()
    $('#signup-form').hide()
  })

  $('#form-task').on('submit', event => {
    event.preventDefault()
    addTodo()
    $('#show-all-todo').show()
    $('#signin-form').hide()
    $('#home-page').hide()
    $('#signup-form').hide()
  })

  $('#save-edit').click(event => {
    event.preventDefault()
    showTodo()
  })

})



function auth(params) {
  if (!localStorage.getItem('access_token')) {
    $('#home-text').text(`How was your day ?`)
    $('#btn-add').hide()
    $('#signin-form').hide()
    $('#signup-form').hide()
    $('#link-todo').hide()
    $('#link-signout').hide()
    $('#link-signin').show()
    $('#link-signup').show()
    $('#btn-signup').show()
    $('#show-all-todo').hide()
    $('#edit-todo').hide()
    $('#text-home').text("Try to create your todo list today, Sign Up first if you don't have any account.")
  } else {
    if(!$('#home-text').text()){
      $('#home-text').text(`How was your day ?`)
    }
    $('#home-page').show()
    $('#signin-form').hide()
    $('#signup-form').hide()
    $('#link-todo').show()
    $('#link-signout').show()
    $('#link-signin').hide()
    $('#link-signup').hide()
    $('#btn-add').show()
    $('#btn-signup').hide()
    $('#edit-todo').hide()
    $('#show-all-todo').hide()
    $('#text-home').text('Click Add New to set your todo today')
  }
}

function generateQuotes() {
  $.ajax({
      url: baseUrl,
      method: 'GET'
    })
    .done(response => {
      $('#random-quotes').html(`<i>${response.quotes}</i>`)
      $('#label-quotes').html(`<i>${response.author}</i>`)
    })
    .fail((xhr, text) => {
      console.log(xhr, text)
    })
}

function signin() {
  const email = $('#signin-email').val()
  const password = $('#signin-password').val()
  $.ajax({
      url: baseUrl + 'users' + '/signin',
      method: 'POST',
      data: {
        email,
        password
      }
    })
    .done(response => {
      localStorage.setItem('access_token', response.access_token)
      let name = email.split('@')
      name = name[0].charAt(0).toUpperCase() + name[0].slice(1)
      $('#home-text').text(`Hello "${name}" how are you ?`)
      auth()
    })
    .fail((xhr, text) => {
      $('#error-signin').text(xhr.responseJSON.errors)
    })
    .always(_ => {
      $('#signin-field').trigger('reset')
    })
}

function signout() {
  localStorage.clear()
  $('#add-todo').remove()
  let auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out')
  })
  auth()
}

function signup() {
  const email = $('#signup-email').val()
  const password = $('#signup-password').val()

  $.ajax({
      url: baseUrl + 'users' + '/signup',
      method: 'POST',
      data: {
        email,
        password
      }
    })
    .done(response => {
      $('#signin-form').fadeIn(2000)
      $('#success-signup').text('SignUp success please sign in to continue')
      $('#signup-form').hide()
    })
    .fail((xhr, text) => {
      console.log(xhr)
    })
    .always(_ => {
      $('#signup-field').trigger('reset')
    })
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: baseUrl + 'users' + '/googlelogin',
    method: 'POST',
    data: {
      googleToken: id_token
    }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    $('#home-text').text(`Hello "${profile.getName()}" how are you ?`)
    auth()
  })
  .fail(err => {
    console.log(err)
  })
}

function addTodo() {
  const title = $('#todo-title').val()
  const description = $('#todo-desc').val()
  const due_date = $('#todo-due-date').val()
  const access_token = localStorage.getItem('access_token')
  const newTodo = {
    title,
    description,
    due_date
  }
  console.log(newTodo)

  $.ajax({
    url: baseUrl + 'todos',
    method: 'POST',
    headers: {
      access_token
    },
    data: {
      title,
      description,
      due_date,
    }
  })
  .done(response => {
    console.log('naise')
  })
  .fail((xhr, text) => {
    console.log(xhr, text)
  })
  .always(_ => {
  $('#todo-title').trigger('reset')
  $('#todo-desc').trigger('reset')
  $('#todo-due-date').trigger('reset')
  showTodo()
  })
}

function showTodo() {
  const access_token = localStorage.getItem('access_token')
  $('#todos-container').empty()
  $.ajax({
    url: baseUrl + 'todos',
    method: 'GET',
    headers: {
      access_token
    }
  })
  .done(response => {
    response.forEach(element => {
      console.log(typeof element.status)
      let date = element.due_date.split('T')
      if(element.status) {
      $('#todos-container').append(`<div class="col-sm-6 text-left" id="todo-${element.id}">
              <div class="card border-success mb-3 bg-transparent" style="width: 13rem; height: 14rem;">
                <div class="card-header bg-transparent border-success">${element.title} is already Done</div>
                <div class="card-header bg-transparent border-success">Due date : ${date[0]}</div>
                <div class="card-body text-warning" style="overflow-y: scroll; height: 100px;">
                  <p class="card-text">${element.description}</p>
                </div>
                <div class="card-footer bg-transparent border-success">
                  <button class="btn btn-lg btn-warning fw-bold text-dark button-card" type="submit" onclick="showEdit(${element.id})">Edit</button>
                  <button class="btn btn-lg btn-danger fw-bold text-dark button-card" type="submit"
                    onclick="deleteTodo(${element.id})">Delete</button></div>
              </div>
            </div>`)
      } else {
        $('#todos-container').append(`<div class="col-sm-6 text-left" id="todo-${element.id}">
                <div class="card border-warning mb-3 bg-transparent" style="width: 13rem; height: 14rem;">
                  <div class="card-header bg-transparent border-warning">${element.title}</div>
                  <div class="card-header bg-transparent border-warning">Due date : ${date[0]}</div>
                  <div class="card-body text-warning" style="overflow-y: scroll; height: 100px;">
                    <p class="card-text">${element.description}</p>
                  </div>
                  <div class="card-footer bg-transparent border-warning">
                  <button class="btn btn-lg btn-success fw-bold text-dark button-card" type="submit" onclick="doneTodo(${element.id})">Done</button>
                  <button class="btn btn-lg btn-warning fw-bold text-dark button-card" type="submit" onclick="showEdit(${element.id})">Edit</button>
                    <button class="btn btn-lg btn-danger fw-bold text-dark button-card" type="submit"
                      onclick="deleteTodo(${element.id})">Delete</button>
                      </div>
                </div>
              </div>`)
      }
    });
  })
  .fail((xhr, text) => {
    console.log(xhr)
  })
}

function deleteTodo(id) {
  console.log(id)
  const access_token = localStorage.getItem('access_token')

  $.ajax({
    url: baseUrl + `todos/${id}`,
    method: 'DELETE',
    headers: {
      access_token
    }
  })
  .done(response => {

  })
  .fail((xhr, text) => {
    console.log(xhr)
  })
  .always(_ => {
    showTodo()
  })
}

function doneTodo(id) {
  const access_token = localStorage.getItem('access_token')

  $.ajax({
    url: baseUrl + `todos/${id}`,
    method: 'PATCH',
    data: {
      status: true
    },
    headers: {
      access_token
    }
  })
  .done(respnse => {
    showTodo()
  })
  .fail((xhr, text) => {
    console.log(xhr)
  })
}

function showEdit(id) {
  const access_token = localStorage.getItem('access_token')
  $('#edit-status').empty()
  $('#edit-todo').show()
  $('#show-all-todo').hide()
  $('#home-page').hide()
  $.ajax({
    url: baseUrl + `todos/${id}`,
    method: 'GET',
    headers: {
      access_token
    }
  })
  .done(response => {
    const date = response.due_date.split('T')
    $('#edit-title').val(`${response.title}`)
    $('#edit-due-date').val(`${date[0]}`)
    $('#edit-desc').val(`${response.description}`)

    if(response.status) {
      $('#edit-status').append(`
      <label for="radio">Status</label><br><br>
      <input type="radio" class="btn-check" name="status" value="true" id="todo-true" checked>
      <label class="w-100 btn btn-lg btb-card btn-outline-success" for="todo-true">Done</label>
      <br><br>
      <input type="radio" class="btn-check" name="status" value="false" id="todo-false" >
      <label class="w-100 btn btn-lg btn-card btn-outline-danger" for="todo-false">Undone</label>
      `)
    } else {
      $('#edit-status').append(`
      <label for="radio">Status</label><br><br>
      <input type="radio" class="btn-check" name="status" value="true" id="todo-true" >
      <label class="w-100 btn btn-lg btb-card btn-outline-success" for="todo-true">Done</label>
      <br><br>
      <input type="radio" class="btn-check" name="status" value="false" id="todo-false" chekced>
      <label class="w-100 btn btn-lg btn-card btn-outline-danger" for="todo-false">Undone</label>
      `)
    }
    $('#for-button').append(`
      <button type="submit" class="btn btn-success btn-block" onclick="editTodo(${response.id})" id="save-edit">Save</button>
    `)

  })
  .fail((xhr, text) => {
    console.log(xhr)
  })
}

function editTodo(id) {
  showTodo()
  const access_token = localStorage.getItem('access_token')
  const title = $('#edit-title').val()
  const due_date = $('#edit-due-date').val()
  const status = $('input[name="status"]:checked').val()
  const description = $('#edit-desc').val()

  $.ajax({
    url: baseUrl + `todos/${id}`,
    method: 'PUT',
    headers: {
      access_token
    },
    data: {
      title,
      due_date,
      status,
      description
    }
  })
  .done(response => {
    $('#show-all-todo').show()
    $('#edit-todo').hide()
  })
  .fail((xhr, text) => {
    console.log(xhr)
  })
  .always(_ => {
    showTodo()
  })
}