const baseUrl = "http://localhost:3000/"

$(document).ready(() => {
    auth()
    $("#login-form").on("submit", (e) => {
        e.preventDefault()
        login()
    })

    $("#register-form").on("submit", (e) => {
        e.preventDefault()
        register()
    })

    $("#logout-button").on("click", (e) => {
        e.preventDefault()
        logout()
    })

    $("#register-button").on("click", (e) => {
        e.preventDefault()
        showRegisterForm()
    })

    $("#login-button").on("click", (e) => {
        e.preventDefault()
        auth()
    })

    $("#create-button").on("click"), (e) => {
        e.preventDefault()
        showCreateForm()
    }

    $("#create-form").on("submit"), (e) => {
        e.preventDefault()
        createTodo()
    }

    $("#delete-action").on("click", (e) => {
        e.preventDefault()
        deleteTodo()
    })

    $("#edit-action").on("click", (e) => {
        e.preventDefault()
        showEditForm()
    })

    $("#edit-form").on("submit"), (e) => {
        e.preventDefault()
        editTodo()
    }
})

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token

    $.ajax({
        url: baseURL + '/users/googleLogin',
        method: "POST",
        data: {
            googleToken: id_token
        }
    })
        .done((response) => {
            localStorage.setItem("access_token", response.access_token)
            checkToken()
        })
        .fail((xhr, text) => {
            console.log({ xhr, text });
        })
}

function auth() {
    if (!localStorage.getItem("access_token")) {
        $("#login").show()
        $("#register").hide()
        $("#todolist").hide()
        $("#create-form").hide()
        $("#edit-form").hide()
    } else {
        $("#login").hide()
        $("#register").hide()
        $("#todolist").show()
        $("#create-form").hide()
        $("#edit-form").hide()
    }
}

function showRegisterForm() {
    $("#register").show()
    $("#login").hide()
    $("#todolist").hide()
    $("#create-form").hide()
    $("#edit-form").hide()
}

function showCreateForm() {
    $("#login").hide()
    $("#register").hide()
    $("#todolist").hide()
    $("#create-form").show()
    $("#edit-form").hide()
}

function showEditForm() {
    $("#login").hide()
    $("#register").hide()
    $("#todolist").hide()
    $("#create-form").hide()
    $("#edit-form").show()
}


function login() {
    const email = $("#login-email").val()
    const password = $("#login-password").val()

    $.ajax({
        url: baseUrl + "users/login",
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done(data => {
            console.log("ini di dataaa")
            localStorage.setItem("access_token", data.access_token)
            auth()
        })
        .fail((xhr, text) => {
            console.log("testttttt")
            console.log(xhr, text)
        })
        .always(_ => {
            console.log("asdfasdf")
            $("#login-form").trigger("reset")
        })
}

function register() {
    const email = $('#register-email').val();
    const password = $('#register-password').val();
    console.log(email, password)

    $.ajax({
        url: baseURL + "/users/register",
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done((response) => {
            $('#register-mail').val(email)
            $('#register-password').val(password)
            login()
        })
        .fail((xhr, text) => {
            console.log({ xhr, text });
        })
        .always(_ => {
            $('#register-email').val("")
            $('#register-password').val("")
        })
}

function logout() {
    localStorage.removeItem("access_token")
    auth()
}

function showTodoList() {
    $.ajax({
        url: baseUrl + "/todos/:id",
        method: "GET",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(response => {
            console.log(response)
            response.forEach(el => {
                $("#todotable").append(`
                <td>${el.id}</td>
            <td>${el.title}</td>
            <td>${el.description}</td>
            <td>${el.status}</td>
            <td>${el.due_date}</td>`)
            })
            $("#todolist").show(500)
        })
        .fail((xhr, text) => {
            console.log({ xhr, text });
        })

}

function createTodo() {
    $.ajax({
        url: baseUrl + "/todos/create",
        method: "POST",
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(response => {
            $('#title').val(title)
            $('#description').val(description)
            $('#due_date').val(due_date)
            auth()
        })
        .fail((xhr, text) => {
            console.log({ xhr, text })
        })
}

function deleteTodo(id) {
    $.ajax({
        url: baseUrl + "todos/delete/" + id,
        method: "DELETE",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done((_) => {
            showTodoList()
        })
        .fail((xhr, text) => {
            console.log({ xhr, text })
        })
}

function editTodo(id) {
    $.ajax({
        url: baseUrl + "todos/edit/" + id,
        method: "PUT",
        data: {
            title,
            description,
            status,
            due_date,
        }
    })
        .done((_) => {
            $('#edit-title').val(title)
            $('#edit-description').val(description)
            $('#edit-due_date').val(due_date)
            auth()
        })
        .fail((xhr, text) => {
            console.log({ xhr, text })
        })
}



