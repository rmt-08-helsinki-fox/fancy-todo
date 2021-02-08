function auth() {
    if (!localStorage.getItem('token')) {
        renderLoginPage();
    } else {
        $('#registerPage').hide();
        $('#loginPage').hide();
        $('#loginNav').hide();
        $('#registerNav').hide();
        renderTodoPage();
    }
}

function renderLoginPage(invalidAuth = null) {
    if (invalidAuth) {
        $('.alert').text(invalidAuth);
        $('.alert').show();
    } else {
        $('.alert').hide();
    }
    $('#loginPage').show();
    $('#registerPage').hide();
    $('#todoPage').hide();
    $('#logoutNav').hide();
    $('#crud-todo').hide();
    $('#loginNav').show();
    $('#registerNav').show();
    $('#email').val('');
    $('#password').val('');
    $('#add-member').hide();
}

function getQuotes() {
    $.ajax({
        url: 'http://localhost:3000/quotes',
        method: 'GET',
        headers: { token: localStorage.getItem('token') }
    })
        .done(res => {
            let text = `=== Quotes for You ===<br>"${res.data}"`;
            $('div.quotes').show();
            $('div.quotes').html(text);
        })
        .fail(err => {
            console.log(err);
        })
}

function renderTodoPage() {
    if (!localStorage.getItem('token')) {
        renderLoginPage();
        return false;
    }
    getQuotes();
    $('#loginPage').hide();
    $('#registerPage').hide();
    $('#crud-todo').hide();
    $('#registerNav').hide();
    $('#loginNav').hide();
    $('#logoutNav').show();
    $('#todoPage').show();
    $('#add-member').hide();

    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(res => {
            let rows = '';
            res.data.forEach((e, i) => {
                let isChecked = e.status ? 'checked' : '';
                let row = `<tr>
                    <td>${i + 1}</td>
                    <td>${e.title}</td>
                    <td>${e.description}</td>
                    <td>
                    <input type="checkbox" data-id="${e.id}" data-status="${e.status}" class="form-check-input status" ${isChecked}>
                    </td>
                    <td>${e.due_date}</td>
                    <td class="d-flex">
                        <button type="button" data-id="${e.id}" class="btn btn-sm btn-warning edit-btn m-1">Edit</button>
                        <button type="button" data-id="${e.id}" class="btn btn-sm btn-danger delete-btn m-1">Delete</button>
                        <button type="button" data-id="${e.id}" class="btn btn-sm btn-success add-member-btn m-1">Add Member</button>
                    </td>
                </tr>`;
                rows += row;
            });
            $('tbody.todos').html(rows);
            $('#404').hide();
            $('button.edit-btn').on('click', e => {
                e.preventDefault();
                renderEditTodoPage(e.target.dataset.id)
            });
            $('button.delete-btn').on('click', e => {
                e.preventDefault();
                deleteTodo(e.target.dataset.id);
            });
            $('input.status').on('click', e => {
                e.preventDefault();
                changeStatus(e.target.dataset.id, e.target.dataset.status)
            });
            $('button.add-member-btn').on('click', e => {
                e.preventDefault();
                renderAddMemberPage(e.target.dataset.id);
            })
        })
        .fail(err => {
            $('#404').show();
            $('tbody.todos').html('');
        });
}

function changeStatus(id, status) {
    status = status === 'true' ? "false" : "true";
    $.ajax({
        url: 'http://localhost:3000/todos/' + id,
        method: 'PATCH',
        data: {
            status
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            renderTodoPage();
        })
        .fail(err => {
            console.log(err);
        })
}

function renderEditTodoPage(id) {
    $.ajax({
        url: 'http://localhost:3000/todos/' + id,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(res => {
            const { title, description, due_date, id } = res.data;
            $('#title').val(title);
            $('#description').val(description);
            $('#due_date').val(due_date);
            $('#id').val(id);
            $('#crud-todo button').text('Edit Todo');
            renderAddTodoPage();
        })
        .fail(err => {
            console.log(err);
        })
}

function resetCrudPage() {
    $('#title').val('');
    $('#description').val('');
    $('#due_date').val('');
    $('#crud-todo button').text('Add Todo');
    $('#crud-todo small').hide();
}

function resetValidate() {
    $('#crud-todo small').hide();
}

function renderAddTodoPage(err = null) {
    resetValidate();
    $('#todoPage').hide();
    $('#loginPage').hide();
    $('#registerPage').hide();
    $('#crud-todo').show();
    $('#registerNav').hide();
    $('#loginNav').hide();
    $('#logoutNav').show();
    $('#add-member').hide();

    if (err) {
        err.forEach(e => {
            if (e === `Title can't be empty`) {
                $('#validateTitle').text(e);
                $('#validateTitle').show();
            } else if (e === `Due date can't be passed`) {
                $('#validateDueDate').text(e);
                $('#validateDueDate').show();
            } else if (e === `Invalid date format`) {
                $('#validateDueDate').text(e);
                $('#validateDueDate').show();
            }
        })
    }
}

function addTodo() {
    let title = $('#title').val();
    let description = $('#description').val();
    let due_date = $('#due_date').val();

    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'POST',
        data: {
            title,
            description,
            due_date,
            status: false
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            renderTodoPage();
        })
        .fail(err => {
            renderAddTodoPage(err.responseJSON.message);
        })
}

function editTodo() {
    let id = $('#id').val();
    let title = $('#title').val();
    let description = $('#description').val();
    let due_date = $('#due_date').val();
    $.ajax({
        url: 'http://localhost:3000/todos/' + id,
        method: 'PUT',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title,
            description,
            due_date
        }
    })
        .done(() => {
            renderTodoPage();
        })
        .fail(err => {
            renderAddTodoPage(err.responseJSON.message);
        });
}

function deleteTodo(id) {
    $.ajax({
        url: 'http://localhost:3000/todos/' + id,
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            renderTodoPage();
        })
        .fail(err => {
            console.log(err);
        })
}

function renderAddMemberPage(id) {
    $('#todoPage').hide();
    $('#loginPage').hide();
    $('#registerPage').hide();
    $('#crud-todo').hide();
    $('#registerNav').hide();
    $('#loginNav').hide();
    $('#logoutNav').show();
    $('#add-member').show();
    $('#email-member').val('');
    $('#validateEmailMember').hide();
    $('#idTodoForMember').val(id);

    $.ajax({
        url: `http://localhost:3000/todos/${id}/members`,
        method: 'GET',
        headers: { token: localStorage.getItem('token') }
    })
        .done(data => {
            let html = '';
            const members = data.data.Members;
            members.forEach((e, i) => {
                let row = `<tr>
                                <td>${i + 1}</td>
                                <td>${e.email}</td>
                            </tr>`;
                html += row;
            });
            $('#members').html(html);
        })
        .fail(err => {
            console.log(err);
        })
}

function addMember() {
    const idTodo = $('#idTodoForMember').val();
    const email = $('#email-member').val();
    $.ajax({
        url: `http://localhost:3000/todos/${idTodo}/members/add`,
        method: 'POST',
        headers: { token: localStorage.getItem('token') },
        data: { email }
    })
        .done(() => {
            renderAddMemberPage(idTodo);
        })
        .fail(err => {
            renderAddMemberPage(idTodo);
            $('#validateEmailMember').text('Email belum terdaftar di aplikasi');
            $('#validateEmailMember').show();
            console.log(err);
        });
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/auth/loginOauth',
        method: 'POST',
        data: {
            tokenOauth: id_token
        }
    })
        .done((res) => {
            localStorage.setItem('token', res.token);
            renderTodoPage();
        })
        .fail(err => {
            console.log(err);
        })
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}