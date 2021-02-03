$(document).ready(function () {
    auth();
    $('#registerNav').on('click', (e) => {
        e.preventDefault();
        $('#loginPage').hide();
        $('#registerPage').show();
        $('#todoPage').hide();
        $('#crud-todo').hide();
        $('div.validateRegister').hide();
    });
    $('#loginNav').on('click', (e) => {
        e.preventDefault();
        $('#loginPage').show();
        $('#registerPage').hide();
        $('#todoPage').hide();
        $('div.alert').hide();
    });
    $('#formRegister').on('submit', e => {
        e.preventDefault();
        registration();
    })
    $('#loginSubmit').on('submit', (e) => {
        e.preventDefault();
        let email = $('#email').val();
        let password = $('#password').val();

        $.ajax({
            url: 'http://localhost:3000/auth/login',
            method: 'POST',
            data: { email, password }
        })
            .done(res => {
                localStorage.setItem('token', res.token);
                renderTodoPage();
            })
            .fail(err => {
                const msg = err.responseJSON.message;
                renderLoginPage(msg);
            });
    });
    $('.yourTodos').on('click', (e) => {
        e.preventDefault();
        if (!localStorage.getItem('token')) {
            renderLoginPage('You must login first');
        } else {
            renderTodoPage();
        }
    });
    $('#logoutNav').on('click', e => {
        e.preventDefault();
        localStorage.clear();
        renderLoginPage();
    });
    $('#btn-add-todo').on('click', e => {
        e.preventDefault();
        resetCrudPage();
        renderAddTodoPage();
    });
    $('#submitCrud').on('submit', e => {
        e.preventDefault();
        let whichCrud = $('#crud-todo button').text();
        if (whichCrud === 'Add Todo') {
            addTodo();
        } else {
            editTodo();
        }
    });
});