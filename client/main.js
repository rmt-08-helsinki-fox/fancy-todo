//@ts-check
$(document).ready(() => {
    $("#header").load("./components/header/header.html")
    auth()
    // $("#footer").load("./component/footer.html")
})

const base_url = "http://localhost:3000/"

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})

// ? FUNCTION AUTHENTICATION LOG IN USER
function auth() {
    if (!localStorage.getItem("accessToken")) {
        $("#sign-out-button").hide()
        $("#suprise-cat-button").hide()
        $("#main").load("./pages/sign-in/sign-in.html")
    } else {
        $("#sign-out-button").show()
        $("#suprise-cat-button").show()
        $("#main").load("./pages/to-do/to-do.html")
        $("#to-dolist").show()
        readToDoList()
    }
}

// ? FUNCTION REFRESH VISUAL
function refreshVisualToDoList(data) {
    $("#to-do-list").empty()
    if (data.length > 0) {
        data.forEach((e) => {
            $("#to-do-list").append(`
                <div class="input-group mb-3 d-flex justify-content-center">
                    <div class="card">
                        <div class="d-flex align-items-center">
                            <div id="checkbox-div" class="input-group-text">
                                <input
                                    type="checkbox"
                                    id="checkbox${e.id}"
                                    onclick="patchToDoStatus(${e.id})"
                                    ${e.status ? "checked" : ""}
                                />
                            </div>
                        <div>
                    </div>

                    <div class="card" style="width: 50rem">

                        <div class="card-body" id="edit-to-do-form-${e.id}">
                            <form onsubmit="confirmUpdateToDo(${e.id})">
                                <div class="row">
                                    <div class="col">
                                        <input
                                            type="text"
                                            class="form-control title"
                                            placeholder="${e.title}"
                                            value="${e.title}"
                                            id="title-edit-${e.id}"
                                            required
                                        />
                                    </div>
                                    <div class="col">
                                        <input
                                            type="date"
                                            class="form-control due_date"
                                            id="due-date-add-${e.id}"
                                            value="${e.due_date.slice(0, 10)}"
                                            required
                                        />
                                    </div>
                                </div>
                                <div class="form-group mt-2">
                                    <textarea
                                        class="form-control description"
                                        id="description-edit-${e.id}"
                                        rows="3"
                                        placeholder="${e.description}">${e.description}</textarea>
                                </div>
                                <p>* Date must not be in the past</p>
                                <div>
                                    <button
                                        id="edit-to-do-button-${e.id}"
                                        class="btn btn-primary">
                                    Edit
                                    </button>
                                    <button
                                        id="cancel-edit-to-do-button-${e.id}"
                                        class="btn btn-danger">
                                    Cancel
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div class="card-body" id="card-to-do-${e.id}">
                            <div id="to-do-card-value-${e.id}" style="">
                                <h5 id="title-${e.id}" class="card-title">${e.title}</h5>
                                <p class="card-text">${e.description}</p>
                                <h6 class="card-subtitle mb-2 text-muted">${e.due_date.slice(0, 10)}</h6>
                                <div>
                                    <button
                                        id="form-edit-to-do-button-${e.id}"
                                        type="button"
                                        class="btn btn-warning">
                                    Edit
                                    </button>
                                    <button
                                        id="delete-to-do-button"
                                        class="btn btn-danger"
                                        onclick="deleteToDo(${e.id})">
                                    Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <script>
                    // ? Hide To Do Update Form
                    $("#edit-to-do-form-${e.id}").hide()
                    // ? Button Show To Do Form
                    $("#form-edit-to-do-button-${e.id}").click((e) => {
                        e.preventDefault()
                        $("#edit-to-do-form-${e.id}").show()
                        $("#to-do-card-value-${e.id}").hide()
                    })
                    // ? Button Cancel and Hide To Do Form
                    $("#cancel-edit-to-do-button-${e.id}").click((e) => {
                        e.preventDefault()
                        $("#edit-to-do-form-${e.id}").hide()
                        $("#to-do-card-value-${e.id}").show()
                    })
                    // ? Button Submit Update To Do Form
                    $("#edit-to-do-form-${e.id}").on("submit", (e) => {
                        e.preventDefault()
                        confirmUpdateToDo(${e.id})
                        readToDoList()
                    })
                </script>
            `)
        })
    } else {
        $("#to-do-list").append(`<p>You don't have to do list</p>`)
    }
}

// ? FUNCTION HEADER SIGN-OUT
// * inside header.js

// ? FUNCTION SIGN-IN
function login() {
    const email = $("#inputEmail").val()
    const password = $("#inputPassword").val()
    console.log(email, password)
    $.ajax({
        url: base_url + "users/login",
        method: "POST",
        data: {
            email,
            password,
        },
    })
        .done((res) => {
            console.log(res, "Function Sign In <<<")
            localStorage.setItem("accessToken", res.accessToken)
            // ! Sweet Alert Toast
            Toast.fire({
                icon: "success",
                title: "Sign in with your email success!",
            })
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
            // ! Sweet Alert
            Swal.fire({
                icon: "error",
                title: `Oops... ${xhr.responseJSON.status}`,
                text: `${xhr.responseJSON.msg}`,
            })
        })
        .always((_) => {
            $("form-signin").trigger("reset")
        })
}

// ? FUNCTION GOOGLE SIGN-IN
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    console.log(id_token)
    $.ajax({
        url: base_url + "users/googleLogin",
        method: "POST",
        data: { googleToken: id_token },
    })
        .done((res) => {
            console.log(res, "Function Google Sign In <<<")
            localStorage.setItem("accessToken", res.accessToken)
            // ! Sweet Alert Toast
            Toast.fire({
                icon: "success",
                title: "Sign in with your Google Account success!",
            })
            auth()
        })
        .fail((err) => {
            console.log(err)
            // ! Sweet Alert
            Swal.fire({
                icon: "error",
                title: `Oops... 404`,
                text: `Unable to Sign in with Google`,
            })
        })
}

// ? FUNCTION SIGN-UP
function register() {
    const email = $("#inputEmail").val()
    const password = $("#inputPassword").val()
    // console.log(email, password)
    $.ajax({
        url: base_url + "users/register",
        method: "POST",
        data: {
            email,
            password,
        },
    })
        .done((res) => {
            console.log(res)
            console.log(res)
            // ! Sweet Alert Toast
            Toast.fire({
                icon: "success",
                title: "Register success!",
            })
            $("#main").load("./pages/sign-in/sign-in.html")
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
            // ! Sweet Alert
            Swal.fire({
                icon: "error",
                title: `Oops... ${xhr.responseJSON.status}`,
                text: `${xhr.responseJSON.msg}`,
            })
        })
        .always((_) => {
            $("#form-signup").trigger("reset")
        })
}

// ? FUNCTION CREATE TO-DO
function createToDo() {
    const title = $("#titleAdd").val()
    const due_date = $("#dueDateAdd").val()
    const description = $("#descriptionAdd").val()
    // console.log(title, due_date, description)
    $.ajax({
        url: base_url + "todos",
        method: "POST",
        headers: {
            token: localStorage.getItem("accessToken"),
        },
        data: {
            title,
            due_date,
            status: false,
            description,
        },
    })
        .done((res) => {
            console.log(res)
            // ! Sweet Alert Toast
            Toast.fire({
                icon: "success",
                title: "Created a new to do",
            })
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
            // ! Sweet Alert
            Swal.fire({
                icon: "error",
                title: `Oops... ${xhr.status}`,
                text: `${xhr.responseJSON.msg}`,
            })
        })
        .always((_) => {
            $("#add-to-do-form").trigger("reset")
        })
}

// ? FUNCTION READ TO-DO-LIST
async function readToDoList() {
    try {
        const response = await axios({
            url: base_url + "todos",
            method: "GET",
            headers: {
                token: localStorage.getItem("accessToken"),
            },
        })
        refreshVisualToDoList(response.data)
    } catch (error) {
        console.log(error.message)
    }
}

// ? FUNCTION UPDATE PUT TO-DO
function confirmUpdateToDo(toDoId) {
    const title = $(`#title-edit-${toDoId}`).val()
    const due_date = $(`#due-date-add-${toDoId}`).val()
    const status = $(`#checkbox${toDoId}`).val()
    const description = $(`#description-edit-${toDoId}`).val()
    let newStatus
    if (status === "on") {
        newStatus = true
    } else {
        newStatus = false
    }
    console.log(title, due_date, newStatus, description)
    $.ajax({
        url: base_url + `todos/${toDoId}`,
        method: "PUT",
        data: {
            title,
            due_date,
            status: false,
            description,
        },
        headers: {
            token: localStorage.getItem("accessToken"),
        },
    })
        .done((res) => {
            console.log(res)
            // ! Sweet Alert Toast
            Toast.fire({
                icon: "success",
                title: "Edited a new to do",
            })
            readToDoList()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
            // ! Sweet Alert
            Swal.fire({
                icon: "error",
                title: `Oops... ${xhr.status}`,
                text: `${xhr.responseJSON.msg}`,
            })
        })
}

// ? FUNCTION UPDATE PATCH TO-DO
function patchToDoStatus(toDoId) {
    const debug = document.querySelector(`#checkbox${toDoId}`)
    console.log(debug, "<<")
    $.ajax({
        url: base_url + `todos/${toDoId}`,
        method: "PATCH",
        data: {
            status: debug.checked,
        },
        headers: {
            token: localStorage.getItem("accessToken"),
        },
    })
        .done((res) => {
            console.log(res)
            readToDoList()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
            // ! Sweet Alert
            Swal.fire({
                icon: "error",
                title: `Oops... ${xhr.status}`,
                text: `${xhr.responseJSON.msg}`,
            })
        })
}

// ? FUNCTION DELETE TO-DO
function deleteToDo(toDoId) {
    $.ajax({
        url: base_url + `todos/${toDoId}`,
        method: "DELETE",
        headers: {
            token: localStorage.getItem("accessToken"),
        },
    })
        .done((res) => {
            console.log(res)
            // ! Sweet Alert Toast
            Toast.fire({
                icon: "success",
                title: "Success delete to do",
            })
            readToDoList()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
            // ! Sweet Alert
            Swal.fire({
                icon: "error",
                title: `Oops... ${xhr.status}`,
                text: `${xhr.responseJSON.msg}`,
            })
        })
}
