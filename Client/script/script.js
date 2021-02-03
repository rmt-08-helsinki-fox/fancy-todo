let baseUrl = 'http://localhost:3000/'

function authenticate() {
    if(!localStorage.getItem('accessToken')){
        $('#login-form').show()
        $('#register-form').hide()
        $('#login').show()
        $('#register').show()
        $('#home').hide()
        $('#logout').hide()
        $('#edit-form').hide()
    }else{
        $('#login').hide()
        $('#register').hide()
        $('#login-form').hide()
        $('#register-form').hide()
        $('#home').show()
        $('#logout').show()
        $('#edit-form').hide()
        getTodo()
    }
}

function logout() {
    localStorage.removeItem('accessToken')
}

function toRegister() {
    $('#email-register').val('')
    $('#password-register').val('')
    $('#login-form').hide()
    $('#register-form').show()
    $('#home').hide()
}

function toLogin() {
    $('#email-login').val('')
    $('#password-login').val('')
    $('#login-form').show()
    $('#register-form').hide()
    $('#home').hide()
}

function getTodo() {
    $.ajax({
        url: baseUrl + 'todos',
        method: 'GET',
        headers: {accessToken: localStorage.getItem('accessToken')}
    })
    .done(data => {
        $('#todo-list').empty()
        data.forEach(el => {
            $('#todo-list').append(`
                <tr>
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td>${moment(el.due_date).format('DD-MMMM-YYYY')}</td>
                    <button>haii</button>
                    <td><button onclick="check(${el.id})">Check</button></td>
                    <td><button onclick="edit(${el.id})">Edit</button></td>
                    <td><button onclick="del(${el.id})">delete</button></td>
                </tr>`)
        });
    })
    .fail((err, text) => {
        console.log(err, text)
    })
}

function check(id) {
    $.ajax({
        url: baseUrl + `todos/${id}`,
        method: 'PATCH',
        headers: {accessToken: localStorage.getItem('accessToken')},
        data: {id}
    })
    .done(() => {
        getTodo()
    })
    .fail((err, txt) => {
        console.log(err,txt)
    })
}

function edit(id) {
    $('#home').hide()
    $.ajax({
        url: baseUrl + `todos/${id}`,
        method: 'GET',
        headers: {accessToken: localStorage.getItem('accessToken')},
    })
    .done(data => {
        $("#edit-form").append(`
        <legend>Edit Todo</legend>
        <label>Title</label>
        <input type="text" class="form-control" id="title-edit" value="${data.title}">
        <label>Description</label>
        <input type="text" class="form-control" id="desc-edit" value="${data.description}">
        <label>Due Date</label><br>
        <input type="date" id="date-edit" value="${moment(data.due_date).format('YYYY-MM-DD')}">
        <input type="submit" value="SUBMIT">`)
        $('#edit-form').show()
    })
    .fail(err => {
        console.log(err)
    })
}

function del(id){
    $.ajax({
        url: baseUrl + `todos/${id}`,
        method: 'DELETE',
        headers: {accessToken: localStorage.getItem('accessToken')},
    })
    .done(() => {
        getTodo()
    })
    .fail((err, txt) => {
        console.log(err,txt)
    })
}

$(document).ready(() => {
    authenticate()

    //Login
    $('#login-form').on('submit', (e) => {
        let email = $('#email-login').val()
        let password = $('#password-login').val()
        e.preventDefault()
        $.ajax({
            url: baseUrl + 'users/login',
            method: 'POST',
            data: {email, password}
        })
        .done(data => {
            localStorage.setItem('accessToken', data.accessToken)
            getTodo()
        })
        .fail((err, text) => {
            console.log(err, text)
        })
        .always(() => {
            $('#email-login').val('')
            $('#password-login').val('')
            authenticate()
        })
    })

    //Register
    $('#register-form').on('submit', (e) => {
        let email = $('#email-register').val()
        let password = $('#password-register').val()
        e.preventDefault()
        $.ajax({
            url: baseUrl + 'users/register',
            method: 'POST',
            data: {email, password}
        })
        .done( () => {
            toLogin()
        })
        .fail((err, text) => {
            console.log(err, text)
        })
        .always(() => {
            $('#email-register').val('')
            $('#password-register').val('')
        })
    })

    //Log Out
    $('#logout').on('click', (e) => {
        e.preventDefault()
        localStorage.removeItem('accessToken')
        authenticate()
    })

    $('#add-form').on('submit', (e) => {
        let title = $('#title-todo').val()
        let description = $('#desc-todo').val()
        let due_date = $('#date-todo').val()
        $.ajax({
            url: baseUrl + 'todos',
            method: 'POST',
            headers: {accessToken: localStorage.getItem('accessToken')},
            data: {title, description, due_date}
        })
        .done(() => {
            getTodo()
        })
        .fail((err, txt) => {
            console.log(err, txt)
        })
    })

    $('#edit-form').on('submit', (e) => {
        let title = $("#title-edit").val()
        let description = $("#desc-edit").val()
        let due_date = $("#date-edit").val()
        e.preventDefault()
        // $.ajax({
        //     url: baseUrl + '/todos',
        //     get: '',
        // })
    })
    
})