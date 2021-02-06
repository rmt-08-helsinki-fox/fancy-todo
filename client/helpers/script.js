const baseUrl = "//localhost:3000"
function auth() {
    if (!localStorage.getItem("accessToken")) {
        $("#navbar").hide()
        $("#header-container").show()
        $("#signin-container").show()
        $("#todos-table-container").hide()
        $("#addtodo-container").hide()
        $("#edittodo-container").hide()
        $("#addtodo-button").hide()
    } else {
        $("#navbar").show()
        $("#header-container").hide()
        $("#signin-container").hide()
        $("#todos-table-container").show()
        $("#addtodo-container").hide()
        $("#edittodo-container").hide()
        $("#addtodo-button").show()
        getTodos()
    }
}
function createUser() {
    $("#register-form").on("submit", e => {
        e.preventDefault()
        const email = $("#email-register").val()
        const password = $("#password-register").val()
        const name = $("#name-register").val()
        $.ajax({
            url: baseUrl + "/users/signup",
            method: "post",
            data: {
                email, name, password
            }
        })
            .done(_ => {
                $("#header-container").show()
                $("#signin-container").show()
                $("#register-container").hide()
                $("#email-register").val("")
                $("#name-register").val("")
            })
            .fail((xml, text) => {
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'please insert email, name, and password correctly!',

                })
            })
    })
}
function getTodos() {
    $(".table tbody").empty()
    $.ajax({
        url: baseUrl + "/todos",
        method: "get",
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
        .done(todos => {
            
            todos.forEach((e, index, array) => {
                $(".table tbody").append(
                    `<tr>
                            <td>${index + 1}</td>
                            <td>${e.title}</td>
                            <td>${e.description}</td>
                            <td>${e.status}</td>
                            <td>${e.due_date.split('T')[0]}</td>
                            <td>${e.User.name}</td>
                            <td>
                                <div id="actions">
                                    <i class="fa fa-edit" title="edit" onclick="editTodo('${e.id}','${e.title}','${e.description}', '${e.status}', '${e.due_date}')"></i>
                                    <i class="fa fa-trash" title="delete" onclick="deleteTodo(${e.id})"></i>
                                </div>
                            </td>
                        </tr>`
                )
            })

        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })

}

function signin() {
    $("#signin-form").on("submit", (e) => {
        e.preventDefault()
        const email = $("#email").val()
        const password = $("#password").val()
        $.ajax({
            url: baseUrl + "/users/signin",
            method: "post",
            data: { email, password }

        })
            .done(response => {
                localStorage.setItem("accessToken", response.accessToken)
                auth()
            })
            .fail((xhr, text) => {

                $(document).ready(function () {

                    swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Your email address or password is incorrect!',

                    })
                })

            })
            .always(_ => {
                $("#email").val("")
                $("#password").val("")
            })
    })
}

function signout() {
    $("#signout-tab").on("click", e => {
        e.preventDefault()
        localStorage.clear()
        auth()
    })
}

function launchRegister() {
    $("#register-button").on("click", e => {
        e.preventDefault()
        $("#email").val("")
        $("#password").val("")
        $("#header-container").show()
        $("#signin-container").hide()
        $("#register-container").show()
    })

    $("#backtosignin-button").on("click", e => {
        e.preventDefault()
        $("#email-register").val("")
        $("#name-register").val("")
        $("#password-register").val("")
        $("#header-container").show()
        $("#signin-container").show()
        $("#register-container").hide()
    })
    createUser()
}

function addTodo() {
    $("#addtodo-button").on("click", e => {
        e.preventDefault()
        $("#addtodo-container").show()
        $("#addtodo-button").hide()
        $("#addtodo-cancel-button").on("click", e => {
            e.preventDefault()
            $("#addtodo-container").hide()
            $("#addtodo-button").show()
        })
        $("#addtodo-form").on("submit", e => {
            e.preventDefault()
            const title = $("#title").val()
            const description = $("#description").val()
            const due_date = $("#due-date").val()
            const status = "unfinished"

            $.ajax({
                url: baseUrl + "/todos/add",
                method: "post",
                data: {
                    title, description, status, due_date
                },
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            })
                .done(newTodo => {
                    $("#addtodo-container").hide(1000)
                    $("#addtodo-button").show()
                    auth()
                })
                .fail((xhr, text) => {
                    $(document).ready(function () {
                        swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'invalid input!',
                        })
                    })
                })
                .always(_ => {
                    $("#title").val("")
                    $("#description").val("")
                    $("#due-date").val("")
                })
        })
    })
}

function editTodo(todoId, title, description, status, due_date) {
    let year = new Date(due_date).getFullYear().toString()
    let month = (new Date(due_date).getMonth() + 1).toString()
    let date = new Date(due_date).getDate().toString()
    if (Number(month) < 10) { month = "0" + month }
    if (Number(date) < 10) { date = "0" + date }
    $("#todos-table-container").hide()
    $("#add-button-container").hide()
    $("#edittodo-container").show()
    $("#title-edit").val(title)
    $("#description-edit").val(description)
    if(status === "finished"){
        $("#finished").attr("selected")
    } else {
        $("#unfinished").attr("selected")
    }
    $("#status-edit").val(status)
    $("#due-date-edit").val(year + "-" + month + "-" + date)
    $("#edittodo-form").on("submit", e => {
        e.preventDefault()
        
        const title = $("#title-edit").val()
        const description = $("#description-edit").val()
        const status = $("#status-edit").val()
        const due_date = $("#due-date-edit").val()
        
        $.ajax(({
            url: baseUrl + `/todos/${todoId}`,
            method: "put",
            data: {
                title, description, status, due_date
            },
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }))
            .done(_ => {
                $("#edittodo-container").hide()
                auth()
            })
            .fail(error => {
                console.log(error.responseJSON);
                $(document).ready(function () {
                    swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.responseJSON.error.messages
                    })
                })
            })
            
    })


}

function deleteTodo(todoId) {
    console.log(todoId);
}

$(document).ready(function () {
    auth()
    launchRegister()
    signin()
    signout()
    addTodo()
    
});