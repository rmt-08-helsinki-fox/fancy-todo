const base_url = 'http://localhost:3000/';

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
      auth();
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
    .always(() => {
      $("#register-form").trigger('reset');
    })
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
      localStorage.setItem('access_token', response.access_token);
      auth();
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
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
      $('#todo').append(`<h2 class="text-center mt-3">Welcome back, ${response[0].User.email}!</h2>`);
      response.forEach(value => {
        $('#todo').append(`
        <div class="card d-inline-block m-3" id="todo-${value.id}" style="width: 20rem;">
          <div class="card-body">
              <h4 class="card-title">${value.title}</h4>
              <p class="card-text">${value.description}</p>
              <p class="card-text">Status: ${value.status}</p>
              <p class="card-text">Due_date: ${value.due_date}</p>
              <button class="btn btn-outline-primary mr-2" data-toggle="modal" data-target="#todoModal-${value.id}">Update</button>
              <a href="#" class="btn btn-outline-danger" onclick="destroy(${value.id})">Delete</a>
          </div>
        </div>

        <div class="modal" class="todo-update" id="todoModal-${value.id}">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${value.title}</h5>
                <button class="close" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-body">
                <form action="">
                  <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" id="title-${value.id}" value="${value.title}" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" name="description" id="description-${value.id}" value="${value.description}" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="status">Status</label>
                    <input type="text" name="status" id="status-${value.id}" value="${value.status}" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="due_date">Due Date</label>
                    <input type="date" name="due_date" id="due_date-${value.id}" value="${value.due_date}" class="form-control">
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-primary" onclick="update(${value.id})">Update</button>
                    <button class="btn btn-danger" data-dismiss="modal">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
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
      $('#todo').append(`
        <div class="card d-inline-block m-3" id="todo-${value.id}" style="width: 20rem;">
          <div class="card-body">
              <h4 class="card-title">${value.title}</h4>
              <p class="card-text">${value.description}</p>
              <p class="card-text">Status: ${value.status}</p>
              <p class="card-text">Due_date: ${value.due_date}</p>
              <button class="btn btn-outline-primary mr-2" data-toggle="modal" data-target="#todoModal-${value.id}">Update</button>
              <a href="#" class="btn btn-outline-danger" onclick="destroy(${value.id})">Delete</a>
          </div>
        </div>

        <div class="modal" class="todo-update" id="todoModal-${value.id}">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${value.title}</h5>
                <button class="close" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-body">
                <form action="">
                  <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" id="title-${value.id}" value="${value.title}" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" name="description" id="description-${value.id}" value="${value.description}" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="status">Status</label>
                    <input type="text" name="status" id="status-${value.id}" value="${value.status}" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="due_date">Due Date</label>
                    <input type="date" name="due_date" id="due_date-${value.id}" value="${value.due_date}" class="form-control">
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-primary" onclick="update(${value.id})">Update</button>
                    <button class="btn btn-danger" data-dismiss="modal">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      `)
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
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

function update(id) {
  const title = $(`#title-${id}`).val();
  const description = $(`#description-${id}`).val();
  const status = $(`#status-${id}`).val();
  const due_date = $(`#due_date-${id}`).val();
  $.ajax({
    url: base_url + "todos/" + id,
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
      console.log(response);
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
}

function auth() {
  if (!localStorage.getItem('access_token')) {
    $("#register").show();
    $("#login").show();
    $("#todo").hide();
    $('#logout').hide();
    $('#addTodo').hide();
  } else {
    $("#login").hide();
    $("#register").hide();
    $("#todo").show();
    $('#logout').show();
    $('#addTodo').show();
    getTodo();
  }
}

function logout() {
  localStorage.clear();
  $('#todo').empty();
  auth();
}

$(document).ready(() => {
  auth();
  $("#login-form").on("submit", (e) => {
    e.preventDefault();
    login();
  })

  $("#update-form").on("submit", (e) => {
    e.preventDefault();
    update(e.id);
  })

  $(".update-todo").on('submit', (e) => {
    e.preventDefault();
    console.log('hey');
  })

  $("#register-form").on("submit", (e) => {
    e.preventDefault();
    register();
  })

  $("#addTodo-form").on("submit", (e) => {
    e.preventDefault();
    addTodo();
  })

  $("#logout").on("click", (e) => {
    e.preventDefault();
    logout();
  })
})