const baseUrl = 'http://localhost:3000'

$(document).ready(function () {
  auth()
})

function auth () {
  if (!localStorage.access_token) {
    logedOut()
  } else {
    logedIn()
  }
}

function logedOut () {
  $('.toLogin-btn').show()
  $('.toLogout-btn').hide()
  $('.login').show()
  $('.regis').hide()
  $('#name').hide()
  $('#main-page').hide()
  $('#add-form').hide()

  $('.toLogin-btn').click(event => {
    event.preventDefault()
    $('.login').show()
    $('.regis').hide()
  })

  $('#toRegis-btn').click(event => {
    event.preventDefault()
    $('.login').hide()
    $('.regis').show()
  })

  $('#login-form').submit(event => {
    event.preventDefault()
    login()
  })

  $('#regis-form').submit(event => {
    event.preventDefault()
    regis()
  })
}

function login (email, password) {
  if (!email) {
    email = $('#login-email').val()
  }
  if (!password) {
    password = $('#login-password').val()
  }

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/users/login`,
    data: { email, password }
  })
    .done(({ access_token, email }) => {
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('name', email.split('@')[0])
      $('#login-email').val('')
      $('#login-password').val('')
      auth()
    })
    .fail(err => {
      console.log(err)
    })
}

function regis () {
  const email = $('#regis-email').val()
  const password = $('#regis-password').val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/users/register`,
    data: { email, password }
  })
    .done(data => {
      $('#regis-email').val('')
      $('#regis-password').val('')
      login(email, password)
    })
    .fail(err => {
      console.log(err)
    })
}

function logedIn () {
  $('.toLogin-btn').hide()
  $('.toLogout-btn').show()
  $('.login').hide()
  $('.regis').hide()
  $('#name').hide()
  $('#main-page').show()
  $('#add-form').hide()

  $('.toLogout-btn').click(event => {
    event.preventDefault()
    localStorage.removeItem('access_token')
    logedOut()
  })

  if (localStorage.access_token) {
    fetchTodos()
    $('#name').empty()
    $('#name').append(`
    <button id="user-btn">${localStorage.name}</button>
    `)
    $('#name').show()
  }

  $('#home-btn').click(event => {
    event.preventDefault()
    $('#main-page').show()
    $('#add-form').hide()
  })

  $('#toAdd-btn').click(event => {
    event.preventDefault()
    $('#main-page').hide()
    $('#add-form').show()

    $('#add-form').submit(event => {
      event.preventDefault()
      addTodo()
    })
  })
}

function fetchTodos () {

  $.ajax({
    methods: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(todos => {
      $('#todos-container').empty()
      todos.forEach(todo => {
        const date = todo.due_date.split('T')[0]
        let status = './assets/checkbox 0.png'
        if (todo.status == true) {
          status = './assets/checkbox 1.png'
        }
        $('#todos-container').append(`
        <div class="todo-card">
          <ul>
            <li>
              <button class="status-btn btn" onclick="changeStatus(${todo.id},${todo.status})">
                <img class="status-img" src="${status}">
              </button>
            </li>
            <li id="todo-title-${todo.id}">${todo.title}</li>
            <li id="todo-desc-${todo.id}">${todo.description}</li>
          </ul>
          <ul>
            <li>
              <button id="delete-btn" onclick="deleteTodo(${todo.id})">
                <img class="delete-img" src="./assets/delete 2.png">
              </button>
            </li>
            <li>${date}</li>
          </ul>
        </div>
        `)
      })
    })
    .catch(err => {
      console.log(err)
    })
}

function changeStatus (id, status) {
  console.log('click')
  if (status == true) {
    status = false
  } else {
    status = true
  }

  $.ajax({
    method: 'PATCH',
    url: `${baseUrl}/todos/${id}`,
    headers: { access_token: localStorage.access_token },
    data: { status }
  })
    .done(() => {
      fetchTodos()
    })
    .catch(err => {
      console.log(err)
    })
}

function addTodo () {
  const title = $('#add-title').val()
  const description = $('#add-desc').val()
  const due_date = $('#add-due_date').val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/todos`,
    headers: { access_token: localStorage.access_token },
    data: { title, description, due_date }
  })
    .done(() => {
      $('#add-title').val('')
      $('#add-desc').val('')
      $('#add-due_date').val('')
      fetchTodos()
      $('#main-page').show()
      $('#add-form').hide()
    })
    .catch(err => {
      console.log(err)
    })
}

function deleteTodo (id) {
  $.ajax({
    method: 'DELETE',
    url: `${baseUrl}/todos/${id}`,
    headers: { access_token: localStorage.access_token }
  })
    .done(response => {
      console.log(response)
      fetchTodos()
    })
    .catch(err => {
      console.log(err)
    })
}