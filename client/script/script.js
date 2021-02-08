const baseUrl = "http://localhost:3000"

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    url: `${baseUrl}/users/googleSignIn`,
    method: "POST",
    data: {
      googleToken: id_token
    }
  })
  .done(response => {
    localStorage.setItem("access_token", response.access_token)
    auth()
  })
  .fail(err => {
    console.log(err,'<<<errr')
  })
  .always(_ =>{
    $("#form-signIn").trigger("reset")
    $("#form-signUp").trigger("reset")
  })
}

function auth() {
  if (localStorage.getItem("access_token")) {
    $("#nav-signOut").show()
    $("#nav-my-todo").show()
    $("#nav-create").show()
    $("#nav-home").show()
    getTodosUser()
    $("#signUp").hide()
    $("#signIn").hide()
  } else {
    $("#nav-signOut").hide()
    $("#nav-my-todo").hide()
    $("#nav-create").hide()
    $("#nav-home").hide()
    $("#todos").hide()
    $("#signUp").hide()
    $("#signIn").show()
  }
}

function signIn() {
  const email = $("#inputEmail").val()
  const password = $("#inputPassword").val()
  $.ajax({
    url: `${baseUrl}/users/signin`,
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done(response => {
      localStorage.setItem("access_token", response.token)
      auth()
    })
    .fail((xhr, txt) => {
      Swal.fire(xhr.responseJSON.error)
      // console.log(xhr, txt)
    })
    .always(_ => {
      $("#form-signIn").trigger("reset")
      $("#form-signUp").trigger("reset")
    })
}

function signUp() {
  const email = $("#signUpEmail").val()
  const password = $("#signUpPassword").val()
  $.ajax({
    url: `${baseUrl}/users/signup`,
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done(response => {
      Swal.fire('Your account is succesfully created!!!')
      auth()
    })
    .fail((xhr, txt) => {
      Swal.fire(xhr.responseJSON.error[0])
    })
    .always(_ => {
      $("#form-signIn").trigger("reset")
      $("#form-signUp").trigger("reset")
    })
}


function getTodosUser() {
  $.ajax({
    url: `${baseUrl}/todos/user`,
    method: "GET",
    headers: {
      token: localStorage.getItem("access_token")
    }
  })
    .done(response => {
      $('#todos').show()
      if (response.length === 0) {
        $('#todo-table').hide()
        $("#no-todo").show()
        $("#no-todo").text(`You don't have any todo`)
      } else {
        $('#todo-table').show()
        let html = ''
        let i = 1
        $.each(response, function (key, value) {
          $("#no-todo").hide()
          html += `<tr 
        data-id="${value.id}" 
        data-title="${value.title}" 
        data-due_date="${value.due_date}"
        data-description="${value.description}">
        <td id="todoId">${i++}</td>
        <td>${value.due_date} <br>
            <i style="color:red">${value.events}</i>
        </td>
        <td><b>${value.title}</b><br>
            <i>${value.description}</i>
        </td>
        <td>${value.status}</td>
        <td>
            <div class="container-fluid justify-content-start mb-3" >
                <a href="" id="complete-button" value=""><button class="btn btn-outline-success me-2 mb-3"
                        type="button"><i class="fa fa-check"></i></button></a>
                <a href="" id="uncomplete-button"><button class="btn btn-outline-danger me-2 mb-3"
                        type="button"><i class="fa fa-close"></i></button></a>
            </div>
        </td>
        <td>
            <div class="container-fluid justify-content-start mb-3">
                <a href="" id="edit-button"> <button class="btn btn-outline-secondary me-2 mb-3"
                        type="button">Edit</button></a>
                <a href="" id="delete-button"> <button class="btn btn-outline-secondary me-2 mb-3"
                        type="button">Delete</button></a>
            </div>
        </td>
    </tr>`
        })
        $('table tbody').html(html);
      }
    })
    .fail((xhr, txt) => {
      Swal.fire(xhr.responseJSON.error)
      // console.log(xhr, txt)
    })
}

function addTodo() {
  const title = $("#inputTitle").val()
  const due_date = $("#inputDate").val()
  const description = $("#inputDescription").val()
  $.ajax({
    url: `${baseUrl}/todos`,
    method: "POST",
    headers: {
      token: localStorage.getItem("access_token")
    },
    data: {
      title,
      due_date,
      description,
    }
  })
    .done(response => {
      
    })
    .fail((xhr, text) => {
      Swal.fire(xhr.responseJSON.error[0])
      // console.log(xhr, text)
    })
    .always(_ => {
      $("#form-add-todo").trigger("reset")
      getTodosUser()
    })
}

function deleteTodo(todoId) {
  $.ajax({
    url: `${baseUrl}/todos/${todoId}`,
    method: "DELETE",
    headers: {
      token: localStorage.getItem("access_token")
    }
  })
    .done(response => {
      Swal.fire('Your todo is successfully deleted!!!')
    })
    .fail((xhr, text) => {
      Swal.fire(xhr.responseJSON.error[0])
      // console.log(xhr, text)
    })
    .always(_ => {
      getTodosUser()
    })
}

function patchStatus(todoId, status) {
  $.ajax({
    url: `${baseUrl}/todos/${todoId}`,
    method: "PATCH",
    headers: {
      token: localStorage.getItem("access_token")
    },
    data: {
      status
    }
  })
    .done(response => {
      Swal.fire(`Your todo is ${status}`)
    })
    .fail((xhr, text) => {
      Swal.fire(xhr.responseJSON.error[0])
      // console.log(xhr, text)
    })
    .always(_ => {
      $("#form-add-todo").trigger("reset")
      auth()
    })
}

function editTodo(todoId) {
  const title = $("#inputTitle").val()
  const due_date = $("#inputDate").val()
  const description = $("#inputDescription").val()
  $.ajax({
    url: `${baseUrl}/todos/${todoId}`,
    method: "PUT",
    headers: {
      token: localStorage.getItem("access_token")
    },
    data: {
      title,
      due_date,
      description
    }
  })
    .done(response => {
      Swal.fire('Your todo is successfully updated!!')
      getTodosUser()
    })
    .fail((xhr, text) => {
      Swal.fire(xhr.responseJSON.error[0])
      // console.log(xhr, text)
    })
    .always(_ => {
      $("#form-add-todo").trigger("reset")
      $("#form-add-todo").show()
      $("#title-todo").text("My Todo List")
      $("#todo-table").show()
      $("#add-todo").text("Add Todo")
    })
}

$(document).ready(() => {
  auth()

  $("#form-signIn").on("submit", (e) => {
    e.preventDefault()
    signIn()    
  })

  $("#menu-sign-up").on("click", (e) => {
    e.preventDefault()
    $("#nav-signOut").hide()
    $("#nav-my-todo").hide()
    $("#nav-create").hide()
    $("#nav-home").hide()
    $("#todos").hide()
    $("#signIn").hide()
    $("#signUp").show()
  })

  $("#menu-sign-in").on("click", (e) => {
    e.preventDefault()
    $("#nav-signOut").hide()
    $("#nav-my-todo").hide()
    $("#nav-create").hide()
    $("#nav-home").hide()
    $("#todos").hide()
    $("#signUp").hide()
    $("#signIn").show()
  })

  $("#form-signUp").on("submit", (e) => {
    e.preventDefault()
    signUp()    
  })

  $("#form-add-todo").on("submit", (e) => {
    e.preventDefault()
    if ($("#title-todo").text() === "Edit My Todo") {
      let todoId = localStorage.getItem("todoId")
      localStorage.removeItem("todoId")
      editTodo(todoId)
    } else {
      addTodo()
    }
  })

  $(document).on("click", "#complete-button", function (e) {
    e.preventDefault()

    let todoId = $(this).parents('tr').attr('data-id');
    patchStatus(todoId, "completed")
  });

  $(document).on("click", "#uncomplete-button", function (e) {
    e.preventDefault()

    let todoId = $(this).parents('tr').attr('data-id');
    patchStatus(todoId, "uncompleted")
  });

  $(document).on("click", "#delete-button", function (e) {
    e.preventDefault()

    let todoId = $(this).parents('tr').attr('data-id');
    deleteTodo(todoId)
  });

  $(document).on("click", "#edit-button", function (e) {
    e.preventDefault()

    $("#form-add-todo").show()
    $("#title-todo").text("Edit My Todo")
    $("#todo-table").hide()
    $("#add-todo").text("Update Todo")

    localStorage.setItem("todoId", $(this).parents('tr').attr('data-id'))
    $("#inputTitle").val($(this).parents('tr').attr('data-title'))
    $("#inputDate").val($(this).parents('tr').attr('data-due_date'))
    $("#inputDescription").val($(this).parents('tr').attr('data-description'))

  });

  $("#cancel-todo").on("click", (e) => {
    e.preventDefault()
    if (localStorage.getItem("todoId")) {
      localStorage.removeItem("todoId")
    }
    $("#title-todo").text("My Todo List")
    $("#add-todo").text("Add Todo")
    $("#form-add-todo").trigger("reset")
    $("#todo-table").show()

  })

  $("#nav-signOut").on("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    auth()
  })

  $('#signInGoogle').on("click", (e) => {
    e.preventDefault()
    onSignIn(googleUser)
  })

})