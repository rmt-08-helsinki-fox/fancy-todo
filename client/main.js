$(document).ready(function () {
    auth()
    $('#form_register').on("submit", (e) => {
        e.preventDefault();
        register()
    });
    $('#form_login').on("submit", (e) => {
        e.preventDefault();
        login()
    });
    $('#logout').click(function () {
        logout()
    });
    $('#form_Add').on("submit", (e) => {
        e.preventDefault()
        addtodo()
    });
    $('#form_Edit').on("submit", (e) => {
        e.preventDefault()
        edittodo()
    });
    $('#form_EditStatus').on("submit", (e) => {
        e.preventDefault()
        editStatusPatch()
    });
    $('#triggerForm_addTodo').click(function () {
        formtodo()
    });
    $('#cancelAdd').click(function (e) {
        e.preventDefault()
        auth()
    });
    $('#cancelEdit').click(function (e) {
        e.preventDefault()
        auth()
    });
    $('#cancelEditStatus').click(function (e) {
        e.preventDefault()
        auth()
    });
    $('#LoginPage').click(function () {
        $('#form_login').show()
        $('#form_register').hide()
    });
    $('#RegisterPage').click(function () {
        $('#form_login').hide()
        $('#form_register').show()
    });
});

const base_url = "http://localhost:3000/"

function auth() {
    $('#clearfindTodo').remove()
    $('#welcoming').text(localStorage.getItem('email'))
    if (!localStorage.getItem('access_token')) {
        $('#welcoming').hide()
        $('#form_login').show()
        $('#form_register').hide()
        $('#home').hide()
        $('#todoList').hide()
        $('#form_Add').hide()
        $('#form_Edit').hide()
        $('#LoginPage').show()
        $('#RegisterPage').show()
        $('#form_EditStatus').hide()
    } else {
        findAllTodo()
        $('#welcoming').show()
        $('#form_login').hide()
        $('#form_register').hide()
        $('#home').show()
        $('#todoList').show()
        $('#form_Add').hide()
        $('#form_Edit').hide()
        $('#form_EditStatus').hide()
        $('#LoginPage').hide()
        $('#RegisterPage').hide()
        $('#form_EditStatus').hide()
        $('#triggerForm_addTodo').show()
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
            auth()
        })
        .fail(err => {
            console.log(err, "ini error")
        })
}

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.clear()
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
                let stat
                if (i.status === true) stat = "done"
                if (i.status === false) stat = "not done"
                $('#todoList').append(`
                <tr id='clearfindTodo'>
                    <th>${i.title}</th>
                    <th>${i.description}</th>
                    <th>${stat}</th>
                    <th>${i.due_date.slice(0, 10)}</th>
                    <th>
                        <a href="#" onclick="deleteTodo(${i.id})">Delete</a>
                        <a href="#" onclick="editAll(${i.id})">EditAll</a>
                        <a href="#" onclick="editStatus(${i.id})">EditStatus</a>
                    </th>
                </tr>
            `)
            }
        })
        .fail(err => {
            console.log(err)
        })
}

function formtodo() {
    $('#clearfindTodo').remove()
    $('#triggerForm_addTodo').hide()
    $('#todoList').hide()
    $('#form_Add').show()
}

function addtodo() {
    console.log('masuk add')
    $.ajax({
        url: base_url + "todos",
        method: 'post',
        headers: {
            token: localStorage.getItem('access_token')
        },
        data: {
            title: $('#title').val(),
            description: $('#description').val(),
            status: $('#status').val(),
            due_date: $('#due_date').val()
        }
    })
        .done(success => {
            $('#title').val('')
            $('#description').val('')
            $('#status').val('')
            $('#due_date').val('')
            auth()
        })
        .fail(err => {
            console.log(err)
        })
}

function deleteTodo(id) {
    $('#clearfindTodo').remove()
    console.log(base_url + "todos/" + id);
    $.ajax({
        url: base_url + "todos/" + id,
        method: "delete",
        headers: {
            token: localStorage.getItem('access_token')
        }
    })
        .done(success => {
            console.log('berhasil hapus')
            auth()
        })
        .fail(err => {
            console.log(err, 'tidak berhasil delete')
        })
}

function editAll(id) {
    console.log(id, 'ini id edit ya anjenk')
    $.ajax({
        url: base_url + "todos/" + id,
        method: "get",
        headers: {
            token: localStorage.getItem('access_token')
        }
    })
        .done(success => {
            console.log(success)
            $('#titleEdit').val(success.title)
            $('#descriptionEdit').val(success.description)
            $('#statusEdit select').val(success.status)
            $('#due_dateEdit').val(success.due_date.slice(0, 10))
            localStorage.setItem('idTodoEdit', success.id)
        })
        .fail(err => {
            console.log(err)
        })
    $('#clearfindTodo').remove()
    $('#triggerForm_addTodo').hide()
    $('#todoList').hide()
    $('#form_Edit').show()
}

function edittodo() {
    console.log('ini trigger edit')
    $.ajax({
        url: base_url + "todos/" + localStorage.getItem('idTodoEdit'),
        method: 'put',
        headers: {
            token: localStorage.getItem('access_token')
        },
        data: {
            title: $('#titleEdit').val(),
            description: $('#descriptionEdit').val(),
            status: $('#statusEdit').val(),
            due_date: $('#due_dateEdit').val()
        }
    })
        .done(success => {
            console.log(success)
            auth()
        })
        .fail(err => {
            console.log(err)
        })
    localStorage.removeItem('idTodoEdit')
}

function editStatus(id) {
    console.log('ini edit Status')
    $.ajax({
        url: base_url + "todos/" + id,
        method: "get",
        headers: {
            token: localStorage.getItem('access_token')
        }
    })
        .done(success => {
            $('#statusEditing select').val(success.status)
            $('#EditStatusTitle').text(success.title)
            localStorage.setItem('idTodoEdit', success.id)
        })
        .fail(err => {
            console.log(err)
        })
    $('#clearfindTodo').remove()
    $('#triggerForm_addTodo').hide()
    $('#todoList').hide()
    $('#form_EditStatus').show()
}

function editStatusPatch() {
    $.ajax({
        url: base_url + "todos/" + localStorage.getItem('idTodoEdit'),
        method: 'patch',
        headers: {
            token: localStorage.getItem('access_token')
        },
        data: {
            status: $('#statusEditing').val()
        }
    })
        .done(success => {
            console.log(success)
            auth()
        })
        .fail(err => {
            console.log(err)
        })
    localStorage.removeItem('idTodoEdit')
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: base_url + 'users/googlesignin',
        method: 'post',
        data: {
            googleToken: id_token
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            localStorage.setItem('email', $('#email').val())
            $('#email').val('')
            $('#password').val('')
            auth()
        })
        .fail(err => {
            console.log(err, "ini error")
        })
}

function onSignUp(googleUser) {
    console.log('ini google SignUp')
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: base_url + 'users/googlesignup',
        method: 'post',
        data: {
            googleToken: id_token
        }
    })
        .done(response => {
            localStorage.clear()
            auth()
            // console.log(JSON.stringify(response))
        })
        .fail(err => {
            console.log(err)
        })
}

function register() {
    console.log('ini register')
    $.ajax({
        url: base_url + 'users/signup',
        method: 'post',
        data: {
            email: $('#emailRegister').val(),
            password: $('#passwordRegister').val()
        }
    })
        .done(success => {
            localStorage.clear()
            auth()
        })
        .fail(err => {
            console.log(err)
        })
    $('#emailRegister').val('')
    $('#passwordRegister').val('')
    $('#email').val('')
    $('#password').val('')
}