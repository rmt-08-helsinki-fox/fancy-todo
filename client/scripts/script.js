const host = 'https://mtdapp.herokuapp.com/'

function authentication() {
  if (!localStorage.getItem('access_token')) {
    $("#login").show()
    $("#register").hide()
    $("#add-todo").hide()
    $('#list-todo').hide()
    $('#edit-todo').hide()
    $('#navbar').hide()
  } else {
    $("#login").hide()
    $("#register").hide()
    $("#add-todo").hide()
    $('#list-todo').show()
    $('#edit-todo').hide()
    $('#navbar').show()
    getTodos()
  }
}

function home(e) {
  e.preventDefault()
  $("#login").hide()
  $("#register").hide()
  $("#add-todo").hide()
  $('#list-todo').show()
  $('#edit-todo').hide()
  $('#navbar').show()
}

function addTodoPage(e) {
  e.preventDefault()
  $("#login").hide()
  $("#register").hide()
  $("#add-todo").show()
  $('#list-todo').hide()
  $('#edit-todo').hide()
  $('#navbar').show()
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: `${host}googleLogin`,
    method: 'POST',
    data: {
      googleToken: id_token
    }
  })
    .done(response => {
      localStorage.setItem("access_token", response.access_token)
      authentication()
    })
    .fail(err => {
      $('#login-title').after(
        `<div class="error-msg" id="err-msg">
            <p>${err.responseJSON.error}</p>
        </div>`
      )
    })
    .always(() => {
      $('#err-msg').remove()
      $('#email').val('')
      $('#password').val('')
    })
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
      localStorage.setItem("access_token", response.access_token)
      authentication()
    })
    .fail(err => {
      $("#error-login").empty()
      $("#error-login").append(`
        <p class="text-red-400">${err.responseJSON.error}</p>
      `)
      setTimeout(() => {
        $("#error-login").empty()
      }, 5000);
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
      const errors = err.responseJSON.error
      let temp = ''
      if (Array.isArray(errors)) {
        errors.forEach((itm, idx) => {
          temp += itm
          if (idx !== errors.length - 1) {
            temp += ', '
          }
        });
        $("#error-register").empty()
        $("#error-register").append(`
          <p class="text-red-400">${temp}</p>
        `)
      } else {
        $("#error-register").empty()
        $("#error-register").append(`
          <p class="text-red-400">${err.responseJSON.error}</p>
        `)
      }
      setTimeout(() => {
        $("#error-register").empty()
      }, 5000);
    })
    .always(() => {
      $('#email-reg').val('')
      $('#password-reg').val('')
    })
}

function logout(e) {
  e.preventDefault()
  localStorage.clear()
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
    .then(() => {
      console.log('User signed out.');
    });
  authentication()
}

function getTodos() {
  $.ajax({
    method: "GET",
    url: `${host}todos`,
    headers: { access_token: localStorage.getItem('access_token') }
  })
    .done(response => {
      $('#list-todo').empty()
      if (response.length !== 0) {
        response.forEach(itm => {
          if (itm.status === 'On Progress') {
            $('#list-todo').append(`
                <div id="detail-todos"
                class="w-full lg:w-2/2 rounded-lg lg:rounded-l-lg lg:rounded-r-lg shadow-2xl bg-white opacity-75 w-1/3 overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/3 mx-10">
                <div class="w-6 h-6 mx-10 bg-green-400 text-green-400" id="status-${itm.id}">o</div>
                <div class="p-4 md:p-12 text-center lg:text-left">
                  <h1 class="text-3xl font-bold pt-8 lg:pt-0">${itm.title}</h1>
                  <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                  <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg
                    class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M21.665,11.812c-0.11-1.377-0.476-2.724-1.08-3.966L24,6.599c-0.268-0.556-0.585-1.092-0.943-1.595 l-1.601,0.583c-3.534-4.95-10.412-6.098-15.363-2.565c-3.144,2.244-4.883,5.972-4.582,9.823l1.604-0.584 c0.051,0.615,0.153,1.224,0.305,1.822L0,15.335c0.338,1.339,0.922,2.604,1.721,3.731l1.812-0.659 c3.526,4.95,10.398,6.106,15.349,2.58c1.555-1.107,2.796-2.6,3.599-4.332c0.802-1.715,1.144-3.61,0.991-5.497L21.665,11.812z M16.925,9.177c0.687,1.227,0.998,2.629,0.895,4.032l1.809-0.657c-0.063,0.856-0.282,1.694-0.646,2.471 c-1.67,3.584-5.928,5.138-9.514,3.472c-0.782-0.365-1.491-0.87-2.092-1.49l-1.813,0.66c-0.979-1.01-1.64-2.285-1.903-3.667 l3.426-1.242c-0.121-0.624-0.159-1.262-0.111-1.896H6.97l-1.604,0.583c0.294-3.932,3.72-6.881,7.652-6.587 c0.868,0.065,1.716,0.288,2.504,0.658V5.508c0.778,0.364,1.483,0.867,2.082,1.483l1.599-0.582c0.002,0.002,0.004,0.003,0.006,0.005 c0.441,0.454,0.82,0.965,1.128,1.518L16.925,9.177z" />
                    </svg>${itm.due_date}</p>
                  <p class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"><svg
                    class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M10.15 8.42a2.93 2.93 0 00-1.18-.2 13.9 13.9 0 00-1.09.02v3.36l.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03a1.45 1.45 0 00-.93-1.46zM19.75.3H4.25A4.25 4.25 0 000 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.09 11.65c-.4.56-.96.98-1.61 1.22-.68.25-1.43.34-2.25.34l-.5-.01-.43-.01v3.21a.12.12 0 01-.11.14H5.82c-.08 0-.12-.04-.12-.13V6.42c0-.07.03-.11.1-.11l.56-.01.76-.02.87-.02.91-.01c.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.15.42.23.85.23 1.3 0 .86-.2 1.57-.6 2.13zm6.82-3.15v1.95c0 .08-.05.11-.16.11a4.35 4.35 0 00-1.92.37c-.19.09-.37.21-.51.37v5.1c0 .1-.04.14-.13.14h-1.97a.14.14 0 01-.16-.12v-5.58l-.01-.75-.02-.78c0-.23-.02-.45-.04-.68a.1.1 0 01.07-.11h1.78c.1 0 .18.07.2.16a3.03 3.03 0 01.13.92c.3-.35.67-.64 1.08-.86a3.1 3.1 0 011.52-.39c.07-.01.13.04.14.11v.04z" />
                    </svg>${itm.priority}</p>
                  <p class="pt-8 text-sm">${itm.description}</p>
                  <div class="pt-12 pb-8">
                    <button class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full" onclick="edit(${itm.id})">
                    Edit
                    </button>
                    <button class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full" onclick="destroy(${itm.id})">
                    Delete
                    </button>
                    <button class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full" onclick="editStatus(${itm.id})">
                    Change Status
                    </button>
                  </div>
                  </div>
                </div>
              `)
          } else {
            $('#list-todo').append(`
                <div id="detail-todos"
                class="w-full lg:w-2/2 rounded-lg lg:rounded-l-lg lg:rounded-r-lg shadow-2xl bg-white opacity-75 w-1/3 overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/3 mx-10">
                <div class="w-6 h-6 mx-10 bg-red-400 text-red-400" id="status-${itm.id}">c</div>
                <div class="p-4 md:p-12 text-center lg:text-left">
                  <h1 class="text-3xl font-bold pt-8 lg:pt-0">${itm.title}</h1>
                  <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                  <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg
                    class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M21.665,11.812c-0.11-1.377-0.476-2.724-1.08-3.966L24,6.599c-0.268-0.556-0.585-1.092-0.943-1.595 l-1.601,0.583c-3.534-4.95-10.412-6.098-15.363-2.565c-3.144,2.244-4.883,5.972-4.582,9.823l1.604-0.584 c0.051,0.615,0.153,1.224,0.305,1.822L0,15.335c0.338,1.339,0.922,2.604,1.721,3.731l1.812-0.659 c3.526,4.95,10.398,6.106,15.349,2.58c1.555-1.107,2.796-2.6,3.599-4.332c0.802-1.715,1.144-3.61,0.991-5.497L21.665,11.812z M16.925,9.177c0.687,1.227,0.998,2.629,0.895,4.032l1.809-0.657c-0.063,0.856-0.282,1.694-0.646,2.471 c-1.67,3.584-5.928,5.138-9.514,3.472c-0.782-0.365-1.491-0.87-2.092-1.49l-1.813,0.66c-0.979-1.01-1.64-2.285-1.903-3.667 l3.426-1.242c-0.121-0.624-0.159-1.262-0.111-1.896H6.97l-1.604,0.583c0.294-3.932,3.72-6.881,7.652-6.587 c0.868,0.065,1.716,0.288,2.504,0.658V5.508c0.778,0.364,1.483,0.867,2.082,1.483l1.599-0.582c0.002,0.002,0.004,0.003,0.006,0.005 c0.441,0.454,0.82,0.965,1.128,1.518L16.925,9.177z" />
                    </svg>${itm.due_date}</p>
                  <p class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"><svg
                    class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M10.15 8.42a2.93 2.93 0 00-1.18-.2 13.9 13.9 0 00-1.09.02v3.36l.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03a1.45 1.45 0 00-.93-1.46zM19.75.3H4.25A4.25 4.25 0 000 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.09 11.65c-.4.56-.96.98-1.61 1.22-.68.25-1.43.34-2.25.34l-.5-.01-.43-.01v3.21a.12.12 0 01-.11.14H5.82c-.08 0-.12-.04-.12-.13V6.42c0-.07.03-.11.1-.11l.56-.01.76-.02.87-.02.91-.01c.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.15.42.23.85.23 1.3 0 .86-.2 1.57-.6 2.13zm6.82-3.15v1.95c0 .08-.05.11-.16.11a4.35 4.35 0 00-1.92.37c-.19.09-.37.21-.51.37v5.1c0 .1-.04.14-.13.14h-1.97a.14.14 0 01-.16-.12v-5.58l-.01-.75-.02-.78c0-.23-.02-.45-.04-.68a.1.1 0 01.07-.11h1.78c.1 0 .18.07.2.16a3.03 3.03 0 01.13.92c.3-.35.67-.64 1.08-.86a3.1 3.1 0 011.52-.39c.07-.01.13.04.14.11v.04z" />
                    </svg>${itm.priority}</p>
                  <p class="pt-8 text-sm">${itm.description}</p>
                  <div class="pt-12 pb-8">
                    <button class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full" onclick="edit(${itm.id})">
                    Edit
                    </button>
                    <button class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full" onclick="destroy(${itm.id})">
                    Delete
                    </button>
                    <button class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full" onclick="editStatus(${itm.id})">
                    Change Status
                    </button>
                  </div>
                  </div>
                </div>
              `)
          }
        });
      } else {
        $('#list-todo').append(`
        <div>
        <h1 class="text-5xl my-7 text-white">You haven't made a todo yet!!</h1>
        <p class="text-xl text-white my-7">Please make a <a class="text-blue-600 font-bold" onclick="addTodoPage(event)" href="">todo</a> first</p>
        </div>
        `)
      }
    })
    .fail(err => {
      console.log(err);
    })
    .always(_ => {
      home(event)
    })
}

function edit(id) {
  $("#login").hide()
  $("#register").hide()
  $("#add-todo").hide()
  $("#navbar").show()
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
      $('#status-edit').empty()
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
      home()
    })
    .fail(err => {
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
      $("#error-edit-todo").empty()
      $("#error-edit-todo").append(`
        <p class="text-red-400 text-sm">${temp}</p>
      `)
      setTimeout(() => {
        $("#error-edit-todo").empty()
      }, 8000);
    })
}

function editStatus(id) {
  let status = $(`#status-${id}`).text()
  let data = ''
  if (status === 'o') {
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
      $('#err-msg').remove()
      getTodos()
      $('#notification-email').append(`
      <div class="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm">
      <input type="checkbox" class="hidden" id="footertoast">
        <label
          class="close cursor-pointer flex items-start justify-between w-full p-2 bg-green-500 h-24 bg-opacity-70 rounded shadow-lg text-white"
          title="close" for="footertoast">
          ${response.msg}
          <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18"    height="18"
          viewBox="0 0 18 18">
            <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
            </path>
          </svg>
        </label>
        </div>
      `)
    })
    .fail(err => {
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
      $("#error-add-todo").empty()
      $("#error-add-todo").append(`
        <p class="text-red-400 text-sm">${temp}</p>
      `)
      setTimeout(() => {
        $("#error-add-todo").empty()
      }, 8000);
    })
    .always(() => {
      const title = $('#title').val('')
      const description = $('#description').val('')
      const priority = $('#priority').val('')
      const due_date = $('#due-date').val('')
    })
}

document.getElementById('nav-toggle').onclick = function () {
  document.getElementById("nav-content").classList.toggle("hidden");
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