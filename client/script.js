const baseUrl = 'http://localhost:3000'

$(document).ready(() => {
  auth()
  
  $('#login-form').submit((e) => {
    e.preventDefault()
    login()
  })

  $('#btn-login').click((e) => {
    e.preventDefault()
    auth()
  })

  $('#btn-logout').click((e) => {
    e.preventDefault()
    logout()
  })

  $('#btn-register').click((e) => {
    e.preventDefault()
    $('#btn-login').show()
    $('#btn-register').hide()
    $('#login-form').hide()
    $('#register-form').show()
  })
  
  //register page
  $('#register-form').submit((e) => {
    e.preventDefault()
    register()
  })

  // show todo by user id
  $('#btn-todoid').click((e) => {
    e.preventDefault()
    getTodoById(localStorage.getItem('id'))
  })

  // open post form
  $('#btn-post').click((e) => {
    e.preventDefault()
    $('#post-form').show()
  })
  // post todo
  $('#post-form').submit((e) => {
    e.preventDefault()
    postTodo(localStorage.getItem('id'))
  })

  //home
  $('#home').click((e) => {
    e.preventDefault()
    auth()
  })

  //put todo
  //

})

function auth() {
  if(!localStorage.getItem('access_token')){
    //form
    $('#login-form').show()
    $('#post-form').hide()
    $('#register-form').hide()
    $('#put-form').hide()
    //button
    $('#btn-edit').hide()
    $('#btn-register').show()
    $('#btn-login').show()
    $('#btn-logout').hide()
    $('#todo-table').hide()
    $('#btn-todoid').hide()
    $('#btn-post').hide()
  }
  else {
    //form
    $('#register-form').hide()
    $('#post-form').hide()
    $('#login-form').hide()
    $('#put-form').hide()

    //table
    $('#todo-table').show()

    //button
    $('#btn-register').hide()
    $('#btn-login').hide()
    $('#btn-todoid').show()
    $('#btn-logout').show()
    $('#btn-post').show()
    $('#btn-edit').show()
    getTodos()
  }
}

function login() {
  const email = $('#email-login').val()
  const password = $('#password-login').val()

  $.ajax({
    url: baseUrl + '/users/login',
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    localStorage.setItem('id', response.id)
    auth()
  })
  .fail((xhr, status) => {
    if(Array.isArray(xhr.responseJSON.messages)) {
      alert(xhr.responseJSON.messages)
    }
    else {
      alert(xhr.responseJSON.message)
    }
  })
  .always(() => {
    $('#email-login').val('')
    $('#password-login').val('')
  })
}

function logout() {
  localStorage.removeItem('access_token')
  var auth2 = gapi.auth2.getAuthInstance();
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  auth()
}

function register() {
  const email = $('#email-register').val()
  const password = $('#password-register').val()

  $.ajax({
    url: baseUrl + '/users/register',
    method: 'post',
    data: {
      email,
      password
    }
  })
  .done(response => {
    console.log(response)
    auth()
  })
  .fail((xhr, status) => {
    console.log(xhr)
    if(Array.isArray(xhr.responseJSON.messages)) {
      alert(xhr.responseJSON.messages)
    }
    else {
      alert(xhr.responseJSON.message)
    }
  })
}

function getTodos() {
  $.ajax({
    url: baseUrl + '/todos',
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(todos => {
    $('#todo-table table').empty().append(`
    <tr>
      <th>Todo List</th>
      <th>Status</th>
    </tr>`)
    todos.forEach(el => {
      $('#todo-table table').append(`
      <tr>
        <td>${el.title}</td>
        <td>${el.status}</td>
      </tr>
      `)
    })
  })
  .fail((xhr, status) => {
    console.log(xhr.responseJSON)
  })
}

function getTodoById(id) {
  $.ajax({
    url: baseUrl + `/todos/${id}`, //id diambil pada saat kirim data ke server pada saat login (user controller)
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(todos => {
    $('#todo-table table').empty().append(`
    <tr>
      <th>Todo List</th>
      <th>Description</th>
      <th>Status</th>
      <th>Due Date</th>
    </tr>`)
    todos.forEach(el => {
      $('#todo-table table').append(`
      <tr id="todo-${el.id}">
        <td>${el.title}</td>
        <td>${el.description}</td>
        <td id="todo-status">${el.status}</td>
        <td>${el.due_date}</td>
        <td><button onClick="deleteTodo(${el.id})">Delete</button></td>
        <td><button onClick="putTodo(${el.id}, ${el.user_id})">Edit</button></td>
        <td><button onClick="patchTodo(${el.id}, ${el.user_id})">Mark As Done</button><put>
      </tr>
      `)
    })
  })
  .fail((xhr, status) => {
    console.log(xhr)
  })
}

function postTodo(id) {
  const title = $('#title-post').val()
  const description = $('#description-post').val()
  const status = $('#status-post').val()
  const due_date = $('#due_date-post').val()
  let todo = {
   title,
   description,
   status,
   due_date,
   id
  }
  $.ajax({
    url: baseUrl + '/todos',
    method: 'POST',
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: todo
  })
  .done(todo => {
    $('#title-post').val('')
    $('#description-post').val('')
    $('#status-post').val('')
    $('#due_date-post').val('')
    $('#location').val('')
    getTodoById(id)
  })
  .fail((xhr, status) => {
    if(Array.isArray(xhr.responseJSON.messages)) {
      alert(xhr.responseJSON.messages)
    }
    else {
      alert(xhr.responseJSON.message)
    }
  })
}

function deleteTodo(id) {
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: { todoId: id }
  })
  .done(() => {
    $(`#todo-${id}`).remove()
  })
  .fail((xhr, status) => {
    console.log(xhr)
  })
}

function putTodo(todoId) {
  const todo = $(`#todo-table #todo-${todoId}`).text().split('\n').slice(1)
  const title = todo[0].trim()
  const description = todo[1].trim()
  const status = todo[2].trim()
  const due_date = (todo[3].trim().toLocaleString().substring(0, 10))
  $('#put-form').show()
  $('#put-form #title').val(title)
  $('#put-form #description').val(description)
  $('#put-form #status').val(status)
  $('#put-form #due_date').val(due_date)

  $('#put-form').submit((e) => {
    e.preventDefault()
    submitPut(todoId, localStorage.getItem('id'))
  })  
}

function submitPut(todoId, user_id) {
  const title = $('#put-form #title').val()
  const description = $('#put-form #description').val()
  const status = $('#put-form #status').val()
  const due_date = $('#put-form #due_date').val()
  let todo = {
    title,
    description,
    status,
    due_date,
    todoId
  }
  console.log(todo)
  $.ajax({
    url: baseUrl + `/todos/${user_id}`,
    method: 'PUT',
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: todo
  })
  .done((todo) => {
    console.log(todo)
    getTodoById(user_id)
  })
  .fail((xhr, status) => {
    if(Array.isArray(xhr.responseJSON.messages)) {
      alert(xhr.responseJSON.messages)
    }
    else {
      alert(xhr.responseJSON.message)
    }
  })

}

function patchTodo(todoId, user_id) {
  
  $.ajax({
    url: baseUrl + `/todos/${user_id}`,
    method: 'PATCH',
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: { status: "done", todoId }
  })
  .done(() => {
    ($(`#todo-table #todo-${todoId} #todo-status`).text('done'))
    getTodoById(user_id)
  })
  .fail((xhr, status) => {
    console.log(xhr, status)
  })
}

function onSignIn(googleUser) {

  const id_token = googleUser.getAuthResponse().id_token

  $.ajax({
    url: baseUrl + '/users/google-login',
    method: 'POST',
    data: {
      googleToken: id_token
    }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    auth()
  })
  .fail(err => {
    console.log(err)
  })
}





