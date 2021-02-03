let mainPort = "http://localhost:3000/"

function authentic(){
  if(localStorage.getItem("token")){ //kalau login
    $("#login-form").hide()
    $("#regis-form").hide()
    $("#registerButton").show()
    $("#homeButton").show()
    $("#todoList").show()
    $("#add-form").hide()
    findAllTodo()
  }
  else{ //kalau logout
    $("#login-form").show()
    $("#regis-form").hide()
    $("#registerButton").show()
    $("#homeButton").hide()
    $("#todoList").hide()
    $("#add-form").hide()
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
    console.log(err, text);
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
    console.log(err, text);
  })
  .always(()=> {
    $("#login-form").trigger("reset")
  })
}

function logout(){
  localStorage.clear()
  authentic()
}

function addTodo(){
  const title = $("#title").val()
  const description = $("#description").val()
  const status = $("#status").val()
  const due_date = $("#due_date").val()

  console.log({
    title, 
    description, 
    status, 
    due_date
  });

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
    console.log(err, text);
  })
}

function findAllTodo(){
  $.ajax({
    url: mainPort + "todos",
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .done((todo) => {
    $("#tableAllTodo").empty()
    for(let i = 0; i < todo.dataTodo.length; i++){
      $("#tableAllTodo").append(`
      <tr id="rowTodo${todo.dataTodo[i].id}">
        <td>${todo.dataTodo[i].title}</td>
        <td>${todo.dataTodo[i].description}</td>
        <td>${todo.dataTodo[i].status}</td>
        <td>${todo.dataTodo[i].due_date}</td>
        <td><button type="button" onclick="updateStatus(${todo.dataTodo[i].id})">Change Status</button></td>
        <td><button type="button" onclick="deleteTodo(${todo.dataTodo[i].id})">Delete</button></td>
      </tr>
      `)
    }
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
    $("#tableAllTodo").append(`
    <tr id="rowTodo${todo.id}">
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td>${todo.status}</td>
      <td>${todo.due_date}</td>
      <td><button type="button" onclick="updateStatus(${todo.id})">Change Status</button></td>
      <td><button type="button" onclick="deleteTodo(${todo.id})">Delete</button></td>
    </tr>
    `)
  })
  .fail((err, text) => {
    console.log(err, text);
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
    $("#todoList").show()
    $("#add-form").hide()
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
    findOne(id)
  })
})