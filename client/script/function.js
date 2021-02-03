const baseUrl = 'http://localhost:3000'

function convertDate(d) {
  if (d) {
      d = new Date(d);
      return [d.getFullYear(), d.getMonth()+1, d.getDate()]
          .map(el => el < 10 ? `0${el}` : `${el}`).join('-');
  } else {
      return d;
  }
}

function checkPage() {
  if (!localStorage.getItem('token')) {
    if (localStorage.currentPage === 'login') {
      showLogin()
    } else if (localStorage.currentPage === 'register') {
      showRegister()
    } else {
      showLogin()
    }
  } else {
    if (localStorage.currentPage === 'dashboard') {
      showDashboard()
    } else if (localStorage.currentPage === 'viewListTodo') {
      showTodo()
    } else if (localStorage.currentPage === 'createTodo') {
      showCreateForm()
    } else if (localStorage.currentPage === 'viewListTodoDone') {
      showTodoDone()
    } else {
      showTodo()
    }
  }
}

function showLogin() {
  localStorage.setItem('currentPage', 'login')
  $('#login-container').show()
  $('#register-container').hide()
  $('#dashboard').hide()
  $('#navigation-bar').hide()
  $('#list-todo-container').hide()
}

function login() {
  $.ajax({
    url: `${baseUrl}/users/login`,
    method: 'POST',
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
    .done((response) => {
      localStorage.setItem('token', response.accessToken)
      localStorage.setItem('currentPage', 'dashboard')
      checkPage()
    })
    .fail((jqXHR, text) => {
      console.log(jqXHR.responseJSON)
      $('#errorLogin').empty().append(`
        <div class="alert alert-danger alert-dismissible fade show">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Error!</strong> ${jqXHR.responseJSON.errors}
        </div>
      `)
    })
    .always(_ => {
      $("#login-form").trigger("reset")
    })
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token

  $.ajax({
    url: `${baseUrl}/users/logingoogle`,
    method: 'POST',
    data: {
      googleToken: id_token
    }
  })
    .done(response => {
      localStorage.setItem('token', response.accessToken)
      localStorage.setItem('currentPage', 'dashboard')
      checkPage()
    })
    .fail((jqXHR, text) => {
      console.log(jqXHR.responseJSON)
    })
}

function logout() {
  localStorage.clear()
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    console.log('User signed out.')
  })
  checkPage()
}

function showRegister() {
  localStorage.setItem('currentPage', 'register')
  $('#login-container').hide()
  $('#register-container').show()
  $('#dashboard').hide()
  $('#navigation-bar').hide()
  $('#list-todo-container').hide()
}

function register() {
  $.ajax({
    url: `${baseUrl}/users/register`,
    method: 'POST',
    data: {
      email: $('#register-email').val(),
      password: $('#register-password').val()
    }
  })
    .done((response) => {
      showLogin()
    })
    .fail((jqXHR, text) => {
      console.log(jqXHR.responseJSON)
      $('#errorRegister').empty()
      jqXHR.responseJSON.errors.forEach(err => {
        $('#errorRegister').append(`
        <div class="alert alert-danger alert-dismissible fade show">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Error!</strong> ${err}
        </div>
      `)
      })
    })
    .always(_ => {
      $('#register-form').trigger('reset')
    })
}

function showDashboard() {
  localStorage.setItem('currentPage', 'dashboard')
  $('#login-container').hide()
  $('#register-container').hide()
  $('#list-todo-container').hide()

  $('#dashboard').show()
  $('#navigation-bar').show()
  $('#content-nav').empty().append(`
    <li class="nav-item active">
      <a class="nav-link" href="#" onclick="showDashboard()"><i class="fa fa-home"></i> Home <span class="sr-only">(current)</span></a>
    </li>

    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fa fa-list"></i> Todo
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#" onclick="showTodo()">My Todo List</a>
        <a class="dropdown-item" href="#" onclick="showTodoDone()">My Todo List Done</a>
        
        <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" role="button" data-toggle="modal" id="#createTodoButton"
            data-target="#createModal">Add Todo</a>
        </div>
    </li>
    
    <li class="nav-item">
      <a class="nav-link" href="#" id="logout-nav" onclick="logout()"><i class="fa fa-sign-out"></i> Logout</a>
    </li>
  `)
  clockUpdate();
  setInterval(clockUpdate, 1000);
}

function clockUpdate() {
  var date = new Date();
  $('.digital-clock').css({'color': '#fff', 'text-shadow': '0 0 6px gray'});
  function addZero(x) {
    if (x < 10) {
      return '0' + x;
    } else {
      return x;
    }
  }

  function twelveHour(x) {
    if (x > 12) {
      return x - 12;
    } else if (x == 0) {
      return 12;
    } else {
      return x;
    }
  }

  var h = addZero(twelveHour(date.getHours()));
  var m = addZero(date.getMinutes());
  var s = addZero(date.getSeconds());

  $('.digital-clock').text(h + ':' + m + ':' + s)
}

function showTodo() {
  localStorage.setItem('currentPage', 'viewListTodo')
  $("#login-container").hide()
  $("#register-container").hide()
  $("#dashboard").hide()

  $('#list-todo-container').show()
  $('#navigation-bar').show()
  $('#content-nav').empty().append(`
    <li class="nav-item">
      <a class="nav-link" href="#" onclick="showDashboard()"><i class="fa fa-home"></i> Home <span class="sr-only">(current)</span></a>
    </li>

    <li class="nav-item dropdown active">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fa fa-list"></i> Todo
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#" onclick="showTodo()">My Todo List</a>
        <a class="dropdown-item" href="#" onclick="showTodoDone()">My Todo List Done</a>
        
        <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" role="button" data-toggle="modal" id="#createTodoButton"
            data-target="#createModal">Add Todo</a>
        </div>
    </li>
    
    <li class="nav-item">
      <a class="nav-link" href="#" id="logout-nav" onclick="logout()"><i class="fa fa-sign-out"></i> Logout</a>
    </li>
  `)
  getTodosUndone()
}

function getTodosUndone() {
  $.ajax({
    url: `${baseUrl}/todos?status=false`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      $('#card-content').empty()
      response.forEach((value, index) => {
        const date = convertDate(value.due_date)
        $('#card-content').append(`
        <div class="col-sm-4">
          <div class="card mt-3 mx-3" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title text-center">${value.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted text-center">${date}</h6>
              <br>
              
              <p><b>Description</b><p>
              <p class="card-text">${value.description}</p>
              
              <button type="button" class="btn btn-info btn-block" data-toggle="modal"
              data-target="#weatherModal" id="weatherTodoButton" onclick="showModalWeather('${value.id}')"><i class="fa fa-sun-o"></i> See Weather Prediction</button>
              
              <button type="button" class="btn btn-success btn-block" onclick="updateStatusTodo('${value.id}', true)"
                id="doneTodoButton"><i class="fa fa-check-square-o"></i> Done</button>
              
              <button type="button" class="btn btn-warning btn-block" id="editTodoButton${index}" data-toggle="modal"
                  data-target="#editModal"><i class="fas fa-edit"></i> Edit</button>
              
              <button type="button" class="btn btn-danger btn-block" data-toggle="modal"
                data-target="#deleteModal" id="deleteTodoButton" onclick="showDelete('${value.id}')"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
          </div>
        </div>
        `)

        $(`#editTodoButton${index}`).click(() => {
          showEdit(value.id, value.title, value.description, value.due_date)
        })
      })
    })
    .fail((jqXHR, text) => {
      console.log(jqXHR.responseJSON)
    })
}

function showCreateForm() {
  localStorage.setItem('currentPage', 'createTodo')
  $("#login-container").hide()
  $("#register-container").hide()
  $("#dashboard").hide()

  $('#list-todo-container').show()
  getTodosUndone()

  $('#createModal').show()

  $('#createModalForm').trigger('reset')
}

function createTodo() {
  $.ajax({
    url: `${baseUrl}/todos`,
    method: 'POST',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      title: $('#titleCreate').val(),
      description: $('#descriptionCreate').val(),
      due_date: $('#dueDateCreate').val()
    }
  })
    .done((response) => {
      console.log(response)
      showTodo()
    })
    .fail((jqXHR, text) => {
      console.log(jqXHR.responseJSON)
    })
}

function showEdit(id, title, description, due_date) {
  $("#login-container").hide()
  $("#register-container").hide()
  $("#dashboard").hide()

  $('#list-todo-container').show()
  getTodosUndone()

  $('#editModal').show()
  $('#editModalForm').empty().append(`
        <div class="form-group">
        <label for="titleEditModal">Task Title</label>
        <input type="text" class="form-control" id="titleEdit" name="title" value="${title}">
      </div>

      <div class="form-group">
        <label for="descriptionEditModal">Description Task</label>
        <textarea class="form-control" rows="5" id="descriptionEdit" name="description">${description}</textarea>
      </div>

      <div class="form-group">
        <label for="dueDateEditModal">Due Date</label>
          <input type="date" class="form-control" id="dueDateEdit" name="date" value="${convertDate(due_date)}">
      </div>
  `)
  $('#editModalFooter').empty().append(`
  <button type="button" class="btn btn-success" id="saveEditModal" onclick="editTodo('${id}')" data-dismiss="modal">Edit</button>
  <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>`
  )
}

function editTodo(id) {
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: 'PUT',
    data: {
      title: $('#titleEdit').val(),
      description: $('#descriptionEdit').val(),
      due_date: $('#dueDateEdit').val(),
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done((response) => {
      console.log(response);
      getTodosUndone()
    })
    .fail((jqXHR, text) => {
      console.log(jqXHR.responseJSON)
    })
}

function updateStatusTodo(id, value) {
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: 'PATCH',
    data: {
      status: value
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done((response) => {
      if (String(value) === 'false') {
        showTodoDone()
      } else if (String(value) === 'true') {
        showTodo()
      }
    })
    .fail((jqXHR, text) => {
      console.log(jqXHR.responseJSON)
    })
}

function showTodoDone() {
  localStorage.setItem('currentPage', 'viewListTodoDone')
  $("#login-container").hide()
  $("#register-container").hide()
  $("#dashboard").hide()

  $('#list-todo-container').show()
  $('#navigation-bar').show()
  $('#content-nav').empty().append(`
    <li class="nav-item">
      <a class="nav-link" href="#" onclick="showDashboard()"><i class="fa fa-home"></i> Home <span class="sr-only">(current)</span></a>
    </li>

    <li class="nav-item dropdown active">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fa fa-list"></i> Todo
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#" onclick="showTodo()">My Todo List</a>
        <a class="dropdown-item" href="#" onclick="showTodoDone()">My Todo List Done</a>
        
        <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" role="button" data-toggle="modal" id="#createTodoButton"
            data-target="#createModal">Add Todo</a>
        </div>
    </li>
    
    <li class="nav-item">
      <a class="nav-link" href="#" id="logout-nav" onclick="logout()"><i class="fa fa-sign-out"></i> Logout</a>
    </li>
  `)
  getTodosDone()
}

function getTodosDone() {
  $.ajax({
    url: `${baseUrl}/todos?status=true`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      $('#card-content').empty()
      response.forEach((value, index) => {
        const date = convertDate(value.due_date)
        $('#card-content').append(`
        <div class="col-sm-4">
          <div class="card mt-3 mx-3" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title text-center">${value.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted text-center">${date}</h6>
              <br>
              
              <p><b>Description</b><p>
              <p class="card-text">${value.description}</p>
              
              <button type="button" class="btn btn-success btn-block" onclick="updateStatusTodo('${value.id}', false)"
                id="doneTodoButton"><i class="fa fa-window-close-o"></i> Undone</button>
              
              <button type="button" class="btn btn-danger btn-block" data-toggle="modal"
                data-target="#deleteModal" id="deleteTodoButton" onclick="showDelete('${value.id}')"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
          </div>
        </div>
        `)
      })
    })
    .fail((jqXHR, text) => {
      console.log(jqXHR.responseJSON)
    })
}

function deleteTodo(id) {
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: 'DELETE',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done((response) => {
      showTodo()
    })
    .fail((jqXHR, status) => {
      console.log(jqXHR.responseJSON)
    })
}

function showDelete(id) {
  $('#login-container').hide()
  $('#register-container').hide()

  $('#deleteModal').show()
  $('#deleteModalFooter').empty().append(`
    <button type="button" class="btn btn-success" id="saveDeleteModal" onclick="deleteTodo('${id}')" data-dismiss="modal">Yes</button>
    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>`
  )
}

function showModalWeather(id) {
  $("#login-container").hide()
  $("#register-container").hide()
  $("#dashboard").hide()

  $('#list-todo-container').show()

  $('#weatherModal').show()

  $('#modalWeather-content').empty()
  $('#modalWeather-content').append(`
  <div class="modal-header">
    <h4 class="modal-title"><i class="fas fa-edit"></i> Input City</h4>
    <button type="button" class="close" data-dismiss="modal">&times;</button>
  </div>

  <!-- Modal body -->
  <div class="modal-body">
    <div class="container">
      <form action="" id="weatherModalForm">
        <div class="form-group" id="cityInputForm">
          <label for="weatherModal">City Name</label>
          <input type="text" class="form-control" id="cityName" placeholder="Enter your city" name="title">
        </div>
      </form>
    </div>
  </div>

  <div class="modal-footer" id="weatherModalFooter">
    <button type="button" class="btn btn-success" id="saveCityModal" onclick="getCityName('${id}')">Yes</button>
    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
  </div>
  `)

}

function getCityName(id) {
  $.ajax({
    url: `${baseUrl}/weathers/${id}`,
    method: 'POST',
    data: {
      city: $('#cityName').val()
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      // console.log(response);
      getWeatherInfo(id, response.city);
    })
    .fail((jqXHR, text) => {
      console.log(jqXHR.responseJSON);
    })
}

function getWeatherInfo(id, city) {
  $.ajax({
    url: `${baseUrl}/weathers/${id}?city=${city}`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      console.log(response);
      $('#modalWeather-content').empty()
      $('#modalWeather-content').append(`
      <div class="modal-header">
        <h4 class="modal-title"><img src="./src/logo-weatherInfo.png" style="width: 50px;"> Weather Information</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
        <img src="https://www.weatherbit.io/static/img/icons/${response.weather.icon}.png" alt="" style="width: 90px; margin-left: 12rem;" >
        
        <div class="container">
          <h4 class="text-center">${response.weather.description}</h4>
          <p class="text-center">${city}<p>
          <p class="text-center"><strong>${response.datetime}</strong></p>
          <p class="text-center">${response.temp}°C</p>
        </div>
      </div>
      `)
      
    })
    .fail((jqXHR, text) => {
      console.log(jqXHR.responseJSON);
      $('#modalWeather-content').empty()
      $('#modalWeather-content').append(`
      <div class="modal-header">
        <h4 class="modal-title"><i class="fas fa-edit"></i> Weather Information</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
        <strong>Oops!</strong> ${jqXHR.responseJSON.errors}
      </div>
      `)
    })
}