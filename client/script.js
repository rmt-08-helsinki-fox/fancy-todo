const baseUrl = 'http://localhost:3000'

$(document).ready(function () {
  auth()

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

  $('.toLogout-btn').click(event => {
    event.preventDefault()
    localStorage.removeItem('access_token')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
    auth()
  })

  $('#home-btn').click(event => {
    event.preventDefault()
    $('#main-page').show()
    $('#add-page').hide()
  })

  $('#toAdd-btn').click(event => {
    event.preventDefault()
    $('#main-page').hide()
    $('#add-page').show()
    $('#add-form').show()
    $('#edit-form').hide()

    $('#add-title').val('')
    $('#add-desc').val('')
    $('#add-due_date').val('')
  })
  
  $('#add-form').submit(event => {
    event.preventDefault()
    addTodo()
  })
})

function auth () {
  if (!localStorage.access_token) {
    logedOut()
  } else {
    logedIn()
    getQuotes()
    fetchTodos()
    $('#name').empty()
    $('#name').append(`
    <div id="user-name">${localStorage.name}</div>
    `)
    $('#name').show()
  }
}

function logedOut () {
  $('.toLogin-btn').show()
  $('.toLogout-btn').hide()
  $('.login').show()
  $('.regis').hide()
  $('#name').hide()
  $('#main-page').hide()
  $('#add-page').hide()
}

function logedIn () {
  $('.toLogin-btn').hide()
  $('.toLogout-btn').show()
  $('.login').hide()
  $('.regis').hide()
  $('#name').hide()
  $('#main-page').show()
  $('#add-page').hide()
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
      auth()
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {
      $('#login-email').val('')
      $('#login-password').val('')
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
      login(email, password)
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {
      $('#regis-email').val('')
      $('#regis-password').val('')
    })
}

function getQuotes () {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/quotes`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      let authorArr = response.author.split(' ')
      let author = response.author
      if (authorArr.length > 1) {
        author = `${authorArr[0]} ${authorArr[1]}`
      }
      $('#quote-box').empty()
      $('#quote-box').append(`
        <marquee class="quote-text">${response.quote} -${author}</marquee>
      `)
    })
    .fail(err => {
      console.log(err)
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
      if (todos.length < 1){
        $('#todos-container').append(`
          <h3 style="text-align: center">you don't have any todo</h3>
        `)
      } else {
        todos.forEach(todo => {
          const date = todo.due_date.split('T')[0]
          let status = './assets/checkbox 0.png'
          if (todo.status == true) {
            status = './assets/checkbox 1.png'
          }
          $('#todos-container').append(`
          <div class="todo-card" id="todo-${todo.id}">
            <ul>
              <li>
                <button class="status-btn btn" onclick="changeStatus(${todo.id},${todo.status})">
                  <img class="status-img" src="${status}">
                </button>
              </li>
              <li class="todo-title">${todo.title}</li>
              <li class="todo-desc">${todo.description}</li>
            </ul>
            <ul>
              <li>
                <button id="toEdit-btn" onclick="toEditTodo(${todo.id}, '${todo.title}', '${todo.description}', '${todo.due_date}')">
                  <img class="edit-img" src="./assets/edit 2.png">
                </button>
              </li>
              <li>
                <button id="delete-btn" onclick="deleteTodo(${todo.id})">
                  <img class="delete-img" src="./assets/delete 2.png">
                </button>
              </li>
              <li onclick="expand(${todo.id})">${date}</li>
            </ul>
          </div>
          `)
        })
      }
      logedIn()
    })
    .catch(err => {
      console.log(err)
    })
}

function changeStatus (id, status) {
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
      fetchTodos()
      $('#main-page').show()
      $('#add-page').hide()
    })
    .catch(err => {
      console.log(err)
    })
    .always(() => {
      $('#add-title').val('')
      $('#add-desc').val('')
      $('#add-due_date').val('')
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

function toEditTodo (id, title, desc, due_date) {
  due_date = due_date.split('T')[0]

  $('#main-page').hide()
  $('#add-page').show()
  $('#add-form').hide()
  $('#edit-form').show()

  $('#add-title').val(title)
  $('#add-desc').val(desc)
  $('#add-due_date').val(due_date)

  $('#edit-form').submit(event => {
    event.preventDefault()
    editTodo(id)
  })
}

function editTodo (id) {
  const title = $('#edit-title').val()
  const description = $('#edit-desc').val()
  const due_date = $('#edit-due_date').val()

  $.ajax({
    method: 'PUT',
    url: `${baseUrl}/todos/${id}`,
    headers: { access_token: localStorage.access_token },
    data: { title, description, due_date }
  })
    .done(() => {
      fetchTodos()
      $('#main-page').show()
      $('#add-page').hide()
    })
    .catch(err => {
      console.log(err)
    })
    .always(() => {
      $('#edit-title').val('')
      $('#edit-desc').val('')
      $('#edit-due_date').val('')
    })
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/users/googleLogin`,
    data: { id_token }
  })
    .done(({ access_token, email }) => {
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('name', email.split('@')[0])
      auth()
    })
    .fail(err => {
      console.log(err)
    })
}
