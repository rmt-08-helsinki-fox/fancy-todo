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
        $("#news-container").hide()
    } else {

        getTodos()
        $("#navbar").show()
        $("#header-container").hide()
        $("#signin-container").hide()
        $("#todos-table-container").show()
        $("#addtodo-container").hide()
        $("#edittodo-container").hide()
        $("#addtodo-button").show()
        $("#news-container").hide()


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
            .fail((xml, test) => {

                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: xml.responseText
                })
            })
    })
}


function getTodos() {

    $.ajax({
        url: baseUrl + "/todos",
        method: "get",
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
        .done(todos => {
            $("tbody").empty()
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

                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Your email address or password is incorrect!',

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
                $("#addtodo-container").hide()
                $("#addtodo-button").show()
                auth()
            })
            .fail((xhr, text) => {
                console.log(xhr)
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: xhr.responseText,
                })

            })
            .always(_ => {
                $("#title").val("")
                $("#description").val("")
                $("#due-date").val("")
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
    if (status === "finished") {
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
            .fail(xml => {
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: xml.responseJSON.error.messages
                })
            })
    })

    $("#edittodo-cancel-button").on("click", e => {
        e.preventDefault()

        auth()
    })
}



function deleteTodo(todoId) {
    $.ajax({
        url: baseUrl + `/todos/${todoId}`,
        method: 'delete',
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
        .done(_ => {
            auth()
        })
        .fail(error => {

            swal({
                icon: 'error',
                title: 'Oops...',
                text: error.responseJSON.error.messages
            })
        })
}

function onSignIn(googleUser) {

    let id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
    $.ajax({
        url: baseUrl + "/users/signinGoogle",
        method: "post",
        data: {
            id_token
        }
    })
        .done(response => {
            localStorage.setItem("accessToken", response.accessToken)
            auth()
        })
        .catch(error => {
            console.log(error)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.clear()
    });
}



$(document).ready(function () {

    auth()
    launchRegister()
    signin()
    signout()
    addTodo()

    $("#todos-tab").on("click", e => {
        e.preventDefault()
        $("form").val("")
        auth()
    })

    $("#news-tab").on("click", e => {
        $.ajax({
            url: baseUrl + "/todos/news",
            method: "get",
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        })
            .done(articles => {

                $("#news-container").show()
                $("#addtodo-button").hide()
                $("#todos-table-container").hide()
                articles.forEach(article => {
                    $("#news-contents-container").prepend(
                        `
                        <div class="row" id="content">
                        <div class="col-4" id="news-image-url">
                            <img src="${article.urlToImage}" class="img-fluid" alt="image-url">
                            
                        </div>
                        <div class="col-8" id="news-content">
                            <h2>${article.title}</h2>
                            <p>${article.description}</p>
                            <a href="${article.url}" target="_blank">...baca lebih lanjut</h5>
                        </div>
                        </div>
                        `
                    )
                })

            })
            .fail((xml, text) => {
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: xml.responseText
                })
            })
    })

});