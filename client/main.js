const baseUrl = "http://localhost:3000"

$(document).ready(function () {
  checkAuth()
})

function checkAuth() {
  if (localStorage.access_token) {
    $(`#navbar`).show()
    $(`#todolist-page`).show()
    $(`#register-page`).hide()
    $(`#login-page`).hide()
    $(`#addTodo-page`).hide()
    $(`#updateTodo-page`).hide()
    fetchTodo()
  } else {
    $(`#navbar`).hide()
    $(`#todolist-page`).hide()
    $(`#register-page`).hide()
    $(`#login-page`).show()
    $(`#updateTodo-page`).hide()
    $(`#addTodo-page`).hide()
  }
}

function showHome() {
  $(`#navbar`).show()
  $(`#addTodo-page`).hide()
  $(`#todolist-page`).show()
  $(`#register-page`).hide()
  $(`#updateTodo-page`).hide()
  $(`#login-page`).hide()
}

function showFormUpdate() {
  $(`#navbar`).show()
  $(`#updateTodo-page`).show()
  $(`#addTodo-page`).hide()
  $(`#todolist-page`).hide()
  $(`#register-page`).hide()
  $(`#login-page`).hide()
}

function showFormRegister() {
  $(`#register-page`).show()
  $(`#login-page`).hide()
  $(`#regis-fullname`).val('')
  $(`#regis-email`).val('')
  $(`#regis-password`).val('')
}

function showFormLogin() {
  $(`#register-page`).hide()
  $(`#login-page`).show()
}

function showFormAddTodo() {
  $(`#navbar`).show()
  $(`#addTodo-page`).show()
  $(`#todolist-page`).hide()
}

function logOut() {
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: `POST`,
    url: `${baseUrl}/user/loginGoogle`,
    data: { id_token }
  })
  .done( response => {
    localStorage.setItem(`access_token`,response.access_token)
    checkAuth()
  })
  .fail(err => {
    console.log(err)
  })
  .always(() => {
    $(`#login-email`).val('')
    $(`#login-password`).val('')
  })
}

function logIn() {
  var email = $(`#login-email`).val()
  var password = $(`#login-password`).val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/user/login`,
    data: {
      email,
      password
    }
  })
    .done(response => {
      localStorage.setItem(`access_token`, response.access_token)
      checkAuth()
    })
    .fail( err => {
      console.log(err)
    })
    .always( () => {
      $(`#login-email`).val('')
      $(`#login-password`).val('')
    })
}

function register() {
  var fullname = $(`#regis-fullname`).val()
  var email = $(`#regis-email`).val()
  var password = $(`#regis-password`).val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/user/register`,
    data: {
      fullname,
      email,
      password
    }
  })
    .done( response => {
      showFormLogin()
      checkAuth()
    })
    .fail( err => {
      console.log(err)
    })
    .always( () => {
      $(`#regis-email`).val('')
      $(`#regis-fullname`).val('')
      $(`#regis-password`).val('')
      $(`#login-email`).val('')
      $(`#login-password`).val('')
    })
}

function addTodo() {
  let title = $(`#addTodo-Title`).val()
  let description = $(`#addTodo-Description`).val()
  let status = $(`#addTodo-Status`).val()
  let due_date = $(`#addTodo-Date`).val()
  $.ajax({
    method: `POST`,
    url: baseUrl + '/todos',
    headers: {
        access_token: localStorage.access_token,
      },
    data: {
        title, description, status, due_date
      }
  })
    .done((response) => {
      checkAuth()
    })
    .fail(err => {
      console.log(err);
    })
    .always(() => {
      $(`#addTodo-Description`).val('')
      $(`#addTodo-Title`).val('')
      $(`#addTodo-Date`).val('')
    })
}

function fetchTodo() {
  $.ajax({
    method: `GET`,
    url: baseUrl + '/todos',
    headers: {
      access_token: localStorage.access_token
      },
  })
    .done( (response) => {
      $(`#Todos-Not-Done`).empty()
      $(`#Todos-Done`).empty()
      response.forEach(element => {
          if (element.status === false) {
            $(`#Todos-Not-Done`).append(`
            <div class="card" style="margin: 10px;">
              <div class="card-header"> 
              Not Done 
              </div>
              <div class="card-body">
                  <h3 class="card-title"> ${element.title} </h3>
                  <p class="card-text"> ${element.description} </p> 
                  <br>
                  <p class="card-text"> ${element.due_date.slice(0,10)} </p>
                  <br>
                  <a href="#" class="btn btn-outline-primary" onclick="DoneTodo(${element.id})"> Done </a>
                  <a href="#" class="btn btn-outline-secondary" onclick="PageUpdateTodo(${element.id})"> Update </a>
                  <a href="#" class="btn btn-outline-danger" onclick="DeleteTodo(${element.id})"> Delete </a>
                </div>
              </div>
            </div>`)
          } else if (element.status === true) {
            $(`#Todos-Done`).append(`
            <div class="card" style="margin: 10px;">
              <div class="card-header">
              Done
              </div>
              <div class="card-body">
                <h3 class="card-title"> ${element.title} </h3>
                <p class="card-text"> ${element.description} </p> 
                <br>
                <p class="card-text"> ${element.due_date.slice(0,10)} </p>
                <br>
                <a href="#" class="btn btn-outline-primary" onclick="NotDoneTodo(${element.id})"> Not Done </a>
                <a href="#" class="btn btn-outline-danger" onclick="DeleteTodo(${element.id})"> Delete </a
              </div>
            </div>`)
          }
        })
      })
      .fail( err => {
        console.log(err);
      })
      .always( () => {
      })
}

function PageUpdateTodo(id) {
  showFormUpdate() 
  $.ajax({
    method: `GET`,
    url: baseUrl + `/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
      }
  })
    .done( (response) => {
        $(`#updateTodo-page`).append(`
          <div class="row mt-4 border rounded">
          <form action="">
            <div class="container position-sticky" >
              <h2>UPDATE TODO</h2>
          </div>
            <div class="mb-3">
              <label class="form-label">Title </label>
              <input type="text" class="form-control" id="updateTodo-Title" value="${response.title}">
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <input type="textarea" class="form-control" id="updateTodo-Description" rows="3" value="${response.description}">
            </div>
            <div class="mb-3">
              <label class="form-label">Status</label>
              <input class="form-control" type="text" value="Not Done" id="updateTodo-Status" aria-label="Disabled input example" disabled>
            </div>
            <div class="mb-3">
              <label class="form-label">Date</label>
              <input class="form-control" type="date" id="updateTodo-Date" value="${response.due_date.slice(0,10)}">
              <div class="form-text">Date must be greater or equal than today</div>
            </div>
            <input type="submit" class="btn btn-outline-success" onclick="updateTodo(${response.id})" value="Update Todo">
            <input type="submit" class="btn btn-outline-danger" onclick="cancelUpdate()" value="Cancel">
        </form>
        </div>`
        )
      })
    .fail (err => {
      console.log(err);
    })
}

function updateTodo(id){
  let title = $(`#updateTodo-Title`).val()
  let description = $(`#updateTodo-Description`).val()
  let due_date = $(`#updateTodo-Date`).val()

  $.ajax({
    method: `PUT`,
    url: baseUrl + `/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
      },
    data: {
      title, description, due_date
    }
  })
    .done( (response) => {
      checkAuth()
    })
    .fail( err => {
      console.log(err);
    })
    .always( () => {
    })
}

function DeleteTodo(id) {
  $.ajax({
    method: `DELETE`,
    url: baseUrl + `/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
      }
  })
    .done( (response) => {
      checkAuth()
    })
    .fail( err => {
      console.log(err);
    })
    .always( () => {
    })
}

function DoneTodo(id) {
  let status = true
  $.ajax({
    method: `PATCH`,
    url: baseUrl + `/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
      },
    data: { status }
  })
    .done( (response) => {
      fetchTodo()
    })
    .fail( err => {
      console.log(err);
    })
    .always( () => {
    })
}

function NotDoneTodo(id) {
  let status = false
  $.ajax({
    method: `PATCH`,
    url: baseUrl + `/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
      },
    data: { status }
  })
    .done( (response) => {
      fetchTodo()
    })
    .fail( err => {
      console.log(err);
    })
    .always( () => {
    })
}

function cancelUpdate() {
  showHome()
}

function searchTitle() {
  let title = $(`#search-title`).val()
  console.log(title);

  $.ajax({
    method: `GET`,
    url: baseUrl + `/todos/search?`,
    headers: {
      access_token: localStorage.access_token
    },
    data:  { title }  
  })
  .done( (response) => {
    console.log(response);
  })
  .fail( err => {
    console.log(err);
  })
  .always( () => {
  })
}

$(`#link-home`).click((event) => {
  event.preventDefault()
  showHome()
})

$(`#btn-register`).click((event) => {
  event.preventDefault()
  register()
})

$(`#btn-login`).click((event) => {
  event.preventDefault()
  logIn()
})

$(`#btn-logout`).click((event) => {
  event.preventDefault()
  logOut()
  checkAuth()
})

$(`#link-login`).click((event) => {
  event.preventDefault()
  showFormLogin()
})

$(`#link-register`).click((event) => {
  event.preventDefault()
  showFormRegister()
})

$(`#btn-addTodo`).click((event) => {
  event.preventDefault()
  showFormAddTodo()
})

$(`#btn-addTodo-Submit`).click((event) => {
  event.preventDefault()
  addTodo()
})

$(`#btn-addTodo-Cancel`).click((event) => {
  event.preventDefault()
  showHome()
})

