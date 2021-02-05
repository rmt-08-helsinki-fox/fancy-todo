//@ts-check
$("#change-to-sign-in").click((e) => {
    e.preventDefault()
    $("#main").load("./pages/sign-in/sign-in.html")
})

$("#form-signup").on("submit", (e) => {
    e.preventDefault()
    register()
})
