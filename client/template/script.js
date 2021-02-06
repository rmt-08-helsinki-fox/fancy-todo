
const base_url = 'http://localhost:3000/'

function auth() {
    if (!localStorage.getItem('access_token')) {
        $('#login-form').show()
        $('#register-form').hide()
        $('#form-add').hide()
        $('#todo-list').hide()
        $('#nav-signin').hide()
        $('#nav-signup').show()
        $('#nav-signout').hide()
        $('#btn-add').hide()
        $('#weather').hide()
    } else {
        $('#login-form').hide()
        $('#register-form').hide()
        $('#form-add').hide()
        $('#todo-list').show()
        $('#nav-signin').hide()
        $('#nav-signup').hide()
        $('#nav-signout').show()
        $('#btn-add').show()
        getWeather()
        todoList()
    }
}

function register (){
    const email = $('#regis-email').val()
    const password = $('#regis-pass').val()
    console.log(email,password)
    $.ajax({
      url: base_url + 'users/register',
      method:'POST',
      data:{
          email,
          password
      }
    })
      .done((response) =>{
        console.log(response);
        $('#login-form').show()
        $('#nav-signup').show()
        $('#nav-signin').hide()
        $('#register-form').hide()
        auth()
      })
      .fail((err, text) => {
        console.log(err, text)
      })
      .always(() => {
        $('#regis-email').val('')
        $('#regis-pass').val('')
      })  
}
  

function getWeather(){
    $.ajax({
      url:base_url+'weathers',
      headers:{
        token:localStorage.getItem('access_token')
      }
    })
    .done(response => {
      console.log(response);
      $('#weather').html(`
      <div class="padding " >
      <div class="row justify-content-center align-items-center" style="float: right;">
          <div class="card " style="height:220px; margin-right:250px;"> 
          <img class="" src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1559286899/weatherbg.jpg" alt="Card image cap">
              <div class="card-img-overlay" style="height:110px;">
                  <h3 class="card-title text-white m-b-0 dl">${response.location.name},${response.location.region},${response.location.country}</h3> <small class="card-text text-white font-light"></small>
              </div>
              <div class="card-body weather-small" style="background-color:#eee;">
                  <div class="row">
                      <div class="col-8 b-r align-self-center">
                          <div class="d-flex">
                              <div class="display-6 text-info"><i class="mdi mdi-weather-pouring"></i></div>
                              <div class="m-l-20">
                                  <h1 class="font-light text-info m-b-0">${response.currenct.temperature}<sup>0</sup></h1> <small>${response.currenct.weather_descriptions[0]}</small>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <br>
      <br>
      <br>
      `)
    })
    .fail((err, text) => {
      console.log(err);
    })
}
 
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: base_url + "users/googleLogin",
        method: "POST",
        data: {
            googleToken: id_token
        }
    })
    .done((response) => {
        localStorage.setItem('access_token', response.access_token)
        auth()
    })
    .fail((err) => {
        console.log(err);
    })
}


function login() {
    const email = $('#login-email').val()
    const password = $('#login-pass').val()
    $.ajax({
        url: base_url + 'users/login',
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done((response) => {
            console.log(response)
            localStorage.setItem('access_token', response.access_token)
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
        .always(_ => {
            $('#card-login').trigger("reset")
        })
}

function todoList() {
    $.ajax({
        url: base_url + 'todos',
        method: "GET",
        headers: {
            token: localStorage.getItem('access_token')
        }
    })
        .done((response) => {
            let todos 
            todos = response
            console.log(todos)
            response.forEach(el => {
                $('#todo-list').append(`
              <div class="card" style="width: 18rem; float: left; margin: 40px;" id="todos-${el.id}">
                <div class="card-body">
                    <h5 class="card-title">${el.title}</h5>
                    <p class="card-text">${el.description}</p>
                    <small><p class="card-text">${el.due_date.slice(0, 10)}</p></small>
                    <a href="#" class="btn btn-warning"  id="editForm" onClick="edited(${el.id})">Edit</a>
                    <a href="#" class="btn btn-danger" onClick="deleted(${el.id})">Delete</a>
                </div>
              </div>
              `)
            })
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
}

function edited(id) {
    $('#todo-list').empty()
    $('#todo-list').append(
        `<form style="background-color: rgba(245, 245, 245, .3)"> 
        <div class="form-group"> 
             <label for="exampleDescription">Title</label> 
             <input type="text" class="form-control" id="exampleInputTitleedit"  placeholder="Enter New Title">  
        </div> 
        <div class="form-group"> 
           <label for="exampleDescription">Description</label> 
           <input type="text" class="form-control" id="exampleDescriptionedit"  placeholder="Enter New Description">  
       </div> 
       <div class="form-group"> 
           <label for="exampleStatus">Status</label> 
           <input type="text" class="form-control" id="exampleStatusedit" value="true" placeholder="Enter New Status">  
       </div> 
       <div class="form-group"> 
           <label for="exampleDuedate">Due Date</label> 
           <input type="date" class="form-control" id="exampleDuedateedit" placeholder="Enter Due Date">  
       </div> 
        <input type="submit" class="btn btn-primary" id="edit" onClick="editTodo(${id})" value="Edit">`
    )
}

function editTodo(id) {
    console.log('masuk funnction')
    $.ajax({
        method: 'PUT',
        url: base_url + `todos/${id}`,
        headers: {
            token: localStorage.getItem('access_token')
        },
        data: {
            title: $("#exampleInputTitleedit").val(),
            description: $("#exampleDescriptionedit").val(),
            due_date: $("#exampleDuedateedit").val(),
            status: $("#exampleStatusedit").text()
        }
    })
    .done((response) => {
        console.log('awang dari ajax');
        console.log(response);
        $('#form-edit').hide()
        todoList()
    })
    .fail(err => {
        console.log(err,'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    })
    .always(() => {
        console.log("complete");
    })
}

function addTodo() {
    $('#todo-list').empty()
    $('#todo-list').append(
        `<form style="background-color: rgba(245, 245, 245, .3)"> 
        <div class="form-group"> 
             <label for="exampleDescription">Title</label> 
             <input type="text" class="form-control" id="exampleInputTitle"  placeholder="Enter Title">  
        </div> 
        <div class="form-group"> 
           <label for="exampleDescription">Description</label> 
           <input type="text" class="form-control" id="exampleDescription"  placeholder="Enter Description">  
       </div> 
       <div class="form-group"> 
           <label for="exampleStatus">Status</label> 
           <input type="text" class="form-control" id="exampleStatus"  placeholder="Enter Status">  
       </div> 
       <div class="form-group"> 
           <label for="exampleDuedate">Due Date</label> 
           <input type="date" class="form-control" id="exampleDuedate"  placeholder="Enter Due Date">  
       </div> 
        <input type="submit" class="btn btn-primary" id="add" onclick="insertTodo()">`
    )
}



function insertTodo() {
    $.ajax({
        method: 'POST',
        url: base_url + 'todos',
        headers: {
            token: localStorage.access_token,
        },
        data: {
            title: $("#exampleInputTitle").val(),
            description: $("#exampleDescription").val(),
            due_date: $("#exampleDuedate").val(),
            status: $("#exampleStatus").val()
        }
    })
    .done((response) => {
        console.log(response);
        $('#form-add').hide()
        todoList()
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}


function deleted(id) {
    $.ajax({
        url: base_url + `todos/${id}`,
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('access_token')
        }
    })
        .done((response) => {
            $(`#todos-${id}`).remove()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
}

function logout() {
    localStorage.clear()   
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
    auth()
}


$(document).ready(() => {
    auth()
    $('#card-login').on('submit', (event) => {
        event.preventDefault()
        login()
    })

    $('#nav-signout').on('click', (event) => {
        event.preventDefault()
        logout()
    })

    $('#btn-add').on('click', (event) =>{
        event.preventDefault()
        $('#btn-add').hide()
        $('#weather').empty()
        $('#form-add').show()
    })

    $('#editForm').on('click', (event) =>{
        event.preventDefault()
        $('#btn-add').hide()
        $('#btn-add').empty()
        $('#weather').empty()
        $('#form-edit').show()
    })

    $('#add').on('click', (event) => {
        event.preventDefault()
        $('#todo-list').hide()
    })

    $('#edit').on('click', (event) => {
        event.preventDefault()
        $('#todo-list').hide()
    })

    $('#nav-signup').click((event) =>{
        event.preventDefault()
        $('#login-form').hide()
        $('#register-form').show()
        $('#nav-signup').hide()
        $('#nav-signin').show()
    })

    $('#nav-signin').click((event) =>{
        event.preventDefault()
        auth()
    })

    $('#register-form').on('submit', e => {
        e.preventDefault()
        register()
    })
})