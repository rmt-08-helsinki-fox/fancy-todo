const base_url = 'http://localhost:3000/';

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: base_url + 'user/googlelogin',
    method: 'POST',
    data: {
      googleToken: id_token
    }
  })
    .done(response => {
      localStorage.setItem('access_token', response.access_token);
      auth();
    })
    .fail(err => {
      console.log(err);
    })
}

function register() {
  const email = $("#registerEmail").val();
  const password = $("#registerPassword").val();

  $.ajax({
    url: base_url + 'user/register',
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done(response => {
      $("#registerError").text("");
      afterRegister();
    })
    .fail((xhr, text) => {
      $("#registerError").text(xhr.responseJSON);
    })
    .always(() => {
      $("#register-form").trigger('reset');
    })
}

function afterRegister() {
  $("#register").hide();
  $("#login").show();
}

function login() {
  const email = $("#loginEmail").val();
  const password = $("#loginPassword").val();

  $.ajax({
    url: base_url + 'user/login',
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done(response => {
      $("#loginError").text("");
      localStorage.setItem('access_token', response.access_token);
      auth();
    })
    .fail((xhr, text) => {
      $("#loginError").text(xhr.responseJSON.error);
    })
    .always(() => {
      $("#login-form").trigger('reset');
    })
}

function getTodo() {
  $.ajax({
    url: base_url + 'todos',
    method: "GET",
    headers: {
      token: localStorage.getItem('access_token')
    }
  })
    .done((response) => {

      $('#todo').empty();
      $('#todo').append(`<h2 class="text-center my-4">Welcome back, ${response[0].User.email}!</h2>`);
      response.forEach(value => {
        $('#todo').append(`
        <div class="card d-inline-block m-3" id="todo-${value.id}" style="width: 20rem;">
          <div class="card-body">
              <h4 class="card-title">${value.title}</h4>
              <p class="card-text">${value.description}</p>
              <p class="card-text">Status: ${value.status}</p>
              <p class="card-text">Due_date: ${value.due_date}</p>
              <button class="btn btn-outline-primary mr-2" onclick="showUpdate(${value.id})">Update</button>
              <a href="#" class="btn btn-outline-danger destroyItem" onclick="destroy(${value.id})">Delete</a>
          </div>
        </div>
        `)
      })
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
}

function addTodo() {
  const title = $('#title').val();
  const description = $('#description').val();
  const status = $('#status').val();
  const due_date = $('#due_date').val();
  $.ajax({
    url: base_url + 'todos',
    method: "POST",
    headers: {
      token: localStorage.getItem("access_token")
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
    .done(value => {
      $("#addError").text("");
      $('#todo').append(`
        <div class="card d-inline-block m-3" id="todo-${value.id}" style="width: 20rem;">
          <div class="card-body">
              <h4 class="card-title">${value.title}</h4>
              <p class="card-text">${value.description}</p>
              <p class="card-text">Status: ${value.status}</p>
              <p class="card-text">Due_date: ${value.due_date}</p>
              <button class="btn btn-outline-primary mr-2" onclick="showUpdate(${value.id})">Update</button>
              <a href="#" class="btn btn-outline-danger destroyItem" onclick="destroy(${value.id})">Delete</a>
          </div>
        </div>
      `)
    })
    .fail((xhr, text) => {
      $("#addError").text(xhr.responseJSON.error);
    })
    .always(() => {
      $('#addTodo-form').trigger('reset');
    })
}

function destroy(id) {
  $.ajax({
    url: base_url + "todos/" + +id,
    method: "DELETE",
    headers: {
      token: localStorage.getItem('access_token')
    }
  })
    .done(() => {
      $(`#todo-${+id}`).remove();
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
}

function showUpdate(id) {
  $.ajax({
    url: base_url + 'todos',
    method: "GET",
    headers: {
      token: localStorage.getItem('access_token')
    }
  })
    .then(todo => {
      todo.forEach(item => {
        if (item.id == id) {
          $("#editTodo-form").show();
          $("#editTitle").val(item.title);
          $("#editDescription").val(item.description);
          $("#editStatus").val(item.status);
          $("#editDueDate").val(item.due_date);
          $("#todoId").text(item.id)
        }
      })
    })
    .catch(err => {
      console.log(err);
    })
}

async function update() {
  let id = $("#todoId").text();
  let title = $("#editTitle").val();
  let description = $("#editDescription").val();
  let status = $("#editStatus").val();
  let due_date = $("#editDueDate").val();
  $.ajax({
    url: base_url + "todos/" + +id,
    method: "PUT",
    headers: {
      token: localStorage.getItem('access_token')
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
    .done((response) => {
      auth();
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
}

function getDictionary() {
  const word = $("#word-search").val();
  $.ajax({
    url: base_url + "todos/dictionary",
    method: "GET",
    headers: {
      token: localStorage.getItem('access_token')
    },
    data: {
      word
    }
  })
    .done(response => {
      $("#word-search").val("");
      console.log(response);
      $("#search-result").text(response.definition);
      $("#dictionaryError").text('');
    })
    .fail(err => {
      console.log(err);
      $("#word-search").val("");
      $("#dictionaryError").text(err.responseJSON.error);
      $("#search-result").text("")
    })
}

function auth() {
  if (!localStorage.getItem('access_token')) {
    $("#register").show();
    $("#loginNav").show();
    $("#registerNav").show();
    $("#login").hide();
    $("#todo").hide();
    $('#logout').hide();
    $('#addTodo').hide();
    $('#editTodo-form').hide();
  } else {
    $("#loginNav").hide();
    $("#registerNav").hide();
    $("#login").hide();
    $("#register").hide();
    $("#todo").show();
    $('#logout').show();
    $('#addTodo').show();
    $('#editTodo-form').hide();
    getTodo();
  }
}

function logout() {
  $("#addError").text("");
  $("#search-result").text("");
  $("#dictionaryError").text("");
  localStorage.clear();
  $('#todo').empty();
  auth();
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

$(document).ready(() => {
  auth();
  $("#login-form").on("submit", (e) => {
    e.preventDefault();
    login();
  })

  $("#word-btn").on("click", (e) => {
    e.preventDefault();
    getDictionary();
  })

  $("#register-form").on("submit", (e) => {
    e.preventDefault();
    register();
  })

  $("#addTodo-form").on("submit", (e) => {
    e.preventDefault();
    addTodo();
  })

  $("#editTodo-form").on("submit", (e) => {
    e.preventDefault();
    update();
  })

  $(".im-p").on('click', (e) => {
    e.preventDefault();
    $('#editTodo-form').show();
  })

  $(".destroyItem").on("click", (e) => {
    e.preventDefault();
  })

  $("#updateCancel").on('click', (e) => {
    e.preventDefault();
    $('#editTodo-form').hide(); 
  })

  $("#loginNav").on("click", (e) => {
    e.preventDefault();
    $("#login").show();
    $("#register").hide();
  })

  $("#registerNav").on("click", (e) => {
    e.preventDefault();
    $("#register").show();
    $("#login").hide();
  })

  $("#logout").on("click", (e) => {
    e.preventDefault();
    logout();
  })
})