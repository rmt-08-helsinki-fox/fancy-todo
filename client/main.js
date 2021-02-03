const baseUrl = 'http://localhost:3000/'
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
      localStorage.setItem('access_token', response.access_token)
      auth()
      // console.log(response);
    })
    .fail((err) => {
      console.log(err);
    })
}

function auth() {
  if (!localStorage.getItem("access_token")) {
    $('#login-form').show()
    $('#add-form').hide()
    $('#todo-list').hide()
  } else {
    $('#login-form').hide()
    $('#add-form').show()
    $('#todo-list').show()
  }
  getToDos()
}

function login() {
  const email = $('#emailInput').val()
  const password = $('#passwordInput').val()
  $.ajax({
    url: baseUrl + 'users/login',
    method: 'POST',
    data: {
      email,
      password
    }
  })
    .done((response) => {
      console.log(response);
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
function logout() {
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
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
            <div class="w-25 card" id="todo-${value.id}">
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

$(document).ready(() => {
  auth()
  $('#login-form').on('submit', (e) => {
    e.preventDefault()
    login()
  })
})