
const baseURL = 'http://localhost:3000'

$(document).ready(function() {
  //disini taro onclick onclick dan call function, kalo function taro diluar document.ready
  checkAuth()

  $('#login-form').submit(function(event){
    login(event)
  })

  $('#logout-btn').click(function(){
    logout()
  })

  $("#register-btn").click(function(){
    showRegister()
  })

  $("#register-form").submit(function(event){
    register(event)
  })

  $("#add-todo").click(function(){
    showAddForm()
  })

  $("#home").click(function(){
    checkAuth()
  })

  $("#back").click(function(){
    checkAuth()
  })

  $("#add-todo-form").submit(function(event){
    addTodo(event)
  })

  $("#show-weather").click(function(){
    showWeather()
  })

  // $("#")

})

function checkAuth(){
  if(localStorage.access_token){
    $('#navbar').show()
    $('#login-form').hide()
    $('#todo-list').show()
    $('#update-form').hide()
    $("#register-form").hide()
    $("#add-todo-form").hide()
    $("#update-status-form").hide()
    $("#weather").hide()
    appendWeather() 
    homeTodoList()
  } else{
    $('#navbar').hide()
    $('#login-form').show()
    $('#todo-list').hide()
    $('#update-form').hide()
    $("#register-form").hide()
    $("#add-todo-form").hide()
    $("#update-status-form").hide()
    $("#weather").hide()
  }
}

function login(event){
  event.preventDefault()
  let email = $('#email').val()
  let password = $('#password').val()
  $.ajax({
    method: 'POST',
    url: `${baseURL}/login`,
    data:{
      email,
      password
    }
  })
  .done(response => {
    let access_token = response
    localStorage.setItem('access_token', access_token)
    checkAuth()
  })
  .fail(err => {
    console.log(err.responseJSON,  '<<< ini dalem login')
    alert(err.responseJSON)
  })
  .always(() => {
    $("#email").val('')
    $("#password").val('')
  })
}

function logout(){
  localStorage.removeItem('access_token')
  checkAuth()
  let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function showRegister(){
  $('#navbar').hide()
  $('#login-form').hide()
  $('#todo-list').hide()
  $('#update-form').hide()
  $("#register-form").show()
  $("#add-todo-form").hide()
  $("#update-status-form").hide()
  $("#weather").hide()
}

function showAddForm(){
  $('#navbar').show()
  $('#login-form').hide()
  $('#todo-list').hide()
  $('#update-form').hide()
  $("#register-form").hide()
  $("#add-todo-form").show()
  $("#update-status-form").hide()
  $("#weather").hide()
}

function register(event){
  event.preventDefault()
  let email = $('#email-register').val()
  let password = $('#password-register').val()
  $.ajax({
    method: 'POST',
    url: `${baseURL}/register`,
    data: {
      email,
      password
    }
  })
  .done(response => {
    console.log(response)
    checkAuth()
    alert('User Created!')
  })
  .fail(err => {
    console.log(err)
    alert(err.responseJSON)
  })
  .always(() => {
    $('#email-register').val('')
    $('#password-register').val('')
  })
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: `${baseURL}/login/google`,
    data: {
      id_token
    }
  })
  .done(response => {
    const access_token = response
    localStorage.setItem('access_token', access_token)
    checkAuth()
  })
  .fail(err => {
    console.log(err)
  })
}

function addTodo(event){
  event.preventDefault()
  let title = $("#add-title").val()
  let description = $("#add-description").val()
  let due_date = $("#add-due_date").val()

  $.ajax({
    method: 'POST',
    url: `${baseURL}/todos`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      title,
      description,
      due_date
    }
  })
  .done(response => {
    console.log(response)
    alert('data added successfully')
    checkAuth()
  })
  .fail(err => {
    alert(err.responseJSON)
    console.log(err)
  })
  .always(() => {
    $("#add-title").val('')
    $("#add-description").val('')
    $("#add-due_date").val('')
  })
}

function homeTodoList(){
  $.ajax({
    method: "GET",
    url: `${baseURL}/todos`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(todos => {
    if (todos.length == 0){
      $("#todo-list").empty()
      $("#todo-list").append(`
      <div class="card w-50 mb-3 p-2 bg-transparent border-0 mx-auto">
      <div class="card-body border rounded bg-white">
        <h5 class="card-title">You don't have any todo list</h5>
      </div>
    </div>
      `)
    }
    else{
      $("#todo-list").empty()
      todos.forEach(el => {
        const date = el.due_date.substring(0,10)
        let status = ''
        if(el.status == false){
          status = 'Ongoing'
        } else {
          status = 'Done'
        }
        $("#todo-list").append(`
        <div class="card w-50 mb-3 p-2 bg-transparent border-0 mx-auto">
        <div class="card-body border rounded bg-white">
          <h5 class="card-title">${el.title}</h5>
          <p class="card-text">${el.description}</p>
          <p class="card-text">Due Date: ${date}</p>
          <p class="card-text">status: ${status}</p>
          <div>
            <button type="button" class="btn btn-sm btn-primary" onclick="editTodo(${el.id})" >Edit Data</button>
            <button type="button" class="btn btn-sm btn-primary" onclick="patchTodo(${el.id})">Edit Todo Status</button>
            <button type="button" class="btn btn-sm btn-primary" onclick="deleteTodo(${el.id})">Delete</button>
          </div>
        </div>
      </div>
        `)
      });
    }
  })
  .fail(err => {
    console.log(err)
  })
}

function deleteTodo(id){
  console.log(id)
  $.ajax({
    method: "DELETE",
    url: `${baseURL}/todos/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(todos => {
    alert('Delete successful')
    checkAuth()
  })
}

function editTodo(id){
  $('#navbar').show()
  $('#login-form').hide()
  $('#todo-list').hide()
  $('#update-form').show()
  $("#register-form").hide()
  $("#add-todo-form").hide()
  $("#update-status-form").hide()
  $("#weather").hide()

  $('#update-form').submit(event => {
    event.preventDefault()
    let title = $("#update-title").val()
    let description = $("#update-description").val()
    let status = $('input[name="status-update"]:checked').val();
    let due_date = $("#update-due_date").val()

    $.ajax({
      method: 'PUT',
      url: `${baseURL}/todos/${id}`,
      data: {
        title,
        description,
        status,
        due_date
      },
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
    .done(updatedTodo => {
      alert('Update succesful')
      checkAuth()
    })
    .fail(err => {
      alert(err.responseJSON)
      console.log(err)
    })
    .always(() => {
      $("#update-title").val('')
      $("#update-description").val('')
      $('input[name="status-update"]:checked').val('');
      $("#update-due_date").val('')
    })
  })
}

function patchTodo(id){
  $('#navbar').show()
  $('#login-form').hide()
  $('#todo-list').hide()
  $('#update-form').hide()
  $("#register-form").hide()
  $("#add-todo-form").hide()
  $("#update-status-form").show()
  $("#weather").hide()

  $("#update-status-form").submit(event => {
    event.preventDefault()
    let status = $("input[name='status-update-patch']:checked").val()

    $.ajax({
      method: 'PATCH',
      url: `${baseURL}/todos/${id}`,
      data: {
        status
      },
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
    .done(updatedTodo => {
      console.log(updatedTodo)
      alert('Status Updated Successfully')
      checkAuth()
    })
    .fail(err => {
      console.log(err)
      alert(err.responseJSON)
    })
  })
}

function showWeather(){
  $('#navbar').show()
  $('#login-form').hide()
  $('#todo-list').hide()
  $('#update-form').hide()
  $("#register-form").hide()
  $("#add-todo-form").hide()
  $("#update-status-form").hide()
  $("#weather").show()
  
}

function appendWeather(){
  $.ajax({
    method: 'GET',
    url: `${baseURL}/weather`,
  })
  .done(weather => {
    console.log(weather)
    $("#weather").empty()
    $("#weather").append(`
      <div class="card mx-auto mb-3" style="width:25rem;">
      <div class="card-body">
        <h3 class="card-title">${weather.location.name}</h3>
        <p class="card-text"> Weather status at ${weather.location.name}.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Observation time: ${weather.current.observation_time}</li>
        <li class="list-group-item">Temperature: ${weather.current.temperature}°c</li>
        <li class="list-group-item">Weather: ${weather.current.weather_descriptions[0]}</li>
      </ul>
    </div>
    `)
  })
  .fail(err => {
    console.log(err)
  })
}

