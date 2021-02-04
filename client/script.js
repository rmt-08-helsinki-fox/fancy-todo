let baseUrl = "http://localhost:3000"; //id pake kebab case, jangan pake onclick di html
//benerin controller ud ngasihnya dalam object(done)//edit buton rusak

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
    $("#add-to-do").on("click", () => {
        addToDo();
    })
    $("#logout").on("click", () => {
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
        $("#login-form").show();
        $("#register-form").hide();
        $("#add-to-do-form").hide();
        $("#todo-list").hide();
        $("#edit-to-do-form").hide();
        $("#add-to-do").hide();
        $("#logout").hide();
    } else {
        $("#login-form").hide();
        $("#register-form").hide();
        $("#add-to-do-form").hide();
        $("#edit-to-do-form").hide();
        $("#todo-list").show();
        $("#add-to-do").show();
        $("#logout").show();
        findAllToDO();
    }
}

function showRegister(){
    $("#login-form").hide();
    $("#register-form").show();
    $("#loginError").remove();
    // $("#loginError").removeAttr("class");
}

function showEdit(){
    $("#todo-list").hide();
    $("#edit-to-do-form").show();
}

function addToDo(){
    $("#todo-list").hide();
    $("#add-to-do-form").show();
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
        // $("#loginError").attr("class", "alert alert-danger");
        xhr.responseJSON.errors.forEach(err => {
            $("#loginError").append(`<li>${err}</li>`);
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
        $("#registerError").remove();
        $("#register-form").append(`<div class="alert alert-danger" id="registerError"></div>`);
        // $("#registerError").attr("class", "alert alert-danger");
        xhr.responseJSON.errors.forEach(err => {
            $("#registerError").append(`<li>${err}</li>`);
        });
        // console.log(xhr.responseJSON.errors, text)
    })
    .always(() => $("#register-form").trigger("reset"));
}

function backRegister() {
    $("#registerError").remove();
    // $("#registerError").removeAttr("class");
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
        todos.forEach(todo => {
            $("#todo-list").append(`
            <div class="card" id="todo-${todo.id}" style="min-width: 20em">
                <div class="card-body">
                    <h3>${todo.title}</h3>
                    <p>${todo.description || "No Description"}</p>
                    <div id="todo${todo.id}status" class="btn btn-info" onclick="update(${todo.id})">${todo.status}</div>
                    <b>Due date: ${todo.due_date.split('T')[0]}</b>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" onclick="populateEdit(${todo.id})">Edit</button>
                    <button class="btn btn-primary" onclick="news(${todo.id})">News</button>
                    <button class="btn btn-primary" onclick="remove(${todo.id})">Delete</button>
                </div>
            </div>
            `)
        })
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
            $("#done-edit").attr("checked", "true");
        } else {
            $("#notdone-edit").attr("checked", "true")
        }
        $("#due-date-edit-to-do").val(todo.due_date.split("T")[0]);
        // $("#submitButtonEdit").attr("onclick", submitEdit(id));
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
        // console.log(xhr);
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
    // view();
    $(`#todo-${id}`).append(`<div class="spinner-border text-primary" id="loadNews"></div>`)
    $.ajax({
        url: baseUrl + "/todos/" + id + "/news",
        method: "GET",
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .done(({ news }) => {
        $(`#todo-${id}`).append(`
        <h3>${news.title}</h3>
        <p>${news.abstract}</p>
        <a href="${news.web_url}">Read More</a>
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