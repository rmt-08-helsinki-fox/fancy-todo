//@ts-check
$("#change-to-sign-up").click((e) => {
    e.preventDefault()
    $("#main").load("./pages/sign-up/sign-up.html")
})

$("#form-signin").on("submit", (e) => {
    e.preventDefault()
    login()
    auth()
})
