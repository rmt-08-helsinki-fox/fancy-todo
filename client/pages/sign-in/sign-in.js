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
