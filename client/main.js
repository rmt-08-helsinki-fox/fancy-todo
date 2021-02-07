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
    $(`#result-search-page`).hide()
    fetchTodo()
  } else {
    $(`#navbar`).hide()
    $(`#todolist-page`).hide()
    $(`#register-page`).hide()
    $(`#login-page`).show()
    $(`#updateTodo-page`).hide()
    $(`#addTodo-page`).hide()
    $(`#result-search-page`).hide()
  }
}

function showFormUpdate() {
  $(`#navbar`).show()
  $(`#updateTodo-page`).show()
  $(`#addTodo-page`).hide()
  $(`#todolist-page`).hide()
  $(`#register-page`).hide()
  $(`#login-page`).hide()
  $(`#result-search-page`).hide()
}

function showFormRegister() {
  $(`#register-page`).show()
  $(`#login-page`).hide()
  $(`#result-search-page`).hide()
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
  $(`#register-page`).hide()
  $(`#login-page`).hide()
  $(`#addTodo-page`).show()
  $(`#todolist-page`).hide()
  $(`#updateTodo-page`).hide()
  $(`#result-search-page`).hide()
}

function logOut() {
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  checkAuth()
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
      Swal.fire({
        title: "Add Todo",
        text: "Your Todo Added Successfully!",
        icon: "success"
      })
      checkAuth()
    })
    .fail(err => {
      let errMessage = err.responseJSON.message.split("Validation error:").join("\n")
      console.log(errMessage);
        Swal.fire({
            title: 'Error!',
            text: errMessage,
            icon: 'error',
        })
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
  $(`#updateTodo-page`).empty()
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
            <input type="submit" class="btn btn-outline-danger" onclick="checkAuth()" value="Cancel">
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
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
          checkAuth()
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
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
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          checkAuth()
        }
      })
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
      checkAuth()
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
      checkAuth()
    })
    .fail( err => {
      console.log(err);
    })
    .always( () => {
    })
}

function searchTitle() {
  let title = $(`#search-title`).val()
  
  $.ajax({
    method: `GET`,
    url: baseUrl + `/todos/search`,
    headers: {
      access_token: localStorage.access_token
    },
    data:  { title }  
  })
  .done( (response) => {
      if ( response.length === 0) {
        $(`#result-search-page`).show()
        $(`#todolist-page`).hide()
        $(`#addTodo-page`).hide()
        $(`#updateTodo-page`).hide()
        $(`#result-search-list`).empty()
        $(`#result-search-list`).append(`
        <p> Todo Not Found </p>
        <br>
        <a href="#" class="btn btn-outline-secondary" onclick="checkAuth()"> Back Home </a>`)        
      } else {
        $(`#result-search-page`).show()
        $(`#todolist-page`).hide()
        $(`#addTodo-page`).hide()
        $(`#updateTodo-page`).hide()
        $(`#result-search-list`).empty()
        response.forEach(element => { 
          let headerCard 
          let btnUpdate
          let btnStatus
          let funcStatus
          if( element.status === false) {
            headerCard = 'Not Done'
            btnUpdate = `<a href="#" class="btn btn-outline-secondary" onclick="PageUpdateTodo(${element.id})"> Update </a>`
            btnStatus = 'Done'
            funcStatus = `DoneTodo(${element.id})`
          } else if (element.status === true) {
            headerCard = 'Done'
            btnUpdate = ''
            btnStatus = 'Not Done'
            funcStatus = `NotDoneTodo(${element.id})`
          }
          $(`#result-search-list`).append(`
          <div class="card" style="margin: 10px;">
            <div class="card-header"> 
            ${headerCard}
            </div>
            <div class="card-body">
                <h3 class="card-title"> ${element.title} </h3>
                <p class="card-text"> ${element.description} </p> 
                <br>
                <p class="card-text"> ${element.due_date.slice(0,10)} </p>
                <br>
                <a href="#" class="btn btn-outline-primary" onclick="${funcStatus}"> ${btnStatus} </a>
                ${btnUpdate}
                <a href="#" class="btn btn-outline-danger" onclick="DeleteTodo(${element.id})"> Delete </a>
              </div>
            </div>
          </div>`)
        })
      }     
    })
    .fail( err => {
      console.log(err);
    })
    .always( () => {
      $(`#search-title`).val('')
    })
}

$(`#btn-register`).click((event) => {
  event.preventDefault()
  register()
})

$(`#btn-login`).click((event) => {
  event.preventDefault()
  logIn()
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

