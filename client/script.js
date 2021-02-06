const server_url = 'http://localhost:3000'

function auth () {
  if (!localStorage.getItem('access_token')) {
    $('#login').show()
    $('#img-h8').show()
    $('#register').hide()
    $('#todoList').hide()
    $('#todoListFalse').hide()
    $('#createTodo').hide()
    $('#editTodo').hide()
    $('#create').hide()
    $('#logout').hide()
    $('#newsCard').hide()
    $("#navbar").hide()
    $('#sectionUser').show()
    $('h4').hide()
  } else {
    $('h4').show()
    $("#navbar").show()
    $('#img-h8').hide()
    $('#login').hide()
    $('#register').hide()
    $('#editTodo').hide()
    $('#createTodo').hide()
    $('#logout').show()
    $('#create').show()
    $('#todoList').show()
    $('#todoListFalse').show()
    $('#sectionUser').hide()
    getTodo()
    $('#newsCard').show()
    news()
  }
}



function logout () {
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  auth()
}
function regisToLogin () {
  $('#login').show()
  $('#register').hide()
}
function loginToRegis () {
  $('#login').hide()
  $('#register').show()
}
function login () {
  const email =  $('#emailLogin').val()
  const password = $('#passwordLogin').val()
  $.ajax({
    url: server_url + '/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
    .done((data) => {
      localStorage.setItem('access_token', data.access_token)
      $('#emailLogin').val("")
      $('#passwordLogin').val("")
      auth()
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('login running')
    })
}
function register () {
  const email = $('#emailRegister').val()
  const password = $('#passwordRegister').val()
  $.ajax({
    url: server_url + '/register',
    method: 'post',
    data: {
      email,
      password
    }
  })
    .done((data) => {
      console.log(email, password, 'register')
    })
    .fail((xhr, text) => {
      console.log(xhr.responseText)
    })
    .always(() => {
      console.log('register')
    })
}
function getTodo () {
  $.ajax({
    url: server_url + '/todos',
    method: 'get',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done((todo) => {
      $('#todoList').empty()
      $('#todoListFalse').empty()
      todo.forEach(el => {
        if (el.status) {
          $('#todoList').append(
            `<div class="form-control card" style="width: 18rem; background-color: #f9f871">
              <div class="card-body">
                <h5 class="card-title">${el.title}</h5>
                <p class="card-text">${el.description}</p>
                <input type="checkbox" checked="" id="status" onclick="changeStatus(${el.id})"> done todo
                <p class="card-text">${el.due_date.split("T")[0]}</p>
                <a href="#" class="btn btn-primary" onclick="findTodo(${el.id})">Change</a>
                <a href="#" class="btn btn-danger" onclick="remove(${el.id})">Delete</a>
              </div>`
          )
        } else {
          $('#todoListFalse').append(
            `<div class="form-control card" style="width: 18rem; background-color: #94b5c0">
              <div class="card-body">
                <h5 class="card-title">${el.title}</h5>
                <p class="card-text">${el.description}</p>
                <input type="checkbox" check="" id="status" onclick="changeStatus(${el.id})"> Waiting todo
                <p class="card-text">${el.due_date.split("T")[0]}</p>
                <a href="#" class="btn btn-primary" onclick="findTodo(${el.id})">Change</a>
                <a href="#" class="btn btn-danger" onclick="remove(${el.id})">Delete</a>
              </div>`
          )
        }
      });
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {

    })
}
function create () {
  const title = $('#title').val()
  const description = $('#description').val()
  const due_date = $('#due_date').val()
  const status = $('#status').prop('checked')
  $.ajax({
    url: server_url + '/todos',
    method: 'post',
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
    .done((data) => {
      $('#title').val('')
      $('#description').val('')
      $('#due_date').val('')
      getTodo()
      auth()
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('from createTodo')
    })
}
function remove(id) {
  $.ajax({
    url: server_url + '/todos/' + id,
    method: 'delete',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done((data) => {
      console.log('data was deleted')
      getTodo()
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('Running delete')
    })
}
function findTodo (id) {
  $.ajax({
    url: server_url + '/todos/' + id,
    method: 'get',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done((data) => {
      console.log(data)
      $('#editTodo').show()
      $('h4').hide()
      $('#todoList').hide()
      $('#todoListFalse').hide()
      $('#create').hide()
      $('#logout').hide()
      $("#newsCard").hide()
      $('#edit_title').val(data.title)
      $('#edit_description').val(data.description)
      $('#edit_due_date').val(data.due_date.split("T")[0])
      if (data.status) {
        $('#edit_status').prop('checked')
      } else {
        $('#edit_status').prop('check')
      }
      $('#submitUpdate').data("id", data.id)
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('dari findTodo')
    })
}
function update (id) {
  const title = $('#edit_title').val()
  const description = $('#edit_description').val()
  const due_date = $('#edit_due_date').val()
  const status = $('#edit_status').val()
  $.ajax({
    url: server_url + '/todos/' + id,
    method: 'put',
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
    .done((data) => {
      console.log(data)
    })
    .fail((err) => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('dari always')
    })
}
function news () {
  $.ajax({
    url: server_url + '/news',
    method: 'get',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done((data) => {
      console.log(data)
      $("#newsCard").empty()
      data.forEach(el => {
        $('#newsCard').append(
          `<div class="card-body">
            <img class="card-img-top" src="${el.urlToImage}" alt="Card image cap">
            <p class="card-text">${el.title}</p>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModalLong${el.id}">
              read some
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModalLong${el.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">News</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">x</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    ${el.content} <br> or you can go to <br> ${el.url}
                    
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`
        )
      })
    })
    .fail(err => {
      console.log(err.responseText)
      console.log('err.responseText')
    })
    .always(() => {
      console.log('news is running')
    })
}
function onSignIn(googleUser) {
  var google_token = googleUser.getAuthResponse().id_token;
  // console.log(id_token);
  $.ajax({
    url: server_url + '/googleLogin',
    method: 'post',
    data: {
      google_token
    }
  })
    .done(data => {
      console.log(data);
      const token = data.access_token;
      localStorage.setItem("access_token", token);
      auth()
    })
    .fail(err => {
      console.log(err)
    })
}
// <input type="checkbox" value="1" name="checkMeOut" id="checkMeOut" checked="checked" />
// $('#checkMeOut').prop('checked'); // true

// if($('#checkMeOut').prop('checked')) {
//   something when checked
// } else {
//   something else when not
//}
function changeStatus (id) {
  let status 
  if ($("#status").prop('checked')) {
    status = true
  } else {
    status = false
  }
  console.log(status, '<<<<<<<<')
  $.ajax({
    url: server_url + '/todos/' + id,
    method: 'patch',
    data: {
      status
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done((data) => {
      getTodo()
    })
    .fail(err => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('change status running')

    })
}
$(document).ready(() => {
  auth()
})
$('#submitUpdate').on('click', (event) => {
  event.preventDefault()
  const id = $('#submitUpdate').data('id')
  const title = $("#edit_title").val()
  const description= $("#edit_description").val()
  const due_date = $("#edit_due_date").val()
  const status = $("#edit_status").prop('checked')
  console.log(id)

  $.ajax({
    url: server_url + '/todos/' + id,
    method: 'put',
    data: {
      title,
      description,
      due_date,
      status
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done((data) => {
      console.log(data)
      getTodo()
      auth()
    })
    .fail(err => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('from submitUpdate')
    })
})
$('#loginForm').on('submit', (event) => {
  event.preventDefault()
  login()
  auth()
})
$('#registerForm').on('submit', (event) => {
  event.preventDefault()
  register()
})
$('#rgs-lgn-btn').on('click', (event) => {
  event.preventDefault()
  regisToLogin()
})
$('#lgn-rgs-btn').on('click', (event) => {
  event.preventDefault()
  loginToRegis()
})
$('#logout').on('click', (event) => {
  event.preventDefault()
  logout()
})
$('#create').on('click', (event) => {
  event.preventDefault()
  $('#todoList').hide()
  $('h4').hide()
  $('#todoListFalse').hide()
  $('#logout').hide()
  $('#create').hide()
  $("#newsCard").hide()
  $('#sectionUser').hide()
  $('#createTodo').show()

})
$('#cancelCreate').on('click', (event) => {
  event.preventDefault()
  $("#newsCard").show()
  $('#todoList').show()
  $('#todoListFalse').show()
  $('h4').show()
  $('#logout').show()
  $('#create').show()
  $('#createTodo').hide()
})
$('#cancelEdit').on('click', (event) => {
  event.preventDefault()
  $("h4").show()
  $("#newsCard").show()
  $('#todoListFalse').show()
  $('#todoList').show()
  $('#logout').show()
  $('#create').show()
  $('#editTodo').hide()
})
$('#createTodo').on('submit', (event) => {
  event.preventDefault()
  create()
})
$('#editTodo').on('submit', (event) => {
  event.preventDefault()
  update()
}) 