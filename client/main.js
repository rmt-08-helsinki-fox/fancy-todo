//@ts-check
$(document).ready(() => {
    $("#header").load("./components/header/header.html")
    if (localStorage.getItem("accessToken")) {
        $("#main").load("./pages/to-do/to-do.html")
    } else {
        $("#main").load("./pages/sign-in/sign-in.html")
    }
    // $("#footer").load("./component/footer.html")
})

const base_url = "http://localhost:3000/"

// ? FUNCTION HEADER SIGN-OUT
function logout() {
    localStorage.removeItem("accessToken")
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
        console.log("User signed out.")
        auth()
    })
}

// ? FUNCTION AUTHENTICATION LOG IN USER
function auth() {
    if (!localStorage.getItem("accessToken")) {
        $("#sign-out-button").hide()
    } else {
        $("#sign-out-button").show()
    }
}

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
            console.log(res, "FUNCTION SIGN IN")
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
    // var profile = googleUser.getBasicProfile()
    // console.log("ID: " + profile.getId()) // Do not send to your backend! Use an ID token instead.
    // console.log("Name: " + profile.getName())
    // console.log("Image URL: " + profile.getImageUrl())
    // console.log("Email: " + profile.getEmail()) // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token
    console.log(id_token)
    $.ajax({
        url: base_url + "users/googleLogin",
        method: "POST",
        data: { googleToken: id_token },
    })
        .done((res) => {
            console.log(res, "FUNCTION GOOGLE SIGN IN")
            localStorage.setItem("accessToken", res.accessToken)
        })
        .fail((err) => {
            console.log(err)
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
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
        .always((_) => {
            $("#form-signup").trigger("reset")
        })
}

// ? FUNCTION TO-DO-LIST
function addToDoForm(status) {
    if (status) {
        $("#add-to-do-form").hide()
    } else {
        $("#add-to-do-form").show()
    }
}

// $("#uniq").append(
//     generateCard({
//         test: "string",
//         id: "string-id",
//         handler: (e) => {
//             e.preventDefault()
//             console.log("apalah")
//         },
//         button_text: "string",
//     })
// )
