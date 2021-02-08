let mainPort = "https://fancy-todo-week1.herokuapp.com/"

function authentic(){
  if(localStorage.getItem("token")){ //kalau login
    $("#login-form").hide()
    $("#regis-form").hide()
    $("#registerButton").show()
    $("#homeButton").show()
    $("#todoList").show()
    $("#add-form").hide()
    $("#update-form").hide()
    $("#google-button").hide()
    findAllTodo()
  }
  else{ //kalau logout
    $("#login-form").show()
    $("#regis-form").hide()
    $("#registerButton").show()
    $("#homeButton").hide()
    $("#todoList").hide()
    $("#add-form").hide()
    $("#update-form").hide()
    $("#google-button").show()
  }
}

function register(){
  const email = $("#newEmail").val()
  const password = $("#newPassword").val()

  $("#login-form").hide()

  $.ajax({
    url: mainPort + "users/register",
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done((res) => {
    authentic()
  })
  .fail((err, text) => {
    let errorMsg = err.responseJSON.error
    $(".errorClass").remove()
    $("#regis-form").append(`<p class="errorClass"><b style="color: red;">${errorMsg}</b></p>`);
  })
}
  
function login(){
  const email = $("#email").val()
  const password = $("#password").val()

  $.ajax({
    url: mainPort + "users/login",
    method: "POST",
    data: {
        email,
        password,
    }
  })
  .done((res) => {
    localStorage.setItem("token", res.token)
    authentic()
  })
  .fail((err, text) => {
    let errorMsg = err.responseJSON.Error
    $(".errorClass").remove()
    $("#login-form").append(`<p class="errorClass"><b style="color: red;">${errorMsg}</b></p>`);
  })
  .always(()=> {
    $("#login-form").trigger("reset")
  })
}

function logout(){
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();

  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  
  authentic()
}

function addTodo(){
  const title = $("#title").val()
  const description = $("#description").val()
  const status = "not done"
  const due_date = $("#due_date").val()

  $.ajax({
    url: mainPort + "todos",
    method: "POST",
    data: {
      title, 
      description, 
      status, 
      due_date
    },
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done((res) => {
    $("#add-form").hide()
    $("#todoList").show()
    findAllTodo()
  })
  .fail((err, text) => {
    let errorMsg = err.responseJSON.error
    $(".errorClass").remove()
    $("#add-form").append(`<p class="errorClass"><b style="color: red;">${errorMsg}</b></p>`);
  })
}

function findAllTodo(){
  $("#update-form").hide()

  $.ajax({
    url: mainPort + "todos",
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done((todo) => {
    $("#tableAllTodo").empty()
    $("#cuaca").empty()
    
    $("#tableAllTodo").append(`
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th>Due Date</th>
        <th colspan="3">Action</th>
      </tr>
    `)
    for(let i = 0; i < todo.dataTodo.length; i++){
      $("#tableAllTodo").append(`
      <tr id="rowTodo${todo.dataTodo[i].id}">
        <td>${todo.dataTodo[i].title}</td>
        <td>${todo.dataTodo[i].description}</td>
        <td>${todo.dataTodo[i].status}</td>
        <td>${todo.dataTodo[i].due_date}</td>
        <td><button type="button" onclick="updateStatus(${todo.dataTodo[i].id})">Change Status</button></td>
        <td><button type="button" onclick="updateForm(${todo.dataTodo[i].id})">Update Todo</button></td>
        <td><button type="button" onclick="deleteTodo(${todo.dataTodo[i].id})">Delete</button></td>
      </tr>
      `)
    }
    $("#cuaca").append(`
    <h4>
    <label for="">Weather: ${todo.dataCuaca[0].main} (${todo.dataCuaca[0].description})</label>
    </h4>
    `)
  })
  .fail((err, text) => {
    console.log(err, text);
  })
}

function deleteTodo(id){
  $.ajax({
    url: mainPort + "todos/" + id,
    method: "DELETE",
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done(() => {
    $(`#rowTodo${id}`).remove()
  })
  .fail((err, text) => {
    console.log(err, text);
  })
}

function findOne(id){
  $.ajax({
    url: mainPort + "todos/" + id,
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done((todo) => {
    $("#tableAllTodo").empty()
    $(".errorClass").remove()
    $("#tableAllTodo").append(`
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th>Due Date</th>
        <th colspan="3">Action</th>
      </tr>
    `)
    $("#tableAllTodo").append(`
    <tr id="rowTodo${todo.id}">
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td>${todo.status}</td>
      <td>${todo.due_date}</td>
      <td><button type="button" onclick="updateStatus(${todo.id})">Change Status</button></td>
      <td><button type="button" onclick="updateForm(${todo.id})">Update Todo</button></td>
      <td><button type="button" onclick="deleteTodo(${todo.id})">Delete</button></td>
    </tr>
    `)
  })
  .fail((err, text) => {
    let errorMsg = err.responseJSON.Error
    $(".errorClass").remove()
    $("#form-find-one").append(`<p class="errorClass"><b style="color: red;">${errorMsg}</b></p>`);
  })
  .always(()=> {
    $("#form-find-one").trigger("reset")
  })
}

function updateStatus(id){
  $.ajax({
    url: mainPort + "todos/" + id,
    method: "PATCH",
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done(() => {
    findAllTodo()
  })
  .fail((err, text) => {
    console.log(err, text);
  })
}

function updateForm(id){
  $("#update-form").show()
  $("#todoList").hide()

  let idUpdate
  
  $.ajax({
    url: mainPort +"todos/" + id,
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done(data => {
    idUpdate = data.id
    $("#title-update").val(`${data.title}`)
    $("#description-update").val(`${data.description}`)
    $("#status-update").val(`${data.status}`)
    $("#due_date-update").val(`${data.due_date}`)
  })
  .fail((err, text) => {
    let errorMsg = err.responseJSON.error
    $(".errorClass").remove()
    $("#update-form").append(`<p class="errorClass"><b style="color: red;">${errorMsg}</b></p>`);
  })

  $("#update-form").on("submit", (e) => {
    e.preventDefault()
    $.ajax({
      url: mainPort + "todos/" + idUpdate,
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      },
      data: {
        title: $("#title-update").val(), 
        description: $("#description-update").val(), 
        status: $("#status-update").val(), 
        due_date: $("#due_date-update").val()
      }
    })
    .done(() => {
      authentic()
    })
    .fail((err, text) => {
      let errorMsg = err.responseJSON.error
    $(".errorClass").remove()
    $("#update-form").append(`<p class="errorClass"><b style="color: red;">${errorMsg}</b></p>`);
    })
  })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  console.log("google login");
  $.ajax({
    url: mainPort + 'users/loginGoogle',
    method: 'POST',
    data: {
      googleToken: id_token
    }
  })
  .done(data => {
    localStorage.setItem("token", data.token)
    authentic()
  })
  .fail(err => {
    console.log(err)
  })
}

//========================================================
$(document).ready(() => {
  authentic()

  $("#login-form").on("submit", (e) => {
    e.preventDefault()
    login()
  })

  $("#registerButton").on("click", (e) => {
    e.preventDefault()
    $("#login-form").hide()
    $("#registerButton").hide()
    $("#regis-form").show()
  })

  $("#regis-form").on("submit", (e) => {
    e.preventDefault()
    register()
  })

  $("#cancelRegis").on("click", (e) => {
    e.preventDefault()
    authentic()
  })

  $("#findAll").on("click", (e) => {
    e.preventDefault()
    $(".errorClass").remove()
    $("#todoList").show()
    $("#add-form").hide()
    $("#update-form").hide()
    findAllTodo()
  })

  $("#logout").on("click", (e) =>{
    e.preventDefault()
    logout()
  })

  $(".backToHome").on("click", (e) => {
    e.preventDefault()
    authentic()
  })

  $("#add").on("click", (e) => {
    e.preventDefault()
    $(".errorClass").remove()
    $("#add-form").show()
    $("#todoList").hide()
  })
  
  $("#add-form").on("submit", (e) => {
    e.preventDefault()
    addTodo()
  })

  $("#form-find-one").on("submit", (e) => {
    e.preventDefault()
    const id = $("#findTodoId").val()
    $("#todoList").show()
    $("#add-form").hide()
    $("#update-form").hide()
    if(id){
      findOne(id)
    }
  })

})