
const url = 'http://localhost:3001/'

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
        console.log(quote);
        console.log(todos);
        $('#quote').append(`
            <div class="jumbotron">
                <h1 class="display-4">Quote of the day!</h1>
                <p class="lead">"${quote.content}"- <span class="text-muted">${quote.author}</span></p>
                <hr class="my-4">
            </div>
        `)
        todos.forEach(e => {
            const date = e.due_date.split('T')[0]
            $('#showTodo').append(`
            <div class="card col-sm mx-3" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${e.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
                <p class="card-text">${e.description}</p>
                <button onclick="deleteTodo(${e.id})">delete Todo</button>
                <button onclick="complateTodo(${e.id})">Done</button>
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
        getTodos()
    })
    .fail((err, text) =>{
        console.log(err, text);
    })
}

function postTodo() {
    const title = $('#tileTodo').val()
    const desc = $('#descriptionTodo').val()
    console.log(title, desc);
    $.ajax({
        url: url +'todos',
        method:'POST',
        data: {
            title,
            description: desc
        },
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .done(response => {
        getTodos()
    })
    .fail((err, text) => {
        console.log(err, text);
    })
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
})