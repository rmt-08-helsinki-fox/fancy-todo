
const url = 'http://localhost:5000/'

function auth() {
    if(!localStorage.getItem('token')){
        $('#login').show()
        $('#register').hide()
        $('#logOut').hide()
        $('#todoTable').hide()
        $('#inputTodo').hide()
        $('#showTodo').hide()
        $('#log').hide()
    }else{
        $('#showTodo').show()
        $('#res').hide()
        $('#register').hide()
        $('#login').hide()
        $('#todoTable').show()
        $('#inputTodo').show()
        $('#logOut').show()
        $('#log').hide()
        getTodos()
    }
}

function register() {
    const email = $('#registerEmail').val()
    const password = $('#registerPassword').val()
    $.ajax({
        url: url + 'users/register',
        method:'POST',
        data:{
            email,
            password
        }
    })
    .done((response) => {
        $('#succesRegister').show()
        $('#toLogin').click(() =>{
            $('#login').show()
            $('#register').hide()
        })
    })
    .fail((err, text) =>{
        if(Array.isArray(err.responseJSON.errors)){
            err.responseJSON.errors.forEach(e => {
                $('#alertFail').prepend(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <p>${e}</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>  
                `)
            })
        }else{
            $('#alertFail').prepend(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <p>${err.responseJSON.error}</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>  
                `)
        }
    })
    .always(() => {
        $('#registerForm').trigger('reset')
    })
}

function  login() {
    const email = $('#loginEmail').val()
    const password = $('#loginPassword').val()
    $.ajax({
        url: url +'users/login',
        method:'POST',
        data:{
            email,
            password
        }
    })
    .done((response) =>{
        localStorage.setItem('token', response.access_token)
        auth()
    })
    .fail((err, text) =>{
        console.log(err);
        $('#alertLogin').prepend(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <p>${err.responseJSON.error}</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>  
        `)
    })
    .always(() =>{
        $('#loginForm').trigger('reset')
    })
}

function getTodos() {
    $.ajax({
        url: url+'todos',
        method: 'GET',
        headers :{
            token: localStorage.getItem('token')
        }
    })
    .done(({todos, quote}) => {
        $('#quote').html(`
            <div class="jumbotron">
                <h1 class="display-4">Quote of the day!</h1>
                <p class="lead">"${quote.content}"- <span class="text-muted">${quote.author}</span></p>
                <hr class="my-4">
            </div>
        `)
        $('#showTodo').empty()
        todos.forEach(e => {
            const date = e.due_date.split('T')[0]
            let checkbox = `<input type="checkbox" class="form-check-input" id="status-${e.id}" onclick="updateStatus(${e.id}, '${e.status}')" `
            if (e.status === true) {
                checkbox += `checked>`
            } else if(e.status === false){
                checkbox += `>`
            }
            $('#showTodo').append(`
            <div class="card logOutTodo" style="width: 20rem;" id="todo-${e.id}" >
            <div class="card-body" >
              <div class="row">
                <div class="col  d-flex justify-content-center">
                  ${checkbox}
                </div>
                <div class="col-9">
                  <h5 class="card-title">${e.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
                  <p class="card-text">${e.description}</p>
                  <a href="#" class="card-link" onclick="deleteTodo(${e.id})" >Delete</a>
                  <a href="#" class="card-link" onclick="getTodoById(${e.id})" >Edit</a>
                </div>
              </div>
            </div>
          </div>
            `)

        })
    })
    .fail((err, text) => {
        console.log(err, text);
    })
}

function deleteTodo(idParams) {
    $.ajax({
        url: url + `todos/${idParams}`,
        method:'DELETE',
        headers :{
            token: localStorage.getItem('token')
        }
    })
    .done(response =>{
        $(`#todo-${+idParams}`).remove();
    })
    .fail((err, text) =>{
        console.log(err, text);
    })
}

function postTodo() {
    const title = $('#tileTodo').val()
    const desc = $('#descriptionTodo').val()
    const date = $('#dateTodo').val()
    $.ajax({
        url: url +'todos',
        method:'POST',
        data: {
            title,
            description: desc,
            due_date:date
            
        },
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .done(response => {
        const date = response.due_date.split('T')[0]
        $('#showTodo').append(`
            <div class="card" style="width: 20rem;" id="todo-${response.id}">
                <div class="card-body" >
                    <div class="row">
                        <div class="col  d-flex justify-content-center">
                        <input type="checkbox" class="form-check-input" id="status-${response.id}" onclick="updateStatus(${response.id}, '${response.status}')">
                        </div>
                        <div class="col-9">
                            <h5 class="card-title">${response.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
                            <p class="card-text">${response.description}</p>
                            <a href="#" class="card-link" onclick="deleteTodo(${response.id})" >Delete</a>
                            <a href="#" class="card-link" onclick="getTodoById(${response.id})" >Edit</a>
                        </div>
                    </div>
                </div>
            </div>
        `)
    })
    .fail((err, text) => {
        err.responseJSON.errors.forEach(e => {
            $('#saveTodo').prepend(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <p>${e}</p>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>  
            `)
        })
    })
    .always(() =>{
        $('#inputForm').trigger('reset')
    })
}

function getTodoById(id) {
    $.ajax({
        url: url + `todos/${id}`,
        method: 'GET',
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .done(response => {
        console.log(response);
        const date = response.due_date.split('T')[0]
        $('#detail-modal .modal-body p').html(`
            <form id="editForm">
                <div class="form-group">
                    <label for="tileTodo">Title</label>
                    <input type="text" class="form-control" id="tileTodoEdit" value="${response.title}">
                </div>
                <div class="form-group">
                    <label for="descriptionTodo">Description</label>
                    <textarea class="form-control" id="descriptionTodoEdit" rows="3" >${response.description}</textarea>
                </div>
                <div class="form-group">
                    <label for="dateTodo">Date Due: </label>
                    <input type="date" name="dateTodo" id="dateTodoEdit" value="${date}" required>      
                </div>
                    <button type="submit" class="btn btn-primary" onclick="updateTodo(${response.id})" >Save</button>
            </form> 
    `   );
        $('#detail-modal').modal('show');
    })
    .fail((err, text) => {
        console.log(err);
    })
}


function updateTodo(id) {
    let judul = $('#tileTodoEdit').val()
    let desc = $('#descriptionTodoEdit').val()
    let date = $('#dateTodoEdit').val()
    $.ajax({
        url: url + `todos/${id}`,
        method: 'PUT',
        data:{
            title: judul,
            description: desc,
            due_date:date
        },
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .done(response =>{
        console.log(response);
        $('#detail-modal').modal('hide');
        auth()
    })
    .fail((err, text) => {
        console.log(err);
    })
}




function updateStatus(id, status) {
    let newStatus;
    if(status === false){
        newStatus = 'belom'
    }else{
        newStatus = 'sudah'
    }

    console.log(newStatus);
    $.ajax({
        url: url + `todos/${id}`,
        method: "PATCH",
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
            status: newStatus
        }
      })
      .done(response =>{
          console.log(response);
          console.log('sukses update status');
      })
      .fail((err, text) =>{
          console.log(err, text);
      })
}


function edit(id) {
    $.ajax({
        url: base_url + `todos/${id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title,
          description,
          status,
        }
      })
        .done((response) => {
          auth();
          console.log(response);
        })
        .fail((xhr, text) => {
          console.log(xhr, text);
        })
}

function showModal(id) {
    $('#detail-modal .modal-body p').html(`${id}`);
    $('#detail-modal').modal('show');

}

function clickRegister() {
    $('#res').click(() =>{
        $('#login').hide()
        $('#register').show()
        $('#log').show()
        $('#res').hide()
    })
}

function clickLogin() {
    $('#log').click(() =>{
        $('#login').show()
        $('#register').hide()
        $('#log').hide()
        $('#res').show()
    })
}



$(document).ready(() =>{
    auth()
    clickRegister()
    clickLogin()
    $('#succesRegister').hide()
    $('#register').on('submit', (e) =>{
        e.preventDefault()
        register()
    })
    $('#login').on('submit', (e) => {
        e.preventDefault()
        login()
    })
    $('#saveTodo').on('submit', e =>{
        e.preventDefault()
        postTodo()
    })
    $('#logOut').on('click',e => {
        e.preventDefault()
        localStorage.clear()
        localStorage.removeItem('token')
        signOut()
        auth()
    })
    $('#editForm').on('click', e => {
        e.preventDefault()
        $('#detail-modal').modal('hide');
    })
})

// google login

function onSignIn(googleUser) {

    const id_token = googleUser.getAuthResponse().id_token
    console.log(id_token);
    $.ajax({
        method: "POST",
        url: url +'users/googlelogin',
        data: {
            id_token
        }
    }).done(result => {
        localStorage.setItem('token', result.access_token)
        auth()
        // console.log(result)
    }).fail(err => {
        console.log(err)
    })
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
  }