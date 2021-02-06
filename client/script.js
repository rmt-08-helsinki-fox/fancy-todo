
const baseUrl = "http://localhost:3000"


$(document).ready(() => {
    console.log('test');
    auth()
    // $('#login-form').on('submit', (el) => {
    //     el.preventDefault()
    //     login()
    //     auth()
    // })


})





function auth() {
    if (!localStorage.getItem('accessToken')) {
        $('#register-form').hide()
        $('#login-form').show()
        $('#nav-logout').hide()
        $('#nav-register').show()
        $('#nav-login').show()
        $('#todo-page').hide()
        $('#btn-add').hide()
        $('#weather').hide()
    } else {
        $('#register-form').hide()
        $('#login-form').hide()
        $('#nav-logout').show()
        $('#nav-register').hide()
        $('#nav-login').hide()
        $('#todo-page').show()
        $('#btn-add').show()
        getWeather()
        viewTodo()
    }
}


function registerForm() {
    $('#register-form').show()
    $('#login-form').hide()
}


function loginForm() {
    $('#register-form').hide()
    $('#login-form').show()
    $('#login-password').val('')
    $('#login-email').val('')
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: baseUrl + '/googleLogIn',
        method: 'POST',
        data: {
            id_token
        }
    })
        .done(response => {
            localStorage.setItem('accessToken', response.accessToken)
            $('#login-email').val('')
            $('#login-password').val('')
            auth()
        })
        .fail(err => {
            console.log(err, "ini error")
        })
}


function register() {
    const email = $('#register-email').val()
    const password = $('#register-password').val()
    $.ajax({
        method: 'POST',
        url: baseUrl + '/register',
        data: {
            email,
            password
        }

    })
        .done(response => {
            console.log(response);
            registerForm()
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);

        })
        .always(() => {
            console.log('berhasil');
        })

}



function login() {
    const email = $('#login-email').val()
    const password = $('#login-password').val()
    $.ajax({
        method: 'POST',
        url: baseUrl + '/login',
        data: {
            email,
            password
        }

    })
        .done(response => {
            console.log(response);
            localStorage.setItem('accessToken', response.accessToken)
            auth()

        })
        .fail((xhr, text) => {
            console.log(xhr, text);

        })
        .always(() => {
            console.log('berhasil');
        })

}

function viewTodo() {

    $.ajax({
        method: 'GET',
        url: baseUrl + '/todos',
        headers: {
            token: localStorage.getItem('accessToken')

        }
    })
        .done((response) => {
            console.log(response);
            // $('#notDone-page').empty()
            // $('#done-page').empty()
            // $('#todo-page').empty()      
            response.forEach(el => {
                if (el.status === false) {
                    $('#notDone-page').append(`
              <div class="card" style="width: 20rem; float: left; margin: 40px;" id="todos-${el.id}">
                <div class="card-body">
                <center>
                    <h5 class="card-title">${el.title}</h5>
                    <p class="card-text">${el.description}</p>
                    <small><p class="card-text">${el.due_date.split('T')[0]}</p></small>
                    <a href="#" class="btn btn-warning" id="update-page" onclick="updateTodo(${el.id})">Update</a>
                    <a href="#" class="btn btn-danger" onclick="deleteTodo(${el.id})">Delete</a>
                    <a href="#" class="btn btn-success" id="update-status-notDone" onclick="patchTodoDone(${el.id})">Done</a>
                </center>
                </div>
              </div>
              `)
                } else if (el.status === true) {
                    $('#done-page').append(`
                    <div class="card" style="width: 20rem; float: left; margin: 40px;" id="todos-${el.id}">
                      <div class="card-body">
                      <center>
                          <h5 class="card-title">${el.title}</h5>
                          <p class="card-text">${el.description}</p>
                          <small><p class="card-text">${el.due_date.split('T')[0]}</p></small>
                          <a href="#" class="btn btn-warning" id="update-page" onclick="updateTodo(${el.id})">Update</a>
                          <a href="#" class="btn btn-danger" onclick="deleteTodo(${el.id})">Delete</a>
                          <a href="#" class="btn btn-success" id="update-status-Done" onclick="patchNotDone(${el.id})">Not Done</a>
                      </center>
                      </div>
                    </div>
                    `)

                } {

                }
            })
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })

}

function patchTodoDone(id) {
    $.ajax({
        method: 'PATCH',
        url: baseUrl + `/todos/${id}`,
        headers: {
            token: localStorage.getItem('accessToken')
        },
        data: {
            status: true
        }
    })
        .done((response) => {
            console.log(response);
            auth()
            $('#notDone-page').empty()
            $('#done-page').empty()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })

}

function patchNotDone(id) {
    $.ajax({
        method: 'PATCH',
        url: baseUrl + `/todos/${id}`,
        headers: {
            token: localStorage.getItem('accessToken')
        },
        data: {
            status: false
        }
    })
        .done((response) => {
            console.log(response);
            auth()
            $('#notDone-page').empty()
            $('#done-page').empty()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })

}


function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: baseUrl + `/todos/${id}`,
        headers: {
            token: localStorage.getItem('accessToken')
        }
    })
        .done(() => {
            $(`#todos-${id}`).remove()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })

}


function addTodo() {
    $('#todo-page').empty()
    $('#todo-page').append(
        `<form style="background-color: white"> 
        <div class="row justify-content-center align-items-center">
        <div class="card col-md-4 col-md-offset04">
             <label for="exampleDescription">Title</label> 
             <input type="text" class="form-control" id="exampleInputTitle"  placeholder="Enter Title">  
             <br>
           <label for="exampleDescription">Description</label> 
           <textarea class="form-control" id="exampleDescription"  placeholder="Enter Description"></textarea>   
           <br>
           <label for="exampleStatus">Status</label> 
           <input type="text" class="form-control" id="exampleStatus"  placeholder="false" disabled>  
           <br>
           <label for="exampleDuedate">Due Date</label> 
           <input type="date" class="form-control" id="exampleDuedate"  placeholder="Enter Due Date">
           <br>  
           <input type="submit" class="btn btn-primary" id="add" onclick="insertTodo()">
           </div>
           </div>
           `
    )
}

function insertTodo() {
    $.ajax({
        method: 'POST',
        url: baseUrl + '/todos',
        headers: {
            token: localStorage.accessToken
        },
        data: {
            title: $("#exampleInputTitle").val(),
            description: $("#exampleDescription").val(),
            due_date: $("#exampleDuedate").val(),
            status: $("exampleStatus").val()
        }
    })
        .done((response) => {
            console.log(response);
            addTodo()
        })
        .fail((xhr, text) => {
            console.log(xhr);
        })
        .always(() => {
            console.log("complete");
        })
}


function updateTodo(id) {
    $.ajax({
        method: 'GET',
        url: baseUrl + `/todos/${id}`,
        headers: {
            token: localStorage.getItem('accessToken')
        }

    })
        .done((response) => {
            console.log(response);
            $('#todo-page').empty()
            $('#todo-page').append(
                `<form style="background-color: white"> 
            <div class="row justify-content-center align-items-center">
            <div class="card col-md-4 col-md-offset04">
            <label for="exampleDescription">Title</label> 
            <input type="text" class="form-control" id="update-title"  value="${response.title}">  
            <br>
            <label for="exampleDescription">Description</label> 
            <input type="text" class="form-control" id="update-description"  value="${response.description}">   
            <br>
            <label for="exampleStatus">Status</label> 
            <input type="text" class="form-control" id="update-status"  value="false" disabled>  
            <br>
            <label for="exampleDuedate">Due Date</label> 
            <input type="date" class="form-control" id="update-duedate"  value="${response.due_date.split('T')[0]}">
            <br>  
            <input type="submit" class="btn btn-primary" id="add" onclick="editTodo(${response.id})">
            </div>
            </div>
            `
            )
        })
        .fail((xhr, text) => {
            console.log(xhr);
        })
}

function editTodo(id) {
    $.ajax({
        method: 'PUT',
        url: baseUrl + '/todos/' + id,
        headers: {
            token: localStorage.accessToken
        },
        data: {
            title: $("update-title").val(),
            description: $("#update-description").val(),
            due_date: $("#update-duedate").val(),
            status: $("update-status").val()
        }
    })
        .done((response) => {
            console.log(response);
            auth()

        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log("complete");
        })
}




function getWeather(){
    $.ajax({
      url: baseUrl+'/weather',
      headers:{
        token:localStorage.getItem('accessToken')
      }
    })
    .done(response => {
      console.log(response);
      $('#weather').html(`
      <div class="padding opacity:50%" >
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
                                  <h1 class="font-light text-info m-b-0">${response.current.temperature}<sup>0</sup></h1> <small>${response.current.weather_descriptions[0]}</small>
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

$('#register-form').on('submit', (el) => {
    el.preventDefault()
    register()
    auth()
})
$('#login-button').click((el) => {
    el.preventDefault()
    login()
    auth()

})

$('#nav-register').click((el) => {
    el.preventDefault()
    registerForm()

})


$('#nav-login').click((el) => {
    el.preventDefault()
    loginForm()

})


$('#nav-logout').click((el) => {
    el.preventDefault()
    localStorage.clear()
    loginForm()
    auth()

})
$('#btn-add').on('click', (el) => {
    el.preventDefault()
    // $('#form-add').show()
})

$('#update-page').on('click', (el) => {
    el.preventDefault()
    // $('#form-add').show()
    updateTodo()
})

$('#update-status-notDone').click((el) => {
    el.preventDefault()
    // $('#form-add').show()
    // updateTodo()
    auth()
})

$('#update-status-done').click((el) => {
    el.preventDefault()
    // $('#form-add').show()
    // updateTodo()
    auth()
})

