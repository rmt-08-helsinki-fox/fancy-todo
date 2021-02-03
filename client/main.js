$(document).ready(function () {
    auth()
    $('#form-login').on("submit", (e) => {
        e.preventDefault();
        login()
    });
    $('#logout').click(function () {
        logout()
    });
});

const base_url = "http://localhost:3000/"

function auth() {
    if (!localStorage.getItem('access_token')) {
        $('#welcoming').hide()
        $('#form-login').show()
        $('#home').hide()
        $('#todoList').hide()
    } else {
        findAllTodo()
        $('#welcoming').show()
        $('#form-login').hide()
        $('#home').show()
        $('#todoList').show()
    }
}

function login() {
    $.ajax({
        url: base_url + "users/signin",
        method: 'post',
        data: {
            email: $('#email').val(),
            password: $('#password').val()
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            localStorage.setItem('email', $('#email').val())
            $('#email').val('')
            $('#password').val('')
            $('#welcoming').text(localStorage.getItem('email'))
            $('#clearfindTodo').remove()
            auth()
        })
        .fail(err => {
            console.log(err, "ini error")
        })
}

function logout() {
    localStorage.clear()
    $('#clearfindTodo').remove()
    $('#welcoming').empty()
    auth()
}

function findAllTodo() {
    $.ajax({
        url: base_url + "todos",
        method: 'get',
        headers: {
            token: localStorage.getItem('access_token')
        }
    })
        .done(data => {
            console.log(data.data)
            for (let i of data.data) {
                $('#todoList').append(`
                <tr id='clearfindTodo'>
                    <th>${i.title}</th>
                    <th>${i.description}</th>
                    <th>${i.status}</th>
                    <th>${i.due_date.slice(0, 10)}</th>
                </tr>
            `)
            }
        })
        .fail(err => {
            console.log(err)
        })
}