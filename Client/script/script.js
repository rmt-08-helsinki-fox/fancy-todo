let baseUrl = 'http://localhost:3000/'

function authenticate() {
    if(!localStorage.getItem('accessToken')){
        localStorage.removeItem('TodoId')
        $('#login-form').show()
        $('#form').show()
        $('#register').show()
        $('#login').show()
        $('#holiday-nav').hide()
        $('#register-form').hide()
        $('#home').hide()
        $('#logout').hide()
        $('#edit-form').hide()
    }else{
        localStorage.removeItem('TodoId')
        $('#holiday-nav').show()
        $('#home').show()
        $('#logout').show()
        $('#login').hide()
        $('#register').hide()
        $('#form').hide()
        $('#edit-form').hide()
        getTodo()
    }
}

function home() {
    $('#main').show()
    getTodo()
}

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
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
        $('#holiday').hide()
        data.forEach(el => {
            if(el.status === true){
                $('#todo-list').append(`
                <tr  style="background-color: yellow; text-align: center; font-weight: bold;">
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td>${moment(el.due_date).format('DD-MMMM-YYYY')}</td>
                    <td><button onclick="complete(${el.id})" class="btn btn-secondary">Completed</button>
                    <button onclick="unComplete(${el.id})" class="btn btn-secondary">UnComplete</button>
                    <button onclick="edit(${el.id})" class="btn btn-secondary">Edit</button>
                    <button onclick="del(${el.id})" class="btn btn-secondary">Delete</button></td>
                </tr>`)
            }else{
                $('#todo-list').append(`
                    <tr style="text-align: center; font-weight: bold;">
                        <td>${el.title}</td>
                        <td>${el.description}</td>
                        <td>${moment(el.due_date).format('DD-MMMM-YYYY')}</td>
                        <td><button onclick="complete(${el.id})" class="btn btn-secondary">Complete</button>
                        <button onclick="unComplete(${el.id})" class="btn btn-secondary">UnComplete</button>
                        <button onclick="edit(${el.id})" class="btn btn-secondary">Edit</button>
                        <button onclick="del(${el.id})" class="btn btn-secondary">Delete</button></td>
                    </tr>`)
            }
        });
    })
    .fail((err, text) => {
        console.log(err, text)
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
  
    $.ajax({
        url: baseUrl + "users/googlelogin",
        method: "POST",
        data: {
          googleToken : id_token
        }
    })
    .done(res => {
        localStorage.setItem("accessToken", res.accessToken);
        authenticate()
    })
    .fail((xhr, text) => {
        console.log(xhr, text);
    })
}

function complete(id) {
    let status = true
    $.ajax({
        url: baseUrl + `todos/${id}`,
        method: 'PATCH',
        headers: {accessToken: localStorage.getItem('accessToken')},
        data: {id, status}
    })
    .done(() => {
        getTodo()
    })
    .fail((err, txt) => {
        console.log(err,txt)
    })
}

function unComplete(id) {
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
        $('#edit-form').empty()
        if(data.status === true){
            alert(`You Can't Edit Checked ToDo`)
            authenticate()
        }else{
            $("#edit-form").append(`
            <legend class="text-center">EDIT TODO</legend>
            <label>Title</label>
            <input type="text" class="form-control" id="title-edit" value="${data.title}">
            <label>Description</label>
            <input type="text" class="form-control" id="desc-edit" value="${data.description}">
            <label>Due Date</label><br>
            <input type="date" id="date-edit" value="${moment(data.due_date).format('YYYY-MM-DD')}">
            <input type="submit" value="EDIT" class="btn btn-primary">`)
            $('#edit-form').show()
            localStorage.setItem('TodoId', data.id)
        }
    })
    .fail((err, txt) => {
        console.log(err, txt)
    })
}

function del(id){
    let confirmate = confirm('Are You Sure Want Delete This Todo?')
    if(confirmate){
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
            alert(err.responseJSON.message)
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
            alert(err.responseJSON.message)
        })
        .always(() => {
            $('#email-register').val('')
            $('#password-register').val('')
        })
    })

    //Log Out
    $('#logout').on('click', (e) => {
        e.preventDefault()
        localStorage.clear()
        logout()
        authenticate()
    })

    //ADD Todo
    $('#add-form').on('submit', (e) => {
        e.preventDefault()
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
            authenticate()
        })
        .fail((err, txt) => {
            alert(err.responseJSON.message.join(', '))
        })
        .always(() => {
            $('#title-todo').val("")
            $('#desc-todo').val("")
            $('#date-todo').val("")
        })
    })

    //Edit Todo
    $('#edit-form').on('submit', (e) => {
        e.preventDefault()
        let id = localStorage.getItem('TodoId')
        let title = $("#title-edit").val()
        let description = $("#desc-edit").val()
        let due_date = $("#date-edit").val()
        $.ajax({
            url: baseUrl + `todos/${id}`,
            method: 'PUT',
            headers: {accessToken: localStorage.getItem('accessToken')},
            data: {id, title, description, due_date}
        })
        .done(() => {
            authenticate()
        })
        .fail((err, txt) => {
            alert(err.responseJSON.message.join(', '))
        })
        .always(() => {
            $('#title-todo').val("")
            $('#desc-todo').val("")
            $('#date-todo').val("")
        })
    })
    // Holidays

    $('#holiday-nav').on('click',(e) => {
        $('#main').hide()
        $('#holiday').show()
        e.preventDefault()
        $.ajax({
            url: baseUrl + 'todos/seeHolidays',
            method: 'GET',
        })
        .done(response => {
            $('#holiday-list').empty()
            response.forEach((el) => {
                $('#holiday-list').append(`
                <tr style="text-align: center; font-weight: bold; color: red">
                    <td>${moment(el.date.iso).format('DD-MMMM-YYYY')}</td>
                    <td>${el.name}</td>
                </tr>`
                )
            })
        })
        .fail((err, txt) => {
            console.log(err, txt)
        })
    })
})
