const baseUrl = "http://localhost:3000"
function auth() {
  if (localStorage.getItem("access_token")) {
    $("#nav-signOut").show()
    $("#nav-my-todo").show()
    $("#nav-create").show()
    $("#nav-home").show()
    $("#todos").show()
    getTodosUser()
    $("#signUpIn").hide()
  } else {
    $("#nav-signOut").hide()
    $("#nav-my-todo").hide()
    $("#nav-create").hide()
    $("#nav-home").hide()
    $("#todos").hide()
    $("#signUpIn").show()
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
      alert(xhr.responseJSON.error)
      console.log(xhr, txt)
    })
    .always(_ => {
      $("#form-signUpIn").trigger("reset")
    })
}

function signUp() {
  const email = $("#inputEmail").val()
  const password = $("#inputPassword").val()
  $.ajax({
    url: `${baseUrl}/users/signup`,
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done(response => {
      alert(xhr.responseJSON.error)
      $("#btn-sign").text("Sign In")
      auth()
    })
    .fail((xhr, txt) => {
      alert(xhr.responseJSON.error[0])
      console.log(xhr, txt)
    })
    .always(_ => {
      $("#form-signUpIn").trigger("reset")
    })
}


function getAllTodos() {
  $.ajax({
    url: `${baseUrl}/todos`,
    method: "GET",
    headers: {
      token: localStorage.getItem("access_token")
    }
  })
    .done(response => {
      console.log(response)
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt)
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
      let html = ''
      $.each(response, function(key, value){
        html += `<tr data-id="${value.id}">
        <td id="todoId">${value.id}</td>
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
    })
    .fail((xhr, txt) => {
      console.log(xhr, txt)
    })
}

function addTodo(){
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
    getTodosUser()
  })
  .fail((xhr, text) => {
    alert(xhr.responseJSON.error)
    console.log(xhr, text)
  })
  .always(_ => {
    $("#form-add-todo").trigger("reset")
  })
}

function deleteTodo(todoId){
  $.ajax({
    url: `${baseUrl}/todos/${todoId}`,
    method: "DELETE",
    headers: {
      token: localStorage.getItem("access_token")
    }
  })
  .done(response => {
    auth()
  })
  .fail((xhr, text) => {
    alert(xhr.responseJSON.error[0])
    console.log(xhr, text)
  })
}

function patchStatus(todoId, status){
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
    auth()
  })
  .fail((xhr, text) => {
    alert(xhr.responseJSON.error[0])
    console.log(xhr, text)
  })
  .always(_ => {
    $("#form-add-todo").trigger("reset")
  })
}

function editTodo(todoId){
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
    console.log('berhasil')
  })
  .fail((xhr, text) => {
    alert(xhr.responseJSON.error)
    console.log(xhr, text)
  })
  .always(_ => {
    $("#form-add-todo").trigger("reset")
  })
}

$(document).ready(() => {
  auth()
  $("#form-signUpIn").on("submit", (e) => {
    e.preventDefault()
    if (localStorage.getItem("access_token")) {
      
    } else {
      if ($("#btn-sign").html() === 'Sign In'){
        signIn()
      } else {
        signUp()
      }
    }
  })
  
  $("#menu-sign-up").on("click", (e) => {
    e.preventDefault()
    $("#nav-signOut").hide()
    $("#nav-my-todo").hide()
    $("#nav-home").hide()
    $("#todos").hide()
    $("#signUpIn").show()
    $("#btn-sign").text("Sign Up")
    $("#menu-sign").html('<p class="text-center" >Have account ? <a href="" id="menu-sign-in">Sign In</a></p>')
  })

  $("menu-sign-in").on("click", (e) => {
    e.preventDefault()
    $("#nav-signOut").hide()
    $("#nav-my-todo").hide()
    $("#nav-home").hide()
    $("#todos").hide()
    $("#signUpIn").show()
  })

  $("#form-add-todo").on("submit", (e) => {
    e.preventDefault()
    addTodo()
  })
  
  $(document).on("click","#complete-button",function(){
      let todoId = $(this).parents('tr').attr('data-id');
      patchStatus(todoId, "completed")
  });

  $(document).on("click","#uncomplete-button",function(){
    let todoId = $(this).parents('tr').attr('data-id');
    patchStatus(todoId, "uncompleted")
  });
  
  $(document).on("click","#delete-button",function(){
    let todoId = $(this).parents('tr').attr('data-id');
    deleteTodo(todoId)
  });

  $(document).on("click","#edit-button",function(){
    let todoId = $(this).parents('tr').attr('data-id');
    $("#form-signUpIn").hide()
    $("#todo-tabel").hide()
    $("#todos").hide()
    $("##form-add-todo").show()
    editTodo(todoId)
  });


})