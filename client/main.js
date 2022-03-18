const baseUrl = "https://fancy-todos-app1.herokuapp.com/"
const btnRegister = $(".btn-register")
const btnLogin = $(".btn-login")
const btnLogout = $(".btn-logout")
const formRegister = $("#register-form")
const formLogin = $("#login-form")
const home = $(".home")
const homeAfter = $("#home-after-login")
const submitRegister = $("#register-submit")
const submitLogin = $("#login-submit")

$(document).ready(() => {
  auth()
})

btnRegister.click(() => {
  pageRegister()
})

btnLogin.click(() => {
  pageLogin()
})

btnLogout.click(() => {
  logout()
})

function pageRegister() {
  hideFuture()
  formRegister.show()
  home.show()
  btnLogin.show()
  
  submitRegister.off('click').on('click', (event) => {
    event.preventDefault()
    data = {
      email: $("#email-regis").val(),
      password: $("#password-regis").val()
    }
    handleRegister(data)
  })
}

function handleRegister(data) {
  // console.log(data, '<<<<<<<<');
  $.ajax({
    method: 'POST',
    url: `${baseUrl}register`,
    data
  })
  .done(() => {
    formRegister.trigger('reset')
    pageLogin()
  })
  .fail(xhr => {
    $('#password-regis').val('')
    Swal.fire({
      title: 'Oops error',
      text: xhr.responseJSON.message[0],
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    // console.log(err, `error register from ajax`);
  })
  .always(() => {
    $("#email").val('')
    $("#password").val('')
  })

}

function pageLogin() {
    hideFuture()
    home.show()
    formLogin.show()
    btnRegister.show()
    homeAfter.hide()

    submitLogin.off('click').on('click', (event) => {
      event.preventDefault()
      data = {
        email: $("#login-email").val(),
        password: $("#login-password").val()
      }
      handleLogin(data)
    })
}

function handleLogin(data) {
  $.ajax({
    method: 'POST',
    url: `${baseUrl}login`,
    data
  })
  .done(res => {
    // console.log(res, '<<<<<');
    localStorage.setItem('access_token', res.access_token)
    formLogin.trigger('reset')
    auth()
  })
  .fail(xhr => {
    $("#login-password").val('')
    Swal.fire({
      title: 'Oops error',
      text: xhr.responseJSON.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    // console.log(err.responseText, `error login from ajax`);
  })
  .always(() => {
    $("#login-email").val('')
    $("#login-password").val('')
  })
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token
  // console.log(id_token);
  $.ajax({
    method: 'POST',
    url: `${baseUrl}googlelogin`,
    data:{
      id_token
    }
  })
  .done(res => {
    localStorage.setItem('access_token', res.access_token)
    auth()
  })
  .fail(xhr =>{
    console.log(`${xhr}, >>>>>>> error google login from ajax`);
    Swal.fire({
      title: 'Oops error',
      text: xhr.responseJSON.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  })
  // .always(() => {
  //   console.log(`di always`);
  // })
}

function getTodo() {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(data => {
    $("#todo-list").empty()
    $.each(data, (index, data) => {
      let status = `<input type="checkbox" class="form-check-input" id="status-${data.id}" onclick="editStatus(${data.id}, '${data.status}')" `
            if (data.status === true) {
                status += `checked>`
            } else if(data.status === false){
                status += `>`
            }
                // console.log(data)
                $('#todo-list').append(`
                <div class="card" id="list-task" style="width: 40rem";>
                    <div class="card-body todo-list-card" id=todoCard${data.id}>
                        <div id=todoCardBody${data.id}>
                            ${status}
                            <h5 class="card-title">${data.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${data.due_date.split('T')[0]}</h6>
                            <p class="card-text">${data.description}</p>
                            <a href="#" onclick='editForm(${data.id})' class="card-link btn btn-primary mt-4" id="editTodo">Edit</a>
                            <a href="#" onclick="deleteTodo(event, ${data.id})" class="card-link btn btn-danger mt-4" id="deleteTodo">Hapus</a>
                        </div>
                    </div>
                </div>
            `)
    })
  })
  .fail(xhr => {
    Swal.fire({
      title: 'Oops error',
      text: xhr.responseJSON.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  })
}

$('#btn-add-todo').click((event) => {
  event.preventDefault()
  $('#add-form').show()
})

$('#add-submit').click((event) => {
  event.preventDefault()
  addTodo()
})

function addTodo() {
  let title = $('#todo-tile').val()
  let description = $('#todo-description').val()
  let due_date = $('#todo-date').val()
  // ajax
  $.ajax({
      method: 'POST',
      url: `${baseUrl}todos`,
      headers: {
          access_token: localStorage.access_token
      },
      data: {
         title,
         description,
         due_date
      }
  })
  .done(response => {
      getTodo()
      $('#add-todo-form').hide()
  })
  .fail(err => {
      console.log(err, "ini error dari ajax");
  })
  .always(()=>{
  })
}

$(`#add-cancel-btn`).click(function (event) {
event.preventDefault()
$('#add-form').hide()
})

function deleteTodo(event, id) {
  event.preventDefault
  $.ajax({
      method: 'DELETE',
      url: `${baseUrl}todos/${id}`,
      headers: {
          access_token: localStorage.access_token
      }
  })
  .done(response => {
    getTodo()
  })
  .fail(err => {
    console.log(err, "ini error dari ajax");
  })
  .always(()=>{
  })
}

function editForm(id) {
  let todoId = id
  $.ajax({
    method: 'GET',
    url: `${baseUrl}todos/${todoId}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(data => {
    $(`#todoCardBody${todoId}`).hide()
    $(`#todoCard${todoId}`).append(`
    <div class="edited-form">
    <h3>Edit Form </h3>
    <form role="form" id="form-edit-main${todoId}">
      <input type="text" class="form-control" value="${data.title} id="title-edit">
      <input type="text" class="form-control" value="${data.due_date.split('T')[0]} id="due-date-edit">
      <input type="text" class="form-control" value="${data.description} id="description-edit">
      <button onclick="submitEdit(event)" class="btn btn-primary-mt-3" id="edit-button">Save</button>
      <button onclick="editCancel(event)" class="btn btn-danger-mt-3" id="edit-cancel-button">Cancel</button>
    </form>
    </div>
    `)
  })
}

function editCancel(event) {
  event.preventDefault()
  $(`#form-edit-main`).hide()
  $('.todo-list-card').show()
  $(`#add-todo-form`).hide()
  getTodo()
}

function submitEdit(event) {
  event.preventDefault()
  editSubmit()
}

function editSubmit(event) {
  $(`#form-edit-main`).show()

  $.ajax({
          method: 'PUT',
          url: `${baseUrl}todos/${todoId}`,
          headers: {
              access_token: localStorage.access_token
          },
          data: {
              title: $('#title-edit').val(),
              description: $('#description-edit').val(),
              due_date: $('#due-date-edit').val()
          }
      })
      .done(data => {
          $(`#form-edit-main`).hide()
          $('.todo-list-card').show()
          $(`#add-todo-form`).show()
          $('#add-todo-form').hide()
          getTodo()
      })
      .fail(err => {
          console.log(err, 'ERROR EDIT')
      })
      .always(() => {
          $('#title-edit').val('')
          $('#due-date-edit').val('')
          $('#description-edit').val('')
      })
}

function editStatus(id, status) {

  let inputStatus
  if (status === 'true') {
      inputStatus = false
  } else {
      inputStatus = true
  }

  $.ajax({
    method: 'PATCH',
    url: `${baseUrl}todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      status: inputStatus
    }
    })
      .done(data => {
          console.log('Berhasil di Edit')
          getTodo()
      })
      .fail(err => {
          console.log(err, "ERROR EDIT")
      })
      .always(() => {

      })
}



function auth() {
  if(localStorage.getItem('access_token')) {
    mainPage()
  } else {
    pageLogin()
  }
}

function logout() {
  localStorage.clear()
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    console.log(`User logout from the app.`);
  })
  pageLogin()
}

function mainPage() {
  hideFuture()
  getTodo()
  // formLogin.hide()
  btnLogout.show()
  homeAfter.show()
  $("#page-todo").show()
}

function hideFuture() {
  btnRegister.hide()
  btnLogin.hide()
  btnLogout.hide()
  home.hide()
  formLogin.hide()
  formRegister.hide()
  homeAfter.hide()
  $("#page-todo").hide()
  $('#add-form').hide()

}



