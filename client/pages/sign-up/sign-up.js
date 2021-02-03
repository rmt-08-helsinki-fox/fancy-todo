//@ts-check
$("#change-to-sign-in").click((e) => {
    e.preventDefault()
    $("#main").load("./pages/sign-in/sign-in.html")
})

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

$("#form-signup").on("submit", (e) => {
    e.preventDefault()
    register()
    $("#main").load("./pages/sign-in/sign-in.html")
})
