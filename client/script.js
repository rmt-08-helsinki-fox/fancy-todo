let baseUrl = "https://fancy-todo-rjo.herokuapp.com"; 

$(document).ready(function() {
    view();

    $("#login-form").on("submit", (e) => {
        e.preventDefault();
        
        login();
    });
    $("#register-form").on("submit", (e) => {
        e.preventDefault();
       
        register();
    });
    $("#add-to-do-form").on("submit", (e) => {
        e.preventDefault();

        add();
    });
    $("#add-to-do").on("click", (e) => {
        e.preventDefault();

        addToDo();
    })
    $("#logout").on("click", (e) => {
        e.preventDefault();

        logout();
    })
    $("#show-register-btn").on("click", () => {
        showRegister();
    })
    $("#back-register-btn").on("click", () => {
        backRegister();
    })
    $("#add-to-do-back").on("click", () => {
        backAdd();
    })
    $("#edit-to-do-back").on("click", () => {
        backEdit();
    })
})

function view(){
    if(!localStorage.getItem("token")){
        $("#login-container").show();
        $("#register-container").hide();
        $("#add-to-do-container").hide();
        $("#todo-list").hide();
        $("#edit-to-do-container").hide();
        $("#add-to-do").hide();
        $("#logout").hide();
    } else {
        $("#login-container").hide();
        $("#register-container").hide();
        $("#add-to-do-container").hide();
        $("#edit-to-do-container").hide();
        $("#todo-list").show();
        $("#add-to-do").show();
        $("#logout").show();
        findAllToDO();
    }
}

function showRegister(){
    $("#login-container").hide();
    $("#register-container").show();
    $("#loginError").remove();
}

function showEdit(){
    $("#todo-list").hide();
    $("#edit-to-do-container").show();
}

function addToDo(){
    $("#todo-list").hide();
    $("#add-to-do-container").show();
}

function login(){
    let email = $("#login-email").val();
    let password = $("#login-password").val();
    $.ajax({
        url: baseUrl + "/login",
        method: "POST",
        data: {
            email,
            password
        }
    })
    .done(({ token }) => {
        localStorage.setItem("token", token);
        view();
    })
    .fail((xhr, text) => {
        $("#loginError").remove();
        $("#login-form").append(`<div class="alert alert-danger" id="loginError"></div>`);
        xhr.responseJSON.errors.forEach(err => {
            $("#loginError").append(`${err}`);
        });
        // console.log(xhr.responseJSON.errors, text)
    })
    .always(() => $("#login-form").trigger("reset"));
}

function register(){
    let email = $("#register-email").val();
    let password = $("#register-password").val();
    $.ajax({
        url: baseUrl + "/register",
        method: "POST",
        data: {
            email,
            password
        }
    })
    .done(({ token }) => {
        localStorage.setItem("token", token);
        view();
    })
    .fail((xhr, text) => {
        $("#register-error").remove();
        $("#register-form").append(`<div class="alert alert-danger" id="register-error"></div>`);
        xhr.responseJSON.errors.forEach(err => {
            $("#register-error").append(`<li>${err}</li>`);
        });
    })
    .always(() => $("#register-form").trigger("reset"));
}

function backRegister() {
    $("#register-error").remove();
    view();
}

function findAllToDO(){
    $.ajax({
        url: baseUrl + "/todos",
        method: "GET",
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .done(({ todos }) => {
        $("#todo-list").empty();
        if(todos.length > 0) {
            todos.forEach(todo => {
                $("#todo-list").append(`
                <div class="card mb-3 p-3" id="todo-${todo.id}" style="min-width: 25em; max-width: 25em;">
                    <div class="card-body">
                        <h3>${todo.title}</h3>
                        <p>${todo.description || "No Description"}</p>
                        <div id="todo${todo.id}status" class="btn btn-info" onclick="update(${todo.id})">${todo.status}</div>
                        <b>Due date: ${todo.due_date.split('T')[0]}</b>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" onclick="populateEdit(${todo.id})">Edit</button>
                        <button class="btn btn-secondary" onclick="news(${todo.id})">News</button>
                        <button class="btn btn-danger" onclick="remove(${todo.id})">Delete</button>
                    </div>
                </div>
                `)
            })
        } else {
            $("#todo-list").append(`
            <div class="container mt-3 p-3">
                <h3>Your to do list will be displayed here</h3>
                <p>Start adding to do with the <b>Add To Do</b> link on Navigation Bar</p>
            </div>
            `)
        }
    })
    .fail((xhr, text) => console.log(xhr, text))
}

function populateEdit(id) {
    $.ajax({
        url: baseUrl + "/todos/" + id,
        method: "GET",
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .done(({ todo }) => {
        $("#title-edit-to-do").val(todo.title);
        $("#desc-edit-to-do").val(todo.description);
        if(todo.status === "done"){
            $("#done-edit").prop("checked", true);
        } else {
            console.log("not done");
            $("#notdone-edit").prop("checked", true)
        }
        $("#due-date-edit-to-do").val(todo.due_date.split("T")[0]);
        $("#edit-to-do-form").on("submit", (e) => {
            e.preventDefault();
    
            submitEdit(id)
        })

        showEdit();
    })
}

function submitEdit(id){
    let title = $("#title-edit-to-do").val();
    let description = $("#desc-edit-to-do").val();
    let status = $("input[name='statusEdit']:checked").val();
    let due_date = $("#due-date-edit-to-do").val();

    $.ajax({
        url: baseUrl + "/todos/" + id,
        method: "PUT",
        headers: {
            token: localStorage.getItem("token")
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
    .done(() => view())
    .fail((xhr, text) => {
        $("#editToDoError").remove();
        $("#edit-to-do-form").append(`<div id="editToDoError" class="alert alert-danger" role="alert" ></div>`);
        xhr.responseJSON.errors.forEach(err => {
            $("#editToDoError").append(`<li>${err}</li>`)
        });
    });
}

function backEdit() {
    $("#editToDoError").remove();
    view();
}

function add(){
    let title = $("#title-add-to-do").val();
    let description = $("#desc-add-to-do").val();
    let status = $("input[name='statusCreate']:checked").val();
    let due_date = $("#due-date-add-to-do").val();

    $.ajax({
        url: baseUrl + "/todos",
        method: "POST",
        headers: {
            token: localStorage.getItem("token")
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
    .done(() => view())
    .fail((xhr, text) => {
        $("#addToDoError").remove();
        $("#add-to-do-form").append(`<div id="addToDoError" class="alert alert-danger" role="alert" ></div>`);
        xhr.responseJSON.errors.forEach(err => {
            $("#addToDoError").append(`<li>${err}</li>`);
        });
    })
    .always(() => $("#add-to-do-form").trigger("reset"));
}

function backAdd() {
    $("#addToDoError").remove();
    view();
}

function update(id) {
    let setStatus;

    if($(`#todo${id}status`).text() === "done") setStatus = "not done"
    else setStatus = "done";
    console.log($(`#todo${id}status`).text());

    $.ajax({
        url: baseUrl + "/todos/" + id,
        method: "PATCH",
        headers: {
            token: localStorage.getItem("token")
        },
        data: {
            status: setStatus
        }
    })
    .done(() => view())
    .fail((xhar, text) => console.log(xhar, text));
}

function news(id) {
    $(`#news${id}`).remove();
    $(`#todo-${id}`).append(`<div class="spinner-border text-primary" id="loadNews" style="margin: auto"></div>`)
    $.ajax({
        url: baseUrl + "/todos/" + id + "/news",
        method: "GET",
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .done(({ news }) => {
        $(`#todo-${id}`).append(`
        <div id="news${id}">
            <h3>${news.title}</h3>
            <p>${news.abstract}</p>
            <a href="${news.web_url}" class="btn btn-primary" target="_blank">Read More</a>
        </div>
    `)
        $("#loadNews").remove();
    })
    .fail((xhr, text) => console.log(xhr, text));
}

function remove(id) {
    $.ajax({
        url: baseUrl + "/todos/" + id,
        method: "DELETE",
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .done(() => view())
    .fail((xhr, text) => console.log(xhr, text))
}

function logout(){
    $("#todo-list").empty();
    localStorage.removeItem("token");
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    view();
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        url: baseUrl + "/oAuth",
        method: "POST",
        data: {
            id_token
        }
    })
    .done(({ token }) => {
        localStorage.setItem("token", token);
        view();
    })
    .fail((xhr, text) => {
        console.log(xhr.responseJSON.errors, text)
    })
}