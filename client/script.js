let baseUrl = "http://localhost:3000";

$(document).ready(function() {
    view();

    $("#loginForm").on("submit", (e) => {
        e.preventDefault();
        
        login();
    })
    $("#registerForm").on("submit", (e) => {
        e.preventDefault();

        register();
    })
    $("#addToDoForm").on("submit", (e) => {
        e.preventDefault();

        add();
    })
})

function view(){
    if(!localStorage.getItem("token")){
        $("#loginForm").show();
        $("#registerForm").hide();
        $("#addToDoForm").hide();
        $("#todoList").hide();
        $("#editToDoForm").hide();
    } else {
        $("#loginForm").hide();
        $("#registerForm").hide();
        $("#addToDoForm").hide();
        $("#editToDoForm").hide();
        $("#todoList").show();
        findAllToDO();
    }
}

function showRegister(){
    $("#loginForm").hide();
    $("#registerForm").show();
}

function showEdit(){
    $("#todoList").hide();
    $("#editToDoForm").show();
}

function addToDo(){
    $("#todoList").hide();
    $("#addToDoForm").show();
}

function login(){
    let email = $("#loginEmail").val();
    let password = $("#loginPassword").val();
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
        $("#loginError").empty();
        xhr.responseJSON.errors.forEach(err => {
            $("#loginError").append(err);
        });
        // console.log(xhr.responseJSON.errors, text)
    })
    .always(() => $("#loginForm").trigger("reset"));
}

function register(){
    let email = $("#registerEmail").val();
    let password = $("#registerPassword").val();
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
        $("#registerError").empty();
        xhr.responseJSON.errors.forEach(err => {
            $("#registerError").append(err);
        });
        // console.log(xhr.responseJSON.errors, text)
    })
    .always(() => $("#registerForm").trigger("reset"));
}

function findAllToDO(){
    $.ajax({
        url: baseUrl + "/todos",
        method: "GET",
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .done((todos) => {
        console.log(todos);
        $("#todoList").empty();
        todos.forEach(todo => {
            $("#todoList").append(`
            <div class="row">
                <div class="col-sm" id="todo-${todo.id}">
                    <h3>${todo.title}</h3>
                    <p>${todo.description || "No Description"}</p>
                    ${todo.status}
                    <b>Due date: ${todo.due_date.split('T')[0]}</b>
                    <button class="btn btn-primary" onclick="edit(${todo.id})">Edit</button>
                    <button class="btn btn-primary" onclick="update(${todo.id})">Done</button>
                    <button class="btn btn-primary" onclick="news(${todo.id})">News</button>
                    <button class="btn btn-primary" onclick="remove(${todo.id})">Delete</button>
                </div>
            </div>
            `)
        })
    })
    .fail((xhr, text) => console.log(xhr, text))
}

function edit(id) {
    $.ajax({
        url: baseUrl + "/todos/" + id,
        method: "GET",
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .done(todo => {
        console.log(todo.due_date.split("T")[0]);

        $("#titleEditToDo").val(todo.title);
        $("#descEditToDo").val(todo.description);
        if(todo.status === "done"){
            $("#doneEdit").attr("checked", "true");
        } else {
            $("#notdoneEdit").attr("checked", "true")
        }
        $("#dueDateEditToDo").val(todo.due_date.split("T")[0]);

        showEdit();
    })
}

function add(){
    let title = $("#titleAddToDo").val();
    let decription = $("#descAddToDo").val();
    let status = $("input[name='statusCreate']:checked").val();
    let due_date = $("#dueDateAddToDo").val();

    $.ajax({
        url: baseUrl + "/todos",
        method: "POST",
        headers: {
            token: localStorage.getItem("token")
        },
        data: {
            title,
            decription,
            status,
            due_date
        }
    })
    .done(() => view())
    .fail((xhr, text) => {
        $("#addToDoError").empty();
        xhr.responseJSON.errors.forEach(err => {
            $("#addToDoError").append(err);
        });
        console.log(xhr);
    })
    .always(() => $("#addToDoForm").trigger("reset"));
}

function update(id) {
    // console.log(status, setStatus);
    // let setStatus = "done";

    // if(status === "done") setStatus = "not done"
    // else setStatus = "done";
    // console.log(status);

    $.ajax({
        url: baseUrl + "/todos/" + id,
        method: "PATCH",
        headers: {
            token: localStorage.getItem("token")
        },
        data: {
            status: "done"
        }
    })
    .done(() => view())
    .fail((xhar, text) => console.log(xhar, text));
}

function news(id) {
    view();
    $.ajax({
        url: baseUrl + "/todos/" + id + "/news",
        method: "GET",
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .done(res => $(`#todo-${id}`).append(`
        <h3>${res.news.title}</h3>
        <p>${res.news.abstract}</p>
        <a href="${res.news.web_url}">Read More</a>
    `))
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
    .done()
}