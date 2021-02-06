const base_url = "http://localhost:3000/"

function checkAcessToken() {
    getWeather() 
    if (!localStorage.getItem("access_token")) {
        $("#login-container").show()
        $("#register-container").hide()
        $("#list-todo").hide()
        $('#logout-link').hide()
        $('#register-link').show()
        $('#login-link').hide()
        $('#add-todo-link').hide()
        $('#add-container').hide()
        $('#edit-container').hide()
    } else {
        $("#login-container").hide()
        $("#register-container").hide()
        $("#list-todo").show()
        $('#login-link').hide()
        $('#logout-link').show()
        $('#register-link').hide()
        $('#add-todo-link').show()
        $('#add-container').hide()
        $('#edit-container').hide()
        getTodos()
    }
}

function registerLink() {
    $("#register-container").show()
    $("#login-container").hide()
    $('#login-link').show()
    $('#register-link').hide()
}

function loginLink() {
    $("#register-container").hide()
    $("#login-container").show()
    $('#login-link').hide()
    $('#register-link').show()
}

function editLink() {
    $("#add-container").hide()
    $("#list-todo").hide()
    $('#edit-container').show()
    $('#add-todo-link').hide()
}

function addTodoLink() {
    $('#add-error').text("")
    $("#add-container").show()
    $("#list-todo").hide()
    $('#edit-container').hide()
    $('#add-todo-link').hide()
}

function myTodoLink() {
    checkAcessToken()
}

function register() {
    const email = $("#register-email").val()
    const password = $("#register-password").val()
    console.log(email, password)

    $.ajax({
    url: base_url + "users/register",
    method: "POST",
    data: {
        email,
        password
    }
    })

    .done(response => {
    loginLink()
    })

    .fail((xhr, errortext) => {
    let errorString = ""
    xhr.responseJSON.message.forEach((element) => {
        errorString += element
        errorString += '<br>'
    })
    $('#register-error').html(errorString)
    console.log(xhr.responseJSON.message)
    })

    .always( () => {
    console.log("always")
    $("#register-form").trigger("reset")
    })
}

function login() {
    const email = $("#login-email").val()
    const password = $("#login-password").val()

    $.ajax({
    url: base_url + "users/login",
    method: "POST",
    data: {
        email,
        password
    }
    })
    .done(response => {
    console.log(response)
    localStorage.setItem("access_token", response.access_token)
    checkAcessToken()
    })

    .fail((xhr, errortext) => {
    console.log(xhr.responseJSON.message, errortext)
    $('#login-error').text(xhr.responseJSON.message)
    })

    .always( () => {
    console.log("always")
    $("#login-form").trigger("reset")
    })
}

function logout() {
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
    $("#list-todo").empty()
    checkAcessToken()
}

function getTodos() {
    $.ajax({
    url: base_url + "todos",
    method: 'GET',
    headers: {
        access_token: localStorage.getItem("access_token")
    }
    })

    .done(response => {
    $('#list-todo').empty()
    if (response.length === 0) {
        $('#list-todo').append("<h1>You don't have any todo</h1>")
    } else {
        $('#list-todo').append("<h1>Your list todo:</h1>")
    }
    response.forEach((element) => {
        if (element.status === false) {
        $("#list-todo").append(`
            <div class="todo">
            <p class="title">Title: ${element.title}</p>
            <p><b>Description</b>: ${element.description}</p>
            <p><b>Due Date</b>: ${element.due_date.split("T")[0]}</p>
            <button onclick="editTodoForm(${element.id})" >Edit</button>
            <button onclick="deleteTodo(${element.id})">Delete</button>
            <p><b>Status</b>: <span id="id-${element.id}">unfinished</span></p>
            <button onclick="editStatus(${element.id})">Change Status</button>
            </div>
        `)
        } else {
        $("#list-todo").append(`
            <div class="todo">
            <p class="title">Title: ${element.title}</p>
            <p><b>Description</b>: ${element.description}</p>
            <p><b>Due Date</b>: ${element.due_date.split("T")[0]}</p>
            <button onclick="editTodoForm(${element.id})" >Edit</button>
            <button onclick="deleteTodo(${element.id})">Delete</button>
            <p><b>Status</b>: <span id="id-${element.id}">finished</span></p>
            <button onclick="editStatus(${element.id})">Change Status</button>
            </div>
        `)
        }
        
    })
    })

    .fail((xhr, errortext) => {
    console.log(xhr.responseJSON.message, errortext)
    })

    .always(() => {
    console.log("always")
    })
}

function addTodo() {
    const title = $("#title").val()
    const description = $("#description").val()
    const due_date = $("#due_date").val()

    $.ajax({
    url: base_url + "todos",
    method: "POST",
    headers: {
        access_token: localStorage.getItem("access_token")
    },
    data: {
        title,
        description,
        due_date
    }
    })

    .done(response => {
    $("#list-todo").empty()
    $("#add-error").text("")
    checkAcessToken()
    })

    .fail((xhr, errortext) => {
    let errorString = ""
    xhr.responseJSON.message.forEach((element) => {
        errorString += element
        errorString += '<br>'
    })
    $('#add-error').html(errorString)
    console.log(xhr.responseJSON.message)
    })

    .always( () => {
    console.log("always")
    $("#add-form").trigger("reset")
    })
}

function deleteTodo(id) {
    $.ajax({
    url: base_url + `todos/${id}`,
    method: 'DELETE',
    headers: {
        access_token: localStorage.getItem("access_token")
    }
    })

    .done(response => {
    $("#list-todo").empty()
    checkAcessToken()
    })

    .fail((xhr, errortext) => {
    console.log(xhr.responseJSON.message)
    })

    .always(() => {
    console.log("always")
    })
}

let idTodo = 0;

function editTodoForm(id) {
    $.ajax({
    url: base_url + `todos/${id}`,
    method: 'GET',
    headers: {
        access_token: localStorage.getItem("access_token")
    }
    })

    .done(response => {
    $("#edit-error").html("")
    console.log(response)
    idTodo = response.id;
    $("#edit-title").val(response.title)
    $("#edit-description").val(response.description)
    $("#edit-due_date").val(response.due_date.split('T')[0])
    editLink()
    })

    .fail((xhr, errortext) => {
    console.log(xhr.responseJSON.message, errortext)
    })

    .always(() => {
    console.log("always")
    })
}

function editTodo(idTodo) {
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
    const due_date = $("#edit-due_date").val()
    $.ajax({
    url: base_url + `todos/${idTodo}`,
    method: 'PUT',
    headers: {
        access_token: localStorage.getItem("access_token")
    },
    data: {
        title,
        description,
        due_date
    }
    })

    .done(response => {
    idTodo = 0
    $("#list-todo").empty()
    checkAcessToken()
    })

    .fail((xhr, errortext) => {
    let errorString = ""
    xhr.responseJSON.message.forEach((element) => {
        errorString += element
        errorString += '<br>'
    })
    $('#edit-error').html(errorString)
    console.log(xhr.responseJSON.message)
    })

    .always(() => {
    console.log("always")
    $("#edit-form").trigger("reset")
    })
}

function editStatus(id) {
    let status = $(`#id-${id}`).text()
    let newStatus;
    status == "unfinished" ? newStatus = true : newStatus =  false

    $.ajax({
    url: base_url + `todos/${id}`,
    method: 'PATCH',
    headers: {
        access_token: localStorage.getItem("access_token")
    },
    data: {
        status: newStatus
    }
    })

    .done(response => {
    $("#list-todo").empty()
    checkAcessToken()
    })

    .fail((xhr, errortext) => {
    console.log(xhr, errortext)
    })

    .always(_ => {
    console.log("always")
    })
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
    url: base_url + "users/googlelogin",
    method: "POST",
    data: {
        googleToken: id_token
    }
    })

    .done(response => {
    localStorage.setItem("access_token", response.access_token)
    checkAcessToken()
    })

    .fail(err => {
    console.log(err)
    })
}

function getWeather() {
    if (navigator.geolocation) { //check if geolocation is available
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
        });   
    }

    $.ajax({
    url: base_url + 'weather',
    method: 'POST',
    data: {
        city: 'jakarta'
    }
    })

    .done(response => {
    $("#weather-container").empty()
    console.log(response)
    $("#weather-container").append(`
        <h2>${response.city}</h2>
        <h3>${response.temperature}℃</h3>
        <img src="${response.icons[0]}">
    `)
    })

    .fail((xhr, errortext) => {
    console.log(errortext)
    })

    .always(_ => {
    console.log("always")
    })
}


$(document).ready(() => {
    checkAcessToken() 
    $("#login-form").on("submit", (element) => {
    element.preventDefault()
    login()
    })

    $("#register-form").on("submit", (element) => {
    element.preventDefault()
    register()
    })

    $("#add-form").on("submit", (element) => {
    element.preventDefault()
    addTodo()
    })
    
    $("#edit-form").on("submit", (element) => {
    element.preventDefault()
    editTodo(idTodo)
    })
})