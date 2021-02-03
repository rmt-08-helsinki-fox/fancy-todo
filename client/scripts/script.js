const host = 'http://localhost:3000/'

function authentication() {
  if (!localStorage.getItem('access_token')) {
    $("#login").show()
    $("#register").hide()
    $("#add-todo").hide()
    $("#btn-logout").hide()
    $('#list-todo').hide()
    $('#edit-todo').hide()
  } else {
    $("#login").hide()
    $("#register").hide()
    $("#add-todo").show()
    $("#btn-logout").show()
    $('#list-todo').show()
    $('#edit-todo').hide()
    getTodos()
  }
}

function register() {
  $('#register').show()
  $('#login').hide()
}

function login() {
  $('#register').hide()
  $('#login').show()
}

function userLogin() {
  const email = $('#email').val()
  const password = $('#password').val()

  $.ajax({
    method: "POST",
    url: `${host}login`,
    data: { email, password }
  })
    .done(response => {
      $('#err-msg').remove()
      localStorage.setItem("access_token", response.access_token)
      authentication()
    })
    .fail(err => {
      $('#err-msg').remove()
      $('#login-title').after(
        `<div class="error-msg" id="err-msg">
            <p>${err.responseJSON.error}</p>
        </div>`
      )
    })
    .always(() => {
      $('#email').val('')
      $('#password').val('')
    })
}

function userRegister() {
  const email = $('#email-reg').val()
  const password = $('#password-reg').val()

  $.ajax({
    method: "POST",
    url: `${host}register`,
    data: { email, password }
  })
    .done(response => {
      console.log(response);
      $('#err-msg').remove()
      $('#register').hide()
      $('#login').show()
    })
    .fail(err => {
      $('#err-msg').remove()
      const errors = err.responseJSON.error
      let temp = ''
      if (Array.isArray(errors)) {
        errors.forEach((itm, idx) => {
          temp += itm
          if (idx !== errors.length - 1) {
            temp += ' '
          }
        });
        $('#register-title').after(
          `<div class="error-msg" id="err-msg">
              <p>${temp}</p>
            </div>`
        )
      } else {
        $('#register-title').after(
          `<div class="error-msg" id="err-msg">
              <p>${errors}</p>
            </div>`
        )
      }
    })
    .always(() => {
      $('#email-reg').val('')
      $('#password-reg').val('')
    })
}

function logout() {
  localStorage.clear()
  authentication()
}

function getTodos() {
  $.ajax({
    method: "GET",
    url: `${host}todos`,
    headers: { access_token: localStorage.getItem('access_token') }
  })
    .done(response => {
      if (response.length !== 0) {
        $('table').remove()
        $('#list-todo h3').hide()
        $('#list-todo h3').after(`
        <table>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </table>
        `)
        response.forEach((itm, idx) => {
          $('tbody').append(`
          <tr>
            <td>${idx + 1}</td>
            <td>${itm.title}</td>
            <td>${itm.description}</td>
            <td>${itm.priority}</td>
            <td>${itm.due_date}</td>
            <td id="status-${itm.id}">${itm.status}</td>
            <td class="action"><a class="btn" onclick="edit(${itm.id})">Edit</a> <a class="btn" hreh="#" onclick="destroy(${itm.id})">Delete</a> <a class="btn" onclick="changeStatus(${itm.id})">Change Status</a></td>
          </tr>
          `)
        });
      } else {
        $('#list-todo table').hide()
        $('#list-todo h3').show()
      }
    })
    .fail(err => {
      console.log(err);
    })
}

function edit(id) {
  $("#login").hide()
  $("#register").hide()
  $("#add-todo").hide()
  $("#btn-logout").hide()
  $('#list-todo').hide()
  $('#edit-todo').show()
  $.ajax({
    method: "GET",
    url: `${host}todos/${id}`,
    headers: { access_token: localStorage.getItem('access_token') }
  })
    .done(response => {
      $('#title-edit').val(response.title)
      $('#description-edit').val(response.description)
      $('#priority-edit').html('')
      if (response.priority === 'low') {
        $('#priority-edit').append(`
          <option value="low" selected>Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        `)
      } else if (response.priority === 'medium') {
        $('#priority-edit').append(`
          <option value="low">Low</option>
          <option value="medium" selected>Medium</option>
          <option value="high">High</option>
        `)
      } else {
        $('#priority-edit').append(`
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high" selected>High</option>
        `)
      }
      $('#due_date-edit').val(response.due_date)
      $('#status-edit').html('')
      if (response.status === 'On Progress') {
        $('#status-edit').append(`
          <option value="On Progress" selected>On Progress</option>
          <option value="Completed">Completed</option>
        `)
      } else {
        $('#status-edit').append(`
          <option value="On Progress">On Progress</option>
          <option value="Completed" selected>Completed</option>
        `)
      }
      localStorage.setItem('idTodo', id)
    })
    .fail(err => {
      console.log(err);
    })
}

function editTodo() {
  const idTodo = localStorage.getItem('idTodo')
  const title = $('#title-edit').val()
  const description = $('#description-edit').val()
  const priority = $('#priority-edit').val()
  const due_date = $('#due_date-edit').val()
  const status = $('#status-edit').val()

  $.ajax({
    method: "PUT",
    url: `${host}todos/${idTodo}`,
    headers: { access_token: localStorage.getItem('access_token') },
    data: { title, description, priority, due_date, status }
  })
    .done(response => {
      console.log(response);
      localStorage.removeItem('idTodo')
      getTodos()
      backList()
    })
    .fail(err => {
      console.log(err);
    })
}

function backList() {
  $("#login").hide()
  $("#register").hide()
  $("#add-todo").show()
  $("#btn-logout").show()
  $('#list-todo').show()
  $('#edit-todo').hide()
}

function changeStatus(id) {
  const status = $(`#status-${id}`).text()
  let data = ''
  if (status === 'On Progress') {
    data = 'Completed'
  } else {
    data = 'On Progress'
  }
  $.ajax({
    method: "PATCH",
    url: `${host}todos/${id}`,
    headers: { access_token: localStorage.getItem('access_token') },
    data: { status: data }
  })
    .done(response => {
      console.log(response);
      getTodos()
    })
    .fail(err => {
      console.log(err);
    })
}

function destroy(id) {
  $.ajax({
    method: "DELETE",
    url: `${host}todos/${id}`,
    headers: { access_token: localStorage.getItem('access_token') }
  })
    .done(response => {
      console.log(response.message);
      getTodos()
    })
    .fail(err => {
      console.log(err);
    })
}

function addTodo() {
  const title = $('#title').val()
  const description = $('#description').val()
  const priority = $('#priority').val()
  const due_date = $('#due-date').val()

  $.ajax({
    method: "POST",
    url: `${host}todos`,
    headers: { access_token: localStorage.getItem('access_token') },
    data: {
      title, description, priority, due_date
    }
  })
    .done(response => {
      console.log(response);
      getTodos()
    })
    .fail(err => {
      $('#err-msg').remove()
      const error = err.responseJSON.error
      let temp = ''
      if (Array.isArray(error)) {
        error.forEach((itm, idx) => {
          temp += itm
          if (idx !== error.length - 1) {
            temp += ', '
          }
        });
      }
      $('#add-todo h2').after(`
        <div class="error-msg" id="err-msg">
          <p>${temp}</p>
        </div>
      `)
    })
    .always(() => {
      const title = $('#title').val('')
      const description = $('#description').val('')
      const priority = $('#priority').val('')
      const due_date = $('#due-date').val('')
    })
}

$(document).ready(() => {
  authentication()
  $('#login').on('submit', (event) => {
    event.preventDefault()
    userLogin()
  })

  $('#register').on('submit', (event) => {
    event.preventDefault()
    userRegister()
  })

  $('#add-todo').on('submit', (event) => {
    event.preventDefault()
    addTodo()
  })

  $('#edit-todo').on('submit', (event) => {
    event.preventDefault()
    editTodo()
  })
});