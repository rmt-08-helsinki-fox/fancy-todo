//@ts-check
$("#change-to-sign-up").click((e) => {
    e.preventDefault()
    $("#main").load("./pages/sign-up/sign-up.html")
})

$("#form-signin").on("submit", (e) => {
    e.preventDefault()
    login()
    $("#main").load("./pages/to-do/to-do.html")
})

// $("#google-sign-in-button").click((e) => {
//     e.preventDefault()
//     onSignIn()
//     $("#main").load("./pages/to-do/to-do.html")
// })

// ? FUNCTION SIGN-IN
function login() {
    const email = $("#inputEmail").val()
    const password = $("#inputPassword").val()
    console.log(email, password)
    $.ajax({
        url: base_url + "users/login",
        method: "POST",
        // headers: {
        //     token: localStorage.getItem("accessToken"),
        // },
        data: {
            email,
            password,
        },
    })
        .done((res) => {
            console.log(res, "Function Sign In <<<")
            localStorage.setItem("accessToken", res.accessToken)
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
            $("#main").load("./pages/sign-in/sign-in.html")
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
        })
        .fail((err) => {
            console.log(err)
        })
}
