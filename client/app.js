const base_url = 'http://localhost:3000/'

function login(access_token){
    localStorage.setItem("access_token",access_token);
    $('#loginPage').fadeOut();
    $('#registerPage').fadeOut();
    $("#appPage").fadeIn();
}

$(document).ready(function(){
    $('#register-link').click((e) => {
        e.preventDefault();
        $("#loginPage").fadeOut();
        $("#registerPage").fadeIn();
    })

    $('#login-link').click((e) => {
        e.preventDefault();
        $("#registerPage").fadeOut();
        $("#loginPage").fadeIn();
    });

    $('.logout-link').click((e) => {
        localStorage.removeItem('access_token');
        const auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
        });
        $("#appPage").fadeOut();
        $("#loginPage").fadeIn();

    })

    $("#registerForm").submit((e) => {
        e.preventDefault();
        let data = $("#registerForm").serialize()
        $.ajax({
            method : "POST",
            url: base_url + 'register',
            data
        }).done((response) => {
            toastr.success('Success to register , you can login now','Yeay!')
            $("#login-link").trigger('click');
        }).fail(err => {
            if(Array.isArray(err.responseJSON.msg)){
                err.responseJSON.msg.forEach(msg => {
                    toastr.error(msg, 'Oops!')
                })
            }else{
                toastr.error(err.responseJSON, 'Oops!')
            }
        })
    })

    $("#loginForm").submit((e) => {
        e.preventDefault();
        let data = $("#loginForm").serialize()
        $.ajax({
            method : "POST",
            url: base_url + 'login',
            data
        }).done((response) => {
            login(response.access_token);
        }).fail(err => {
            toastr.error(err.responseJSON.msg, 'Oops!')
        })
    });
});

function onSignIn(googleUser){
    const token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url:  base_url + 'signInWithGoogle',
        data : {
            token
        }
    }).done(response => {
        login(response.access_token)
    }).fail(err => {
        toastr.error(err, 'Oops!')
    })
}