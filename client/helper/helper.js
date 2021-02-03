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

function login() {
    $.ajax({
        url: base_url + "users/signin",
        method: 'post',
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response)
            $('#username').val('')
            $('#password').val('')
            $('#email').val('')
            auth()
            // console.log(response, 'ini berhasil')
        })
        .fail(err => {
            console.log(err, "ini error")
        })
}

function auth() {
    if (!localStorage.getItem('access_token')) {
        console.log(localStorage.getItem('access_token'), 'ini kosong')
        $('#form-login').show()
        $('#home').hide()
        $('#findAll').hide()
    } else {
        console.log(localStorage.getItem('access_token'), 'ini isi')
        $('#form-login').hide()
        $('#home').show()
        findAll()
        $('#findAll').show()
    }
}

function logout() {
    localStorage.clear()
    console.log('ini logout')
    $('#findAll').empty()
    auth()
}

function findAll() {
    $.ajax({
        url: base_url + "todos",
        method: 'get',
        headers: {
            token: localStorage.getItem('access_token')
        }
    })
        .done(data => {
            for (let i of data.data) {
                $('#findAll').append(`
                <tr>
                    <th>${i.title}</th>
                    <th>${i.description}</th>
                    <th>${i.status}</th>
                    <th>${i.due_date.slice(0, 10)}</th>
                </tr>
            `)
            }
        })
}