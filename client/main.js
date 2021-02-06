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

    $("logout-button").on("click", (e) => {
        e.preventDefault()
        logout()
    })

    $("register-button").on("click", (e) => {
        e.preventDefault()
        showRegisterForm()
    })

    $("login-button").on("click", (e) => {
        e.preventDefault()
        auth()
    })
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
    if (localStorage.getItem("access_token")) {
        $("#login").show()
        $("#register").hide()
        $("#todolist").hide()
    } else {
        $("#login").hide()
        $("#register").hide()
        $("#todolist").show()
    }
}

function showRegisterForm() {
    $("#register").show()
    $("#login").hide()
    $("#todolist").hide()
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
            console.log(data)
            localStorage.setItem("access_token", data.access_token)
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
        .always(_ => {
            console.log("asdfasdf")
            $("#login-form").trigger("reset")
        })
}

function register() {
    const email = $('#register-email').val();
    const password = $('#registe-password').val();

    $.ajax({
        url: baseURL + "/users/register",
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done((response) => {
            $('#login-mail').val(email)
            $('#login-password').val(password)
            login()
        })
        .fail((xhr, text) => {
            console.log({ xhr, text });
        })
        .always(_ => {
            $('#registe-email').val("")
            $('#register-password').val("")
        })
}

function logout() {
    localStorage.removeItem("access_token")
    auth()
}

function showTodoList() {
    $.ajax({
        url: baseURL + "/todos",
        method: "GET",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(response => {
            response.forEach(el => {
                $("#todolist").append(`
                <div id="todotable"></div>
                <table>
                  <tr>
                    <th>#</th>
                    <th>To do List</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Due Date</th>
                  </tr>
                  <tr>
                    <td>${el.id}</td>
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td>${el.status}</td>
                    <td>${el.due_date}</td>
                  </tr>
                </table>
              </div>`)
            })
            $("#todolist").show(500)
        })
        .fail((xhr, text) => {
            console.log({ xhr, text });
        })

}





