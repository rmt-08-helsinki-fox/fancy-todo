const base_url = 'https://fancy-app-todo.herokuapp.com/'
// const base_url = 'http://localhost:3000/'

function auth() {
    if (!localStorage.getItem('access_token')) {
        $('#login-form').show()
        $('#register-form').hide()
        $('#form-add').hide()
        $('#form-edit').hide()
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
        $('#form-edit').hide()
        $('#todo-list').show()
        $('#nav-signin').hide()
        $('#nav-signup').hide()
        $('#nav-signout').show()
        $('#btn-add').show()
        $('#weather').show()
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
        Swal.fire({
            icon: 'success',
            title: 'Succes Register',
            text: 'You haved Registered',
        })
      })
      .fail((err, text) => {
        console.log(err, text)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something wrong!',
        })
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
                  <h3 class="card-title text-white m-b-0 dl">${response.location.name},${response.location.region},
                  ${response.location.country}</h3> <small class="card-text text-white font-light"></small>
              </div>
              <div class="card-body weather-small" style="background-color:#eee;">
                  <div class="row">
                      <div class="col-8 b-r align-self-center">
                          <div class="d-flex">
                              <div class="display-6 text-info"><i class="mdi mdi-weather-pouring"></i></div>
                              <div class="m-l-20">
                                  <h1 class="font-light text-info m-b-0">${response.currenct.temperature}
                                  <sup>0</sup></h1> <small>${response.currenct.weather_descriptions[0]}</small>
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
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        auth()
        Swal.fire({
            icon: 'success',
            title: 'Welcome',
            text: 'Enjoy Our Site',
        })
    })
    .fail((err) => {
        console.log(err);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something wrong!',
        })
    })
}


function login() {
    console.log('masuk login')
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
            console.log({response})
            localStorage.setItem('access_token', response.access_token)
            auth()
            Swal.fire({
                icon: 'success',
                title: 'Welcome',
                text: 'Enjoy Our Site',
            })
        })
        .fail((xhr, text,err) => {
            console.log({xhr, text,err})
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something wrong!',
            })
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
            response.forEach(el => {
                $('#todo-list').append(`
              <div class="card" style="width: 18rem; float: left; margin: 40px;" id="todos-${el.id}">
                <div class="card-body">
                    <h5 class="card-title">${el.title}</h5>
                    <p class="card-text">${el.description}</p>
                    <small><p class="card-text">${el.due_date.slice(0, 10)}</p></small>
                    <a href="#" class="btn btn-warning"  id="editForm" onClick="updateTodo(${el.id})">Edit</a>
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

function showFromEdit() {
    $('#login-form').hide()
    $('#register-form').hide()
    $('#form-add').hide()
    $('#form-edit').show()
    $('#todo-list').hide()
    $('#nav-signin').hide()
    $('#nav-signup').hide()
    $('#nav-signout').show()
    $('#btn-add').hide()
    $('#weather').hide()
}

function updateTodo(id){
    $('#form-edit').empty()
    showFromEdit()
    $.ajax({
        method: 'GET',
        url: base_url + `todos/${id}`,
        headers: {
            token: localStorage.getItem('access_token')
        },
    })
    .done((response) => {
        console.log(response, 'ini untuk form')
        $('#form-edit').append(`
        <form style="background-color: rgba(245, 245, 245, .3)"> 
        <div class="form-group"> 
             <label for="exampleDescription">Title</label> 
             <input type="text" class="form-control" id="exampleInputTitleedit" value="${response.title}" placeholder="Enter Title">  
        </div> 
        <div class="form-group"> 
           <label for="exampleDescription">Description</label> 
           <input type="text" class="form-control" id="exampleDescriptionedit" value="${response.description}" placeholder="Enter Description">  
       </div> 
       <div class="form-group"> 
           <label for="exampleStatus">Status</label> 
           <input type="text" class="form-control" id="exampleStatusedit" value="true" placeholder="Enter Status">  
       </div> 
       <div class="form-group"> 
           <label for="exampleDuedate">Due Date</label> 
           <input type="date" class="form-control" id="exampleDuedateedit" value="${response.due_date.slice(0, 10)}" placeholder="Enter Due Date">  
       </div> 
        <input type="submit" class="btn btn-primary" id="edit" onClick="editTodo(${response.id})" value="Edit">
        <input type="submit" class="btn btn-dark" id="back" onClick="BackToHome()" value="Back">
        </form> 
        `)
    })
    .fail(err => {
        auth()
        console.log(err,'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Can't be Edit, Not Yours",
        })
    })
    .always(() => {
        console.log("complete");
    })
}

function editTodo(id) {
    console.log(id, 'line 233')
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
            status: $("#exampleStatusedit").val()
        }
    })
    .done((response) => {
       auth()
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your edited success',
        showConfirmButton: false,
      })
    })
    .fail(err => {
        console.log(err,'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    })
    .always(() => {
        console.log("complete");
    })
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
        auth()
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your added success',
            showConfirmButton: false,
        })
    })
    .fail(err => {
        console.log(err);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something wrong!',
        })
    })
    .always(() => {
        console.log("complete");
    })
}

function BackToHome() {
    auth()
}

function deleted(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: base_url + `todos/${id}`,
                method: 'DELETE',
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
                .done((response) => {
                    $(`#todos-${id}`).remove()
                    Swal.fire(
                        'Deleted!',
                        'Your todo has been deleted.',
                        'success'
                      )
                })
                .fail((xhr, text) => {
                    console.log(xhr, text)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Can't be Delete, Not Yours",
                    })
                })
          
        }
      })
}

function logout() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You wont to exit this website?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, exit !'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear()   
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
             });
            auth()
            Swal.fire(
                'Thank You',
                'Enjoy Your Today :)',
                'success'
          )
        }
      })
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
        $('#weather').hide()
        $('#todo-list').hide()
        $('#form-add').show()
    })

    $('#back').on('click', (event) => {
        event.preventDefault()
        auth()
    })

    $('#editForm').on('click', (event) =>{
        event.preventDefault()
        $('#form-edit').show()
    })

    $('#add').on('click', (event) => {
        event.preventDefault()
        insertTodo()
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