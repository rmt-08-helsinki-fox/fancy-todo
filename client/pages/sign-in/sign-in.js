$("#change-to-sign-up").click((e) => {
    e.preventDefault()
    $("#main").load("./pages/sign-up/sign-up.html")
})

$("#sign-in-button").click((e) => {
    e.preventDefault()
    $("#main").load("./pages/to-do/to-do.html")
})
