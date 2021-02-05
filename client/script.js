let baseUrl = 'http://localhost:3000'

function auth() {
    if(localStorage.accessToken){
        $("#register-page").hide()
        $("#login-page").hide()
        $("#add-page").hide()
        $("#main-page").show()
        $("#home-page").show()
        $("#todo-page").show()
        $("#edit").hide()
        getTodo()
    }else{
        $("#register-page").hide()
        $("#add-page").hide()
        $("#login-page").show()
        $("#main-page").hide()
        $("#home-page").hide()
        $("#todo-page").hide()
        $("#edit").hide()
    }
}

$(document).ready(function () {
    auth()
    $("#to-register").click(function(event) {
        event.preventDefault()
        $("#register-page").show()
        $("#login-page").hide()
        $("#main-page").hide()
        $("#home-page").hide()
        $("#todo-page").hide()
    })
})


$("#login-user").click(function(event) {
    event.preventDefault()
    let email = $("#email").val()
    let password = $("#password").val()
    $.ajax({
        method: "POST",
        url : baseUrl+`/users/login`,
        data : {
            email,
            password
        }
    })
    .done(res=>{
        localStorage.setItem("accessToken", res.accessToken)
        getTodo()
        $("#email").val("")
        $("#password").val("")
    })
    .fail(err=>{
        console.log(err);
    })
    .always(()=>{
        auth()
    })
})

$("#logout").click(function(event) {
    event.preventDefault()
    localStorage.clear()
    auth()
})

$("#register").click(function(event) {
    event.preventDefault()
    let email = $("#email").val()
    let password = $("#password").val()
    $.ajax({
        method: "POST",
        url : baseUrl+`/users/register`,
        data : {
            email,
            password
        }
    })
    .done(res=>{
        $("#register-page").hide()
        $("#login-page").show()
        $("#main-page").hide()
        $("#home-page").hide()
        $("#todo-page").hide()
        $("#email").val("")
        $("#password").val("")
    })
    .fail(err=>{
        console.log(err);
    })
})

function getTodo(params) {
    $.ajax({
        method: "get",
        url : baseUrl+`/todos`,
        headers : {
            token : localStorage.accessToken
        }
    })
    .done(res=>{
        $("todo-card").empty()
        res.forEach(element => {
            $("#todo-card").append(`
            <div class="card" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${element.description}</h6>
                      <h7 class="card-subtitle mb-2 text-muted">Status :${element.status}</h6><br>
                      <h7 class="card-subtitle mb-2 text-muted">Due date : :${element.due_date.slice(0,10)}</h6><br>
                      <a href="#" id="Edit" onclick="getId(${element.id},event)" class="card-link">Edit</a>
                      <a href="#" onclick="deletetodo(${element.id},event)" class="card-link">Delete</a>
                        </div>
                    </div>
            `)
        });
    })
    .fail(err=>{
        console.log(err);
    })
}

// function add() {
//         $("#register-page").hide()
//         $("#login-page").hide()
//         $("#add-page").show()
//         $("#main-page").hide()
//         $("#home-page").hide()
//         $("#todo-page").hide()
// // }

$("#add-todo").click(function(event) {
    event.preventDefault()
    $("#add-page").show()
    $("#register-page").hide()
    $("#login-page").hide()
    $("#main-page").hide()
    $("#home-page").hide()
    $("#todo-page").hide()
})

function addTodo(params) {
    $.ajax({
        method: "post",
        url : baseUrl+`/todos`,
        headers : {
            token : localStorage.accessToken
        }
    })
}

function deletetodo(id, event) {
    event.preventDefault()
    $.ajax({
        method: "delete",
        url : baseUrl+`/todos/${id}`,
        headers : {
            token : localStorage.accessToken
        }
    })
    .done(res=>{
        auth()
    })
    .fail(err=>{
        console.log(err);
    })
}

function getId(id, event) {
    event.preventDefault();
    $.ajax({
        method: "get",
        url : baseUrl+`/todos/${id}`,
        headers : {
            token : localStorage.accessToken
        }
    })
    .done(res=>{
        $("#edit").fadeIn()
        $("#edit-title").val(res.title)
        $("#edit-description").val(res.description)
        $("#edit-status").val(res.status)
        $("#edit-date").val(res.date)
        $("edit-btn").data("id", id)

    })
    .fail(err=>{
        console.log(err);
    })
}

$("update").click(function(event) {
    event.preventDefault()
    let todoid = $('edit-btn').data('id')
    let status = $('edit-btn').val()
    let title = $('edit-btn').val()
    let due_date = $('edit-btn').val()
    let description = $('edit-btn').val()
    $.ajax({
        method: "put",
        url : baseUrl+`/todos/${todoid}`,
        headers : {
            token : localStorage.accessToken
        },
        data:{
            title,
            description,
            status: "on going",
            due_date
        }
    })
    .done(res=>{
        console.log(res);
        auth()
    })
    .fail(err=>{
        console.log(err);
    })
})
