const auth = () => {
  if (!localStorage.getItem("access_token")) {
    $("#sign-out-navbar").hide()
    $("#sign-in-navbar").show()
    $("#sign-up-navbar").show()
    $("#sign-up-page").hide()
    $("#sign-in-page").show()
    $("#addTodo-page").hide()
    $("#todos-table").hide()

  } else {
    $("#sign-out-navbar").show()
    $("#sign-in-navbar").hide()
    $("#sign-up-navbar").hide()
    $("#sign-up-page").hide()
    $("#sign-in-page").hide()
    $("#addTodo-page").hide()
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
    console.log(xhr, text);
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
    console.log(xhr, text);
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
    res.forEach(e => {
      let btnDone
      if (!e.status) {
        btnDone = `<button type="button" class="btn btn-success" onClick="${updateStatusTodo(e.id,e.status)}">Done</button>`
      } else {
        btnDone = `<button type="button" class="btn btn-success" onClick="${updateStatusTodo(e.id,e.status)}">Undone</button>`
      }
      $('#tBody').append(`<tr>
      <td>${e.title}</td>
      <td>${e.description}</td>
      <td>${e.status}</td>
      <td>${e.due_date}</td>
      <td>${e.User}</td>
      <td>
        <button type="button" class="btn btn-warning" onClick="${updateTodo(e.id)}">Edit</button> 
        ${btnDone}
        <button type="button" class="btn btn-danger" onClick="${destroy(e.id)}">Delete</button>
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
        btnDone = `<button type="button" class="btn btn-success" onClick="${updateStatusTodo(res.id,res.status)}">Done</button>`
      } else {
        btnDone = `<button type="button" class="btn btn-success" onClick="${updateStatusTodo(res.id,res.status)}">Undone</button>`
      }
      $('#tBody').append(`<tr>
      <td>${res.title}</td>
      <td>${res.description}</td>
      <td>${res.status}</td>
      <td>${res.due_date}</td>
      <td>${res.User}</td>
      <td>
        <button type="button" class="btn btn-warning" onClick="${updateTodo(res.id)}">Edit</button> 
        ${btnDone}
        <button type="button" class="btn btn-danger" onClick="${destroy(res.id)}">Delete</button>
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
    auth()
  })
  .fail((xhr,txt) => {
    console.log(xhr,txt);
  })
}

const updateTodo = (id) => {
  const title = $('#titleAdd').val()
  const description = $('#titleAdd').val()
  const due_date = $('#titleAdd').val()
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
    auth()
  })
  .fail((xhr,txt) => {
    console.log(xhr,txt);
  })
}

const updateStatusTodo = (id,status) => {
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