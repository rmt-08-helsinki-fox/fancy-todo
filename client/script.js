const server_url = 'http://localhost:3000'

function auth () {
  if (!localStorage.getItem('access_token')) {
    $('#login').show()
    $('#img-h8').show()
    $('#register').hide()
    $('#newsCard').hide()
    $('#todoList').hide()
    $('#createTodo').hide()
    $('#editTodo').hide()
    $('#create').hide()
    $('#logout').hide()
    $('#newsCard').hide()
  } else {
    $('#img-h8').hide()
    $('#login').hide()
    $('#register').hide()
    $('#editTodo').hide()
    $('#createTodo').hide()
    $('#logout').show()
    $('#create').show()
    $('#newsCard').show()
    $('#todoList').show()
    getTodo()
    $('#newsCard').show()
  }
}
function logout () {
  localStorage.clear()
  auth()
}
function regisToLogin () {
  $('#login').show()
  $('#register').hide()
  // $('#newsCard').hide()
  // $('todoList').hide()
  // $('#navbar').hide()
}
function loginToRegis () {
  $('#login').hide()
  $('#register').show()
  // $('#newsCard').hide()
  // $('todoList').hide()
  // $('#navbar').hide()
}
function login () {
  const email =  $('#emailLogin').val()
  const password = $('#passwordLogin').val()
  $.ajax({
    url: server_url + '/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
    .done((data) => {
      localStorage.setItem('access_token', data.access_token)
      $('#emailLogin').val("")
      $('#passwordLogin').val("")
      auth()
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('login running')
    })
}
function register () {
  const email = $('#emailRegister').val()
  const password = $('#passwordRegister').val()
  $.ajax({
    url: server_url + '/register',
    method: 'post',
    data: {
      email,
      password
    }
  })
    .done((data) => {
      console.log(email, password, 'register')
    })
    .fail((xhr, text) => {
      console.log(xhr.responseText)
    })
    .always(() => {
      console.log('register')
    })
}
function getTodo () {
  $.ajax({
    url: server_url + '/todos',
    method: 'get',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done((todo) => {
      $('#todoList').empty()
      todo.forEach(el => {
        $('#todoList').append(
          `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${el.title}</h5>
              <p class="card-text">${el.description}</p>
              <p class="card-text">${el.due_date}</p>
              <a href="#" class="btn btn-primary" onclick="findTodo(${el.id})">Change</a>
              <a href="#" class="btn btn-danger" onclick="remove(${el.id})">Delete</a>
            </div>`
        )
      });
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {

    })
}
function create () {
  const title = $('#title').val()
  const description = $('#description').val()
  const due_date = $('#due_date').val()
  const status = $('#status').val()
  console.log(title, description, due_date, status)
  $.ajax({
    url: server_url + '/todos',
    method: 'post',
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
    .done((data) => {
      getTodo()
      auth()
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('from createTodo')
    })
}
function remove(id) {
  $.ajax({
    url: server_url + '/todos/' + id,
    method: 'delete',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done((data) => {
      console.log('data was deleted')
      getTodo()
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('Running delete')
    })
}
function findTodo (id) {
  $.ajax({
    url: server_url + '/todos/' + id,
    method: 'get',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done((data) => {
      console.log(data)
      $('#todoList').hide()
      $('#create').hide()
      $('#logout').hide()
      $('#editTodo').show()
      $('#edit_title').val(data.title)
      $('#edit_description').val(data.description)
      $('#edit_due_date').val(data.due_date)
      $('#edit_status').val(data.status)
      update(data.id)
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('dari findTodo')
    })
}
function update (id) {
  const title = $('#edit_title').val()
  const description = $('#edit_description').val()
  const due_date = $('#edit_due_date').val()
  const status = $('#edit_status').val()
  $.ajax({
    url: server_url + '/todos/' + id,
    method: 'put',
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
    .done((data) => {
      console.log(data)
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('dari always')
    })
}
function news () {
  $.ajax({
    url: server_url + '/news',
    method: 'get',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done((data) => {
      data.forEach(el => {
        $('#newsCard').append(
          `<div class="card-body">
          <img class="card-img-top" src="..." alt="Card image cap">
          <p class="card-text">${el.author}</p>
          </div>`
        )
      })
    })
}
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

$(document).ready(() => {
  auth()

  $('#loginForm').on('submit', (event) => {
    event.preventDefault()
    login()
    auth()
  })

  $('#registerForm').on('submit', (event) => {
    event.preventDefault()
    register()
  })
})
$('#rgs-lgn-btn').on('click', (event) => {
  event.preventDefault()
  regisToLogin()
})
$('#lgn-rgs-btn').on('click', (event) => {
  event.preventDefault()
  loginToRegis()
})
$('#logout').on('click', (event) => {
  event.preventDefault()
  logout()
})
$('#create').on('click', (event) => {
  event.preventDefault()
  $('#todoList').hide()
  $('#logout').hide()
  $('#create').hide()
  $('#createTodo').show()
})
$('#cancelCreate').on('click', (event) => {
  event.preventDefault()
  $('#todoList').show()
  $('#logout').show()
  $('#create').show()
  $('#createTodo').hide()
})
$('#cancelEdit').on('click', (event) => {
  event.preventDefault()
  $('#todoList').show()
  $('#logout').show()
  $('#create').show()
  $('#editTodo').hide()
})
$('#createTodo').on('submit', (event) => {
  event.preventDefault()
  create()
})
$('#editTodo').on('submit', (event) => {
  event.preventDefault()
  update()
})

