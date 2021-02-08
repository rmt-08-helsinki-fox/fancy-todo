const base_url = "https://fancytodo14.herokuapp.com/"

$(document).ready(() => {
    auth()
    //SUBMIT
    // login
    $("#login-form").on("submit", (e) => {
        e.preventDefault()
        login()
    })

    // register
    $("#login-form").on("submit", (e) => {
        e.preventDefault()
        register()
    })

    // add todo
    $("#add-todo-form").on("submit", (e) => {
        e.preventDefault()
        addTodo()
    })

    // edit todo
    $("#edit-todo-form").on("submit", (e) => {
        e.preventDefault()
        editTodo()
    })

    // CLICK
    // register
    $("#register-btn").on("click", (e) => {
        e.preventDefault()
        $("#register").show()
        $("#login-btn").show()
        $("#login").hide()
        $("#register-btn").hide()
        $("#add-todo").hide()
        $("#my-todo").hide()
        $("#logout-btn").hide()
        $("#my-todo-a").hide()
        $("#edit-todo").hide()
    })
    $("#register-a").on("click", (e) => {
        e.preventDefault()
        $("#register").show()
        $("#login-btn").show()
        $("#login").hide()
        $("#register-btn").hide()
        $("#add-todo").hide()
        $("#my-todo").hide()
        $("#logout-btn").hide()
        $("#my-todo-a").hide()
        $("#edit-todo").hide()
    })

    //login
    $("#login-btn").on("click", (e) => {
        e.preventDefault()
        $("#login").show()
        $("#register-btn").show()
        $("#register").hide()
        $("#login-btn").hide()
        $("#add-todo").hide()
        $("#my-todo").hide()
        $("#logout-btn").hide()
        $("#my-todo-a").hide()
        $("#edit-todo").hide()
    })
    $("#login-a").on("click", (e) => {
        e.preventDefault()
        $("#login").show()
        $("#register-btn").show()
        $("#register").hide()
        $("#login-btn").hide()
        $("#add-todo").hide()
        $("#my-todo").hide()
        $("#logout-btn").hide()
        $("#my-todo-a").hide()
        $("#edit-todo").hide()
    })

    //add todo
    $("#add-todo-btn").on("click", (e) => {
        e.preventDefault()
        $("#add-todo").show()
        $("#logout-btn").show()
        $("#my-todo-a").show()
        $("#login").hide()
        $("#register-btn").hide()
        $("#register").hide()
        $("#login-btn").hide()
        $("#my-todo").hide()
        $("#edit-todo").hide()
    })

    //edit todo
    $("#edit-todo-btn").on("click", (e) => {
        e.preventDefault()
        $("#add-todo").show()
        $("#logout-btn").show()
        $("#my-todo-a").show()
        $("#login").hide()
        $("#register-btn").hide()
        $("#register").hide()
        $("#login-btn").hide()
        $("#my-todo").hide()
        $("#edit-todo").hide()
    })

    //my todo
    $("#my-todo-a").on("click", (e) => {
        e.preventDefault()
        getTodoList()
    })
    
    // delete todo
})

const auth = () => {
    if(!localStorage.getItem("access_token")) {
        $("#login").show()
        $("#register-btn").show()
        $("#add-todo").hide()
        $("#my-todo").hide()
        $("#register").hide()
        $("#logout-btn").hide()
        $("#login-btn").hide()
        $("#my-todo-a").hide()
        $("#edit-todo").hide()
    } else {
        $("#my-todo").show()
        $("#my-todo-a").show()
        $("#logout-btn").show()
        $("#add-todo").hide()
        $("#login").hide()
        $("#register").hide()
        $("#login-btn").hide()
        $("#register-btn").hide()
        $("#edit-todo").hide()
        getTodoList()
    }
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: `POST`,
        url: base_url + 'googleoauth',
        data: { id_token }
    })
        .done( response => {
        localStorage.setItem(`access_token`,response.access_token)
        auth()
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            $("#email-input").trigger("reset")
            $("#password-input").trigger("reset")
        })
}

const login = () => {
    const email = $("#login-email-input").val()
    const password = $("#login-password-input").val()
    $.ajax({
        url: base_url + "login",
        method: "POST",
        data: { email, password }
    })
        .done(res => {
            localStorage.setItem("access_token", res.access_token)
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
        .always(_ => {
            $("#login-email-input").trigger("reset")
            $("#login-password-input").trigger("reset")
        })
}

const register = () => {
    const email = $("#email-input").val()
    const password = $("#password-input").val()
    $.ajax({
        url: base_url + "register",
        method: "POST",
        data: { email, password }
    })
        .done(res => {
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
        .always(_ => {
            $("#email-input").trigger("reset")
            $("#password-input").trigger("reset")
        })
}

const logout = () => {
    localStorage.clear()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    auth()
}

const getTodoList = () => {
    $.ajax({
        url: base_url + "todos",
        method: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(todos => {
            $("#todo-cont").empty()
            todos.forEach(e => {
                let statusLabel;
                switch(e.status) {
                    case 'Ongoing':
                        statusLabel = 'primary'
                        break
                    case 'Done':
                        statusLabel = 'success'
                        break
                    case 'Pending':
                        statusLabel = 'warning'
                        break
                    case 'Omit':
                        statusLabel = 'danger'
                        break
                    default:
                        statusLabel = 'secondary'
                }
                const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
                const dateObj = new Date(e.due_date);
                const month = monthNames[dateObj.getMonth()];
                const day = String(dateObj.getDate()).padStart(2, '0');
                const year = dateObj.getFullYear();
                const date = month  + '\n'+ day  + ',' + year;

                $("#todo-cont").append(`
                <div class="card  align-content-between" style="max-width: 400px;">
                    <div class="card-body  align-content-between">
                        <a class="none" href="#" onclick="seeTodo(${e.id})">
                            <h3 class="card-title">${e.title}</h3>
                        </a>
                        <span class="badge bg-${statusLabel}">${e.status}</span>
                        <span class="badge bg-secondary"> <i class="bi bi-clock-fill"></i>${date}</span><br><br>
                        <div class="container">
                            <div class="row">
                                <div class="col-4 card-btn">
                                    <div class="dropdown">
                                        <a class="btn btn-primary btn-sm dropdown-toggle" href="" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                            Set status
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <li><a class="dropdown-item" href="#" onclick="changeStatus(${e.id}, 'Done')">Done</a></li>
                                            <li><a class="dropdown-item" href="#" onclick="changeStatus(${e.id}, 'Ongoing')">Ongoing</a></li>
                                            <li><a class="dropdown-item" href="#" onclick="changeStatus(${e.id}, 'Pending')">Pending</a></li>
                                            <li><a class="dropdown-item" href="#" onclick="changeStatus(${e.id}, 'Omit')">Omit</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-2 card-btn">
                                    <button type="button" class="btn btn-danger btn-sm" onclick="deleteTodo(${e.id})">
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                                <div class="col-3 card-btn">
                                    <button type="button" class="btn btn-primary btn-sm" onclick="editTodoForm(${e.id})">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `)
            })
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
}

const addTodo = () => {
    const title = $("#add-todo-title").val()
    const description = $("#add-todo-description").val()
    const status = 'Ongoing'
    const due_date = $("#add-todo-duedate").val()
    $.ajax({
        url: base_url + "todos",
        method: "POST",
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(data => {
            if(data.holiday === 'No holiday at this day') {
                alert(data.holiday)
            } else {
                data.holiday.forEach(e => {
                    alert(`Your duedate coinciding with ${e.name}`)
                })
            }
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
}

const deleteTodo = (id) => {
    console.log("masuk");
    
    $.ajax({
        url: base_url + "todos/" + id,
        method: "DELETE",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(_ => {
            getTodoList()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
}

const seeTodo = (id) => {
    console.log("masuk");
    
    $.ajax({
        url: base_url + "todos/" + id,
        method: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(todo => {
            $("#todo-cont").empty()
            let statusLabel;

            switch(todo.status) {
                case 'Ongoing':
                    statusLabel = 'primary'
                    break
                case 'Done':
                    statusLabel = 'success'
                    break
                case 'Pending':
                    statusLabel = 'warning'
                    break
                case 'Omit':
                    statusLabel = 'danger'
                    break
                default:
                    statusLabel = 'secondary'
            }
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
                const dateObj = new Date(todo.due_date);
                const month = monthNames[dateObj.getMonth()];
                const day = String(dateObj.getDate()).padStart(2, '0');
                const year = dateObj.getFullYear();
                const date = month  + '\n'+ day  + ',' + year;

            $("#todo-cont").append(`
            <div class="card" style="max-width: 400px;">
                <div class="card-body">
                    <a class="none" href="#" onclick="seeTodo(${todo.id})">
                        <h3 class="card-title">${todo.title}</h3>
                    </a>
                    <span class="badge bg-${statusLabel}">${todo.status}</span>
                    <span class="badge bg-secondary"> <i class="bi bi-clock-fill"></i>${date}</span><br><br>
                    <p class="card-desc">${todo.description}</p><br>
                    <div class="container">
                        <div class="row">
                            <div class="col-4">
                                <div class="dropdown">
                                    <a class="btn btn-primary btn-sm dropdown-toggle" href="" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Set status
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li><a class="dropdown-item" href="#" onclick="changeStatus(${todo.id}, 'Done')">Done</a></li>
                                        <li><a class="dropdown-item" href="#" onclick="changeStatus(${todo.id}, 'Ongoing')">Ongoing</a></li>
                                        <li><a class="dropdown-item" href="#" onclick="changeStatus(${todo.id}, 'Pending')">Pending</a></li>
                                        <li><a class="dropdown-item" href="#" onclick="changeStatus(${todo.id}, 'Omit')">Omit</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-2 card-btn">
                                <button type="button" class="btn btn-danger btn-sm" onclick="deleteTodo(${todo.id})">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </div>
                            <div class="col-3 card-btn">
                                <button type="button" class="btn btn-primary btn-sm" onclick="editTodoForm(${todo.id})">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `)
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
}

const changeStatus = (id, status) => {
    $.ajax({
        url: base_url + "todos/" + id,
        method: "PATCH",
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: {
            status
        }
    })
        .done(_ => {
            getTodoList()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
}

const editTodoForm = (id) => {
    localStorage.setItem("todo_id", id)
    $("#logout-btn").show()
    $("#my-todo-a").show()
    $("#edit-todo").show()
    $("#register").hide()
    $("#login-btn").hide()
    $("#login").hide()
    $("#register-btn").hide()
    $("#add-todo").hide()
    $("#my-todo").hide()

    $.ajax({
        url: base_url + "todos/" + id,
        method: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(todo => {
            let dueDate = ""
            for (let i = 0; i < 10; i++) {
                dueDate += todo.due_date[i]
            }
            $("#edit-todo-title").val(todo.title)
            $("#edit-todo-description").val(todo.description)
            $("#edit-todo-status").val(todo.status)
            $("#edit-todo-duedate").val(dueDate)
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
}

const editTodo = () => {
    const id = localStorage.getItem("todo_id")
    const title = $("#edit-todo-title").val()
    const description = $("#edit-todo-description").val()
    const status = $("#edit-todo-status").val()
    const due_date = $("#edit-todo-duedate").val()
    $.ajax({
        url: base_url + "todos/" + id,
        method: "PUT",
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(data => {
            localStorage.setItem("todo_id", null)
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
}