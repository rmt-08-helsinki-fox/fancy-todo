const URL_REGISTER = 'https://fancy-todo-adit-server.herokuapp.com'

function registration() {
    let email = $('#emailRegister').val();
    let password = $('#passwordRegister').val();
    let confirmPassword = $('#confirmPassword').val();

    if (password !== confirmPassword) {
        $('div.validateRegister').text('Password not match !');
        $('div.validateRegister').show();
        resetRegister();
        return false;
    }

    $.ajax({
        url: `${URL_REGISTER}/auth/registration`,
        method: 'POST',
        data: { email, password }
    })
        .done(() => {
            renderLoginPage();
            resetRegister();
        })
        .fail(err => {
            let msg = err.responseJSON.message;
            $('div.validateRegister').empty();
            msg.forEach(e => {
                if (e === 'Email has been used') {
                    $('div.validateRegister').append(`<p>${e}</p>`);
                    $('div.validateRegister').show();
                } else if (e === 'Invalid format email') {
                    $('div.validateRegister').append(`<p>${e}</p>`);
                    $('div.validateRegister').show();
                } else if (e === `Email cant't be empty`) {
                    $('div.validateRegister').append(`<p>${e}</p>`);
                    $('div.validateRegister').show();
                } else if (e === `Password can't be empty`) {
                    $('div.validateRegister').append(`<p>${e}</p>`);
                    $('div.validateRegister').show();
                } else if (e === `Password minimal 6 characters`) {
                    $('div.validateRegister').append(`<p>${e}</p>`);
                    $('div.validateRegister').show();
                }
            });
            resetRegister();
        })
}

function resetRegister() {
    $('#emailRegister').val('');
    $('#passwordRegister').val('');
    $('#confirmPassword').val('');
}