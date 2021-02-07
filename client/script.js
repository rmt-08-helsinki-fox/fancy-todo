const base_url = 'http://localhost:3000'

$(document).ready(() =>{
    console.log('jalan disini')

    auth()
    $("#login-form").click("submit", (e) => {
        e.preventDefault()
        login()
    })
    $("#nav-register").click( (e) =>{ 
        $("#container-login").hide()
        $("#container-register").show()
        $("#nav-login").show()
        $("#nav-register").hide()
     
    })
    $("#nav-login").click( (e) =>{ 
        $("#container-login").show()
        $("#container-register").hide()
        $("#nav-login").hide()
        $("#nav-register").show()
     
    })

    $("#form-register").click("submit", (e => {
        e.preventDefault()
        register()
        
    }))

    $("#todo-form").click("submit", (e) =>{
        e.preventDefault()
        createTodo()
    })
    $("#nav-logout").click((e) =>{
        e.preventDefault()
        logout()
    })



})

function auth() {
    if(!localStorage.getItem("token")){
        $("#nav-logout").hide()
        $("#container-register").hide()
        $("#container-home").hide()
        $("#list-todo").hide()
        $("#nav-register").show()
        $("#container-login").show()
        $("#nav-login").hide()
    } else {
        $("#nav-logout").show()
        $("#container-register").hide()
        $("#container-home").show()
        $("#list-todo").show() 
        $("#nav-register").hide()
        $("#container-login").hide()
        $("#nav-login").hide()
        $("#weather-container").show()
        // weather()
        getTodo()

        
    }
}

function weather() {
    $.ajax({
        url : `${base_url}/weather`,
        method: "GET",
        headers: {
            token: localStorage.getItem("token")
        }
    })
        .done(response => {
            $("#weather-container").remove()
            $("#container-home").prepend(`
            <div class="row justify-content-center mt-7">
            <div class="col-md-5">
            <div id="weather-container">
                    <div class="weather-icon">
                        <img src="icons/${response.icon}.png"/>
                    </div>
                    <div id="temperature-value">
                        <p>${response.temperature}°<span>C</span></p>
                    </div>
                    <div class="temperature-description">
                        <p>Jakarta - ${response.description}</p>
                    </div>
                  </div>
                  </div>
                  </div>
            `)
        })
        .fail((xhr,text) => {
            console.log(xhr)
        })
}

function register() {
    const email = $("#email-register").val()
    const password = $("#password-register").val()

    $.ajax({
        url: `${base_url}/register`,
        method: 'POST',
        data: {
            email,
            password
        }
    })
        .done(response => {
            auth()
        })
        .fail((xhr,text) => {
            console.log(xhr)
        })
        .always(_ => {
            $("#form-register").trigger('reset')
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
        url : `${base_url}/googleLogin`,
        method: `POST`,
        data : {
            googleToken : id_token
        }
    })
        .done(response => {
            localStorage.setItem("token", response.token)
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr)
        })
}

function login () {
    const email = $("#login-email").val()
    const password = $("#login-password").val()

    $.ajax({
        url: `${base_url}/login`,
        method: "POST",
        data : {
            email,
            password
        }
    })
        .done(response => {
            // console.log(response)
            // console.log(response.accessToken)
            localStorage.setItem("token",response.accessToken)
            auth()
            // $("#nav-login").show()
            console.log(`masuk sini`)
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
        .always(_ =>{
            $("#login-form").trigger("reset")
        })
        
}
function createTodo() {
    const title = $("#form-title").val()
    const due_date = $("#form-date").val()
    const description = $("#form-description").val()
    console.log(title,due_date, description)
    $.ajax({
        url: `${base_url}/todos`,
        method: "POST",
        headers: {
            token: localStorage.getItem("token")
        },
        data : {
            title, 
            due_date,
            description
        }
    })
        .done(res => {
            // console.log(`masuk create`)
            //  console.log(res)
             $('#list-todo').prepend(`
             <div class="card" style="width: 18rem;" id="todo-list-${res.id}">
                    <div class="card-body">
                        <h5 id="title-${res.id}" value="${res.title}" class="card-title">${res.title}</h5>
                        <p id="descripion-${res.id}" value="${res.description}" class="card-text">${res.description}</p>
                        <p id="due-date-${res.id}" class="card-time">${res.due_date}</p>
                        <p id="status-${res.id}" class="card-time">${compareStatus(res.status)}</p>
                        <a href="#" id="edit-todo-${res.id}" onclick="editGetTodo(${res.id})" class="btn btn-primary">Edit</a>
                        <a href="#" id="statusEdit-todo-${res.id}" onclick="statusEdit(${res.id}, ${res.status})" class="btn btn-primary">Status Change</a>
                        <a href="#" id="remove-todo-${res.id}" onclick="remove(${res.id})" class="btn btn-primary">Delete</a>
                    </div>
                </div>`)
        })
        .fail((xhr, text) => {
            console.log(xhr,text)
        })
        .always(unknown => {
            $("#form-title").val("")
            $("#form-description").val("")
        })
}

function getTodo() {
    $.ajax({
        url: `${base_url}/todos`,
        method: "GET",
        headers : {
            token: localStorage.getItem("token")
        }
    })
        .done(response => {
            console.log(response)
            $("#list-todo").empty()
            response.forEach(e => {
                $("#list-todo").prepend(`
                <div class="card" style="width: 18rem;" id="todo-list-${e.id}">
                    <div class="card-body">
                        <h5 id="title-${e.id}" value="${e.title}" class="card-title">${e.title}</h5>
                        <p id="descripion-${e.id}" value="${e.description}" class="card-text">${e.description}</p>
                        <p id="due-date-${e.id}" class="card-time">${e.due_date}</p>
                        <p id="status-${e.id}" class="card-time">${compareStatus(e.status)}</p>
                        <a href="#" id="edit-todo-${e.id}" onclick="editGetTodo(${e.id})" class="btn btn-primary">Edit</a>
                        <a href="#" id="statusEdit-todo-${e.id}" onclick="statusEdit(${e.id}, ${e.status})" class="btn btn-primary">Status Change</a>
                        <a href="#" id="remove-todo-${e.id}" onclick="remove(${e.id})" class="btn btn-primary">Delete</a>
                    </div>
                </div>

                <div class="card" style="width: 18rem;" id="todo-list-${e.id}-edit">
                    <div class="card-body">
                        <form id="form-edit-${e.id}">
                        <input type="text" id="edit-title-${e.id}" value="${e.title}">
                        <input type="text" id="edit-description-${e.id}" value="${e.description}">
                        <input class="form-control" id="edit-date-${e.id}" type="date" value="${e.due_date}" id="form-date">
                        <button type="submit" id="edit-todo-${e.id}" onclick="editPost(${e.id})" class="btn btn-primary">Edit</button>
                        <button type="button" id="cancle-edit-${e.id}" onclick="auth()"class="btn btn-primary">Cancel</button> 
                        </form>
                    </div>
                </div>
                `)
                $(`#todo-list-${e.id}-edit`).hide()
            })
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
}
// last
function editPost(id) {
    const title = $(`#edit-title-${id}`).val()
    const description = $(`#edit-description-${id}`).val()
    const due_date = $(`#edit-date-${id}`).val()
    console.log(title,description,due_date)
    $.ajax({
        url: `${base_url}/todos/${id}`,
        method: 'PATCH',
        headers: {
            token: localStorage.getItem("token")
        },
        data :{
            title : $(`#edit-title-${id}`).val() ,
            description : $(`#edit-description-${id}`).val() ,
            due_date: $(`#edit-date-${id}`).val()
        }
    })
        .done(response => {
            console.log(`ini di post`)
            console.log(response)
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr,text)
        })

}


function editGetTodo (id) {

    $.ajax({
        url : `${base_url}/todos/${id}`,
        method: "GET",
        headers: {
            token : localStorage.getItem("token")
        }
    })
        .done(res => {
            console.log(res)

            let {title, description, due_date, status} = res
            console.log(title)
            $(`#todo-list-${res.id}-edit`).show()
            $(`#todo-list-${res.id}`).hide()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
    
    
}
function statusEdit(id, status) {
    if(status === true) {
        status = false
    } else {
        status = true
    }
    $.ajax({
        url :`${base_url}/todos/${id}`,
        method: "PATCH",
        headers: {
            token: localStorage.getItem("token")
        },
        data : {
            status
        }
    })
        .done(res => {
            console.log(res)
            $(`#todo-list-${res.id}`).remove()
            $(`#list-todo`).prepend(`
                <div class="card" style="width: 18rem;" id="todo-list-${res.id}">
                    <div class="card-body">
                        <h5 id="title-${res.id}" value="${res.title}" class="card-title">${res.title}</h5>
                        <p id="descripion-${res.id}" value="${res.description}" class="card-text">${res.description}</p>
                        <p id="due-date-${res.id}" class="card-time">${res.due_date}</p>
                        <p id="status-${res.id}" class="card-time">${compareStatus(res.status)}</p>
                        <a href="#" id="edit-todo-${res.id}" onclick="editGetTodo(${res.id})" class="btn btn-primary">Edit</a>
                        <a href="#" id="statusEdit-todo-${res.id}" onclick="statusEdit(${res.id}, ${res.status})" class="btn btn-primary">Status Change</a>
                        <a href="#" id="remove-todo-${res.id}" onclick="remove(${res.id})" class="btn btn-primary">Delete</a>
                    </div>
                </div>
                `)
        })
        .fail((xhr,text) =>{
            console.log(xhr, text)
        })
}
function remove (id) {
    $.ajax({
        url: `${base_url}/todos/${id}`,
        headers: {
            token: localStorage.getItem("token")
        },
        method: "DELETE"
    })
        .done(response => {
            console.log(`masuk sini`)
            $(`#todo-list-${id}`).remove()
            
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
}
function compareStatus(boolean) {
    if(boolean === true) {
        return `Completed`
    } else {
        return `Uncompleted`
    }
}
function logout () {
    localStorage.clear()
    auth()
}
