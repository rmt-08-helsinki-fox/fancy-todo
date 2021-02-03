//@ts-check
$("#change-to-sign-up").click((e) => {
    e.preventDefault()
    $("#main").load("./pages/sign-up/sign-up.html")
})

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
            console.log(res)
            localStorage.setItem("accessToken", res.accessToken)
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
        .always((_) => {
            $("form-signin").trigger("reset")
        })
}

$("#form-signin").on("submit", (e) => {
    e.preventDefault()
    login()
    $("#main").load("./pages/to-do/to-do.html")
})
