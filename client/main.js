// const baseUrl = 'https://todo-fancy-dody.herokuapp.com/'
const baseUrl = 'http://localhost:3000/'

$(document).ready(() => {
  auth()
  $('#login-form').on('submit', (e) => {
    e.preventDefault()
    login()
  })

  $("#toRegister").click(() => {
    $("#login-form").hide()
    $("#register-form").show()
  })

  $("#toLogin").click(() => {
    $("#login-form").show()
    $("#register-form").hide()
  })

  $("#nav-logout").click(() => {

    console.log('logout');
    localStorage.removeItem(access_token)
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

  })
})

function auth() {
  if (!localStorage.getItem("access_token")) {
    $('#login-form').show()
    $('#add-form').hide()
    $('#todo-list').hide()
    $('#register-form').hide()
  } else {
    $('#login-form').hide()
    $('#add-form').show()
    $('#todo-list').show()
  }
  getToDos()
}

//REGISTER
function register() {
  const email = $('#register-email').val()
  const password = $('#register-password').val()
  $.ajax({
    url: baseUrl + 'users/register',
    method: 'POST',
    data: {
      email,
      password
    }
  })
    .done((response) => {
      console.log(response);
    })
    .fail((err) => {
      console.log(err.message);
    })
}

//LOGIN
function login() {
  const email = $('#email').val()
  const password = $('#password').val()
  $.ajax({
    url: baseUrl + 'users/login',
    method: 'POST',
    data: {
      email,
      password
    }
  })
    .done((response) => {
      // console.log(response);
      localStorage.setItem('access_token', response.access_token)
      auth()
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
    .always(_ => {
      $('#login-form').trigger('reset')
      // console.log('always')
    })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);

  $.ajax({
    url: baseUrl + 'users/googlelogin',
    method: 'POST',
    data: {
      googleToken: id_token
    }
  })
    .done((response) => {
      console.log(response);
      localStorage.setItem('access_token', response.access_token)
      auth()
    })
    .fail((err) => {
      console.log(err);
    })
}


function getToDos() {
  $.ajax({
    url: baseUrl + 'todos',
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done((todo) => {
      $('#todo-list').empty()
      todo.forEach(value => {
        $('#todo-list'), append(`
            <div class="w-25 card" id="${value.id}">
              <div class="card-header">
                Todo Title
              </div>
              <div class="card-body">
                <h5 class="card-title">${value.title}</h5>
                <p class="card-text">${value.description}</p>
                <a href="#" class="btn btn-primary">Edit</a>
                <a href="#" class="btn btn-primary" onclick="destroy(${value.id})">Delete</a>
              </div>
            </div>
            `)
      });

    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
}


function destroy(id) {
  $.ajax({
    url: baseUrl + 'todos/' + id,
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done((_) => {
      getToDos()
    })
    .fail((err, text) => {
      console.log(err, text);
    })
}

function update(id) {
  $.ajax({
    url: baseUrl + 'todos/' + id,
    method: 'PUT',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done((_) => {
      getToDos()
    })
    .fail((err, text) => {
      console.log(err, text);
    })
}

function patch(id) {
  $.ajax({
    url: baseUrl + 'todos/' + id,
    method: 'PATCH',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done((_) => {
      getToDos()
    })
    .fail((err, text) => {
      console.log(err, text);
    })
}

function weatherAPI() {
  $.ajax({
    url: baseUrl + 'todos/weather',
    method: 'get',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done((_) => {

    })
    .fail((err, text) => {
      console.log(err, text);
    })
}


