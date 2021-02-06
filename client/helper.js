const auth = () => {
  if (!localStorage.getItem("access_token")) {
    $("#sign-out-navbar").hide()
    $("#sign-in-navbar").show()
    $("#sign-up-navbar").show()
    $("#sign-up-page").hide()
    $("#sign-in-page").show()
    $("#addTodo-page").hide()
    $("#editTodo-page").hide()
    $("#todos-table").hide()
    $("#addTodoBtn").hide()

  } else {
    $("#sign-out-navbar").show()
    $("#addTodoBtn").show()
    $("#sign-in-navbar").hide()
    $("#sign-up-navbar").hide()
    $("#sign-up-page").hide()
    $("#sign-in-page").hide()
    $("#addTodo-page").hide()
    $("#editTodo-page").hide()
    $("#todos-table").show()
    getAllTodo()
  }
}

const signIn = () => {
  const email = $('#signInEmail').val()
  const password = $('#signInPass').val()

  $.ajax({
    url: baseUrl + 'signIn',
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(res => {
    localStorage.setItem('access_token',res.access_token)
    auth()
  })
  .fail((xhr,text) => {
    $("#errorRegister").remove();
    $("#sign-in-page").append(`<div id="errorRegister"class="alert alert-danger"></div>`);
    xhr.responseJSON.forEach(err => {
      $("#errorRegister").append(`<li>${err}</li>`);
    })
    // console.log(xhr, text);
  })
  .always(_ => {
    $('#signInEmail').val('')
    $('#signInPass').val('')
  })
}

const signUp = () => {
  const email = $('#signUpEmail').val()
  const password = $('#signUpPass').val()

  $.ajax({
    url: baseUrl + 'signUp',
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(res => {
    console.log(res.msg);
    auth()
  })
  .fail((xhr, text) => {
    $("#errorRegister").remove();
    $("#sign-up-page").append(`<div id="errorRegister"class="alert alert-danger"></div>`);
    xhr.responseJSON.forEach(err => {
      $("#errorRegister").append(`<li>${err}</li>`);
    })
    console.log(xhr);
  })
  .always(_ => {
    $('#signUpEmail').val('')
    $('#signUpPass').val('')
  })
}

const signOut = () => {
  localStorage.clear()
  auth()
}

const getAllTodo = () => {
  $.ajax({
    url: baseUrl + 'todos',
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    $('#tBody').empty()
    // console.log(res,'>>>>>>>>>>>>>>>');
    res.forEach(e => {
      let btnDone
      if (!e.status) {
        console.log('masuk false >>>>');
        btnDone = `<button type="button" class="btn btn-success" onClick="updateStatusTodo(${e.id},${e.status})">Done</button>`
      } else {
        btnDone = `<button type="button" class="btn btn-warning" onClick="updateStatusTodo(${e.id},${e.status})">Undone</button>`
      }
      $('#tBody').append(`<tr>
      <td>${e.title}</td>
      <td>${e.description}</td>
      <td>${e.status}</td>
      <td>${e.due_date}</td>
      <td>
        ${btnDone}
        <button type="button" class="btn btn-warning" onClick="updateBtn(${e.id})">Edit</button> 
        <button type="button" class="btn btn-danger" onClick="destroy(${e.id})">Delete</button>
      </td>
    </tr>`)
    });
  })
  .fail((xhr,txt) => {
    console.log(xhr,txt);
  })
}

const getTodoById = (id) => {
  $.ajax({
    url: baseUrl + `todos/${id}`,
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    $("#sign-out-navbar").show()
    $("#sign-in-navbar").hide()
    $("#sign-up-navbar").hide()
    $("#sign-up-page").hide()
    $("#sign-in-page").hide()
    $("#addTodo-page").hide()
    $("#todos-table").show()
    $('#tBody').empty()
    let btnDone
      if (!res.status) {
        btnDone = `<button type="button" class="btn btn-success" onClick="updateStatusTodo(${res.id,res.status})">Done</button>`
      } else {
        btnDone = `<button type="button" class="btn btn-success" onClick="$updateStatusTodo(${res.id,res.status})">Undone</button>`
      }
      $('#tBody').append(`<tr>
      <td>${res.title}</td>
      <td>${res.description}</td>
      <td>${res.status}</td>
      <td>${res.due_date}</td>
      <td>${res.User}</td>
      <td>
        ${btnDone}
        <button type="button" class="btn btn-warning" onClick="updateTodo(${res.id})">Edit</button> 
        <button type="button" class="btn btn-danger" onClick="destroy(${res.id})">Delete</button>
      </td>
    </tr>`)
  })
}

const createTodo = () => {
  const title = $('#titleAdd').val()
  const description = $('#descriptionAdd').val()
  const due_date = $('#due_dateAdd').val()
  const status = false

  $.ajax({
    url: baseUrl + 'todos',
    method: 'POST',
    data:{
      title,
      description,
      due_date,
      status
    },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    $('#addTodoForm').trigger('reset')
    auth()
  })
  .fail((xhr,txt) => {
    $("#errorRegister").remove();
    $("#addTodo-page").append(`<div id="errorRegister"class="alert alert-danger"></div>`);
    xhr.responseJSON.forEach(err => {
      $("#errorRegister").append(`<li>${err}</li>`);
    })
    // console.log(xhr,txt);
  })
}

let updateTodoId
const updateBtn = (id) => {
  $("#sign-out-navbar").show()
  $("#sign-in-navbar").hide()
  $("#sign-up-navbar").hide()
  $("#sign-up-page").hide()
  $("#sign-in-page").hide()
  $("#addTodo-page").hide()
  $("#editTodo-page").show()
  $("#todos-table").hide()
  updateTodoId = id
}

const updateTodo = (id) => {
  const title = $('#titleEdit').val()
  const description = $('#descriptionEdit').val()
  const due_date = $('#due_dateEdit').val()
  const status = false

  $.ajax({
    url: baseUrl + `todos/${id}`,
    method: 'PUT',
    data: {
      title,
      description,
      due_date,
      status
    },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    $('#editTodoForm').trigger('reset')
    auth()
  })
  .fail((xhr,txt) => {
    $("#errorRegister").remove();
    $("#editTodo-page").append(`<div id="errorRegister"class="alert alert-danger"></div>`);
    xhr.responseJSON.forEach(err => {
      $("#errorRegister").append(`<li>${err}</li>`);
    })
    console.log(xhr,txt);
  })
}

const updateStatusTodo = (id,status) => {
  console.log(id, status, '>>>>>>>>>>>>>>>>>');
  status ? status = false : status = true
  $.ajax({
    url: baseUrl + `todos/${id}`,
    method: 'PATCH',
    data: {
      status
    },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    auth()
  })
  .fail((xhr,txt) => {
    console.log(xhr,txt);
  })
}

const destroy = id => {
  $.ajax({
    url: baseUrl + `todos/${id}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(_ => {
    auth()
  })
  .fail((xhr, txt) => {
    console.log(xhr,txt);
  })
}

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  // console.log(id_token);
  $.ajax({
    url: baseUrl + 'googleLogin',
    method: 'POST',
    data: {
      googleToken: id_token
    }
  })
  .done(res => {
    localStorage.setItem('access_token', res.access_token)
    auth()
  })
  .fail(xhr => {
    console.log(xhr);
  })
}