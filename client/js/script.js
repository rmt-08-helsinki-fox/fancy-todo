
const url = 'http://localhost:5000/'

function auth() {
    if(!localStorage.getItem('token')){
        $('#login').show()
        $('#register').hide()
        $('#logOut').hide()
        $('#todoTable').hide()
        $('#inputTodo').hide()
    }else{
        $('#res').hide()
        $('#register').hide()
        $('#login').hide()
        $('#todoTable').show()
        $('#inputTodo').show()
        $('#logOut').show()
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
    .fail((xhr, text) =>{
        console.log(xhr, text);
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
        console.log(response);
        localStorage.setItem('token', response.acces_token)
        auth()
    })
    .fail((err, text) =>{
        console.log(err, text);
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
            if(e.status){
                $('#showTodo').append(`
                    <div class="card border-success mb-3" id="todo-${e.id}" style="max-width: 18rem;">
                        <div class="card-header bg-transparent border-success">${e.title}</div>
                        <div class="card-body text-success">
                        <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
                            <p class="card-text">${e.description}</p>
                        </div>
                        <div class="card-footer bg-transparent border-success">Done</div>
                    </div>
               `)
            }else{
                $('#showTodo').append(`
                <div class="col">
                    <div class="card border-dark mb-3" id="todo-${e.id}" style="max-width: 18rem;">
                            <div class="card-header">${e.title}</div>
                        <div class="card-body text-dark">
                        <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
                            <p class="card-text">${e.description}</p>
                            <button class="btn btn-outline-primary mr-2" data-toggle="modal" data-target="#todoModal-${e.id}">Update</button>
                            <a href="#" class="btn btn-outline-danger" onclick="deleteTodo(${e.id})">Delete</a>
                        </div>
                    </div>
                </div> 
               `)
            }
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
    $.ajax({
        url: url +'todos',
        method:'POST',
        data: {
            title,
            description: desc,
            
        },
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .done(response => {
        const date = response.due_date.split('T')[0]
        $('#showTodo').append(`
            <div class="col">
                <div class="card border-dark mb-3" id="todo-${response.id}" style="max-width: 18rem;">
                    <div class="card-header">${response.title}</div>
                    <div class="card-body text-dark">
                        <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
                        <p class="card-text">${response.description}</p>
                        <button class="btn btn-outline-primary mr-2" data-toggle="modal" data-target="#todoModal-${response.id}">Update</button>
                            <a href="#" class="btn btn-outline-danger" onclick="deleteTodo(${response.id})">Delete</a>
                    </div>
                </div>
            </div>
        `)
    })
    .fail((err, text) => {
        console.log(err, text);
    })
    .always(() =>{
        $('#inputForm').trigger('reset')
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
    })
}

$(document).ready(() =>{
    auth()
    clickRegister()
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