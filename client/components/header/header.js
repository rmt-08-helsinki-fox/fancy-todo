//@ts-check
$("#to-do-list-button").click((e) => {
    e.preventDefault()
    $("#main").load("./pages/to-do/to-do.html")
})

$("#sign-out-button").click((e) => {
    e.preventDefault()
    logout()
    $("#main").load("./pages/sign-in/sign-in.html")
})

auth()
