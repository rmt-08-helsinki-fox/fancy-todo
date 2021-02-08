const baseURL = 'https://fancy-todo-kemal-h8.herokuapp.com'

function checkToken() {
  if (!localStorage.access_token) {
    $("#logoutBtn").hide()
    $("#addTodoBtn").hide()
    $("#registerBtn").show()
    $("#todoListContainer").hide()
    $("#loginForm").show()
    $('#tableTodo').hide()
  } else {
    $("#logoutBtn").show()
    $("#addTodoBtn").show()
    $("#registerBtn").hide()
    $("#todoListContainer").show()
    $("#loginForm").hide()
    $('#registerForm').hide()
    $('#tableTodo').show()
    getTodo()
  }
  $('#registerForm').hide()
  $('#editTodoContainer').hide()
  $("#createTodoContainer").hide()
  
}
function registerFormShow() {
  $("#logoutBtn").hide()
  $("#addTodoBtn").hide()
  $("#registerBtn").hide()
  $("#createTodoContainer").hide()
  $("#todoListContainer").hide()
  $("#loginForm").hide()
  $("#registerForm").show()
}

// User register

function register() {
  const email = $('#registerEmail').val();
  const password = $('#registerPassword').val();

  $.ajax({
    url: baseURL + "/register",
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done((response) => {
      $('#loginEmail').val(email)
      $('#loginPassword').val(password)
      login()
    })
    .fail((xhr, text) => {
      let messages = xhr.responseJSON.message
      swal({
        title: "an Error Has Occured!!",
        text: messages.join(', '),
        icon: "error",
      });
    })
    .always(_ => {
      $('#registerEmail').val("")
      $('#registerPassword').val("")
    })
}

// User Login - Logout - OAuth

function login() {  
  const email = $('#loginEmail').val();
  const password = $('#loginPassword').val();

  $.ajax({
    url: baseURL + "/login",
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done((response) => {
      localStorage.setItem("access_token",response.access_token)
      checkToken()
    })
    .fail((xhr, text) =>{
      let messages = xhr.responseJSON.message
      swal({
        title: "an Error Has Occured!!",
        text: messages.join(', '),
        icon: "error",
      });
    })
    .always(_ => {
      $("#loginEmail").val("")
      $("#loginPassword").val("")
    })
}

function logout() {
  localStorage.removeItem("access_token")
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  checkToken()
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: baseURL + '/googleLogin',
    method: "POST",
    data: {
      googleToken: id_token
    }
  })
    .done((response) => {
      localStorage.setItem("access_token",response.access_token)
      checkToken()
    })
    .fail((xhr, text) =>{
      console.log({xhr, text});
    })
}

// Add Todos

function addFormShow() {
  checkToken()
  $("#addTodoBtn").hide()
  $("#tableTodo").hide()
  $("#createTodoContainer").show()
  
}

function createTodo() {
  const access_token = localStorage.getItem("access_token")
  
  const title = $("#todoTitle").val()
  const description = $("#todoDescription").val()
  const due_date = $("#todoDueDate").val()
  
  $.ajax({
    url: baseURL + "/todos",
    method: "POST",
    headers: {
      access_token
    },
    data: {
      title,
      description,
      due_date
    }
  })
    .done((response) => {
      console.log(response);
      swal("Tdodo Has been Created!", {
        icon: "success",
      });
      checkToken()
    })
    .fail((xhr, text) => {
      let messages = xhr.responseJSON.message
      swal({
        title: "an Error Has Occured!!",
        text: messages.join(', '),
        icon: "error",
      });
    })
    .always(_ => {
      $("#todoTitle").val("")
      $("#todoDescription").val("")
      $("#todoDueDate").val("")
    })
}

// Get Todos

function getTodo() {
  $('#TodoTableBody').empty()
  let count = 1

  const access_token = localStorage.getItem("access_token")

  $.ajax({
    method: 'GET',
    url: baseURL + "/todos",
    headers: {
      access_token
    }
  })
    .done(todos => {
      todos.forEach(todo => {
        let doneCheck = '';

        if (todo.status) doneCheck = 'checked'
        
        $('#TodoTableBody').append(`
          <tr id="todo-${todo.id}" class="${todo.status ? "table-success" : "" }">
            <td class="align-middle">${count}</td>
            <td class="align-middle">${todo.title}</td>
            <td class="align-middle">${todo.description}</td>
            <td>                
                <input type="checkbox" id="done-${todo.id}" name="status-${todo.id}" value="done" ${doneCheck} onclick='done(${todo.id})'>
                <label for="done-${todo.id}">Done</label>
            </td>
            <td style="text-align: center;" class="align-middle">${new Date(todo.due_date).toDateString()}</td>
            <td style="text-align: center;" class="align-middle">
                <button class="btn btn-success" onclick="openEditFormTodo(${todo.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteTodo(${todo.id})">Delete</button>
            </td>
          </tr>
        `)
        count++
      })
    })
    .fail(xhr => {
        console.log(xhr.responseJSON.message);
    })
}

// Patch Todo

function done(todoId) {
  let status = $(`#done-${todoId}`).is(":checked")
  patchTodo(todoId, status)
}

function patchTodo(todoId, status) {
  const access_token = localStorage.getItem("access_token")

  $.ajax({
    method: 'PATCH',
    url: `${baseURL}/todos/${todoId}`,
    headers: {
        access_token 
      },
    data : {
      status
    }
  })
  .done((response) => {
    getQuote()
  })
  .fail((xhr, text) => {
    console.log(xhr,text);
  })
}

// delete Function

function deleteTodo(todoId) {
  const access_token = localStorage.getItem("access_token")

  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this item!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
    if (willDelete) {
      $.ajax({
        method: 'DELETE',
        url: `${baseURL}/todos/${todoId}`,
        headers: {
            access_token 
          }
      })
      .done((response) => {
        swal(`${response.message}!`, {
          icon: "success", 
        })
        $(`#todo-${todoId}`).remove()
      })
      .fail((xhr, text) => {
        console.log(xhr,text);
      })
    } else {
      swal("Canceled!");
    }
  });
  
}

// edit function

function openEditFormTodo(todoId) {
  getTodoById(todoId)
  $("#addTodoBtn").hide()
  $("#tableTodo").hide()
  $("#createTodoContainer").hide()
  $("#editTodoContainer").show()
}

function getTodoById(todoId) {
  const access_token = localStorage.getItem("access_token")
  $.ajax({
    method: 'GET',
    url: `${baseURL}/todos/${todoId}`,
    headers: {
        access_token 
      }
  })
    .done(todo => {
        $('#editTodoContainer #todoId').val(todo.id);
        $('#editTodoContainer #todoTitle').val(todo.title);
        $('#editTodoContainer #todoDescription').val(todo.description);
        $('#editTodoContainer #todoDueDate').val(new Date(todo.due_date).toISOString().substr(0,10));
        $('#editTodoContainer #todoStatus').prop("checked", todo.status ? true : false)
    })
    .fail((xhr, text) => {
      let messages = xhr.responseJSON.message
      swal({
        title: "an Error Has Occured!!",
        text: messages.join(', '),
        icon: "error",
      });
    })
}

function editTodo(todoId) {
  let title = $('#editTodoContainer #todoTitle').val()
  let description = $('#editTodoContainer #todoDescription').val()
  let due_date = $('#editTodoContainer #todoDueDate').val()
  let id = $('#editTodoContainer #todoId').val()
  let status = $('#editTodoContainer #todoStatus').is(":checked")

  const access_token = localStorage.getItem("access_token")
    $.ajax({
      url: `${baseURL}/todos/${id}`,
      method: "PUT",
      headers: {
        access_token
      },
      data: {
        id,
        title,
        description,
        due_date,
        status
      }
    })
      .done((response) => {
        console.log(response);
        swal("Edit Success!", {
          icon: "success",
        });
        checkToken()
      })
      .fail((xhr, text) => {
        let messages = xhr.responseJSON.message
        swal({
          title: "an Error Has Occured!!",
          text: messages.join(', '),
          icon: "error",
        });
      })
      .always(_ => {
        $('#editTodoContainer #todoId').val("");
        $('#editTodoContainer #todoTitle').val("");
        $('#editTodoContainer #todoDescription').val("");
        $('#editTodoContainer #todoDueDate').val(new Date().toISOString().substr(0,10));
        $('#editTodoContainer #todoStatus').prop("checked", false)
      })
}

// Quote Function

function getQuote() {
  const access_token = localStorage.getItem("access_token")
  $.ajax({
    method: 'GET',
    url: `${baseURL}/todos/quote/`,
    headers: {
        access_token 
      }
  })
    .done(quote => {
      swal({
        title: quote.quote,
        text: `- ${quote.author}`,
        icon: "success",
      })
        .then((value) => {
          checkToken()
        })  
    })
    .fail((xhr, text) => {
      let messages = xhr.responseJSON.message
      swal({
        title: "an Error Has Occured!!",
        text: messages.join(', '),
        icon: "error",
      });
    })
}

$(document).ready(function(){
  checkToken()

  // --- Button Function
  
  $("a#homeBtn").on("click", (e) => {
    e.preventDefault()
    checkToken()
  })
  $("#logoutBtn").on("click", (e) => {
    e.preventDefault()
    logout()
  })
  $("#registerBtn").on("click", (e) => {
    e.preventDefault()
    registerFormShow()
  })
  $("#loginBtn").on("click", (e) => {
    e.preventDefault()
    checkToken()
  })
  $("#addTodoBtn").on("click", (e) => {
    e.preventDefault()
    addFormShow()
  })

  //--- Form Function

  $("#loginForm").on("submit", (e) => {
    e.preventDefault()
    login()
  })
  $("#registerForm").on("submit", (e) => {
    e.preventDefault()
    register()
  })
  $("#createTodoContainer").on("submit", (e) => {
    e.preventDefault()
    swal({
      title: "Create this todo ?",
      icon: "info",
      buttons: true,
    })
    .then((confirm) => {
      if (confirm) {
        createTodo()
      } else {
        swal("Canceled!");
      }
    });
  })
  $("#editTodoContainer").on("submit", (e) => {
    e.preventDefault()
    swal({
      title: "Create this todo ?",
      icon: "info",
      buttons: true,
    })
    .then((confirm) => {
      if (confirm) {
        editTodo()
      } else {
        swal("Canceled!");
      }
    });
  })

});