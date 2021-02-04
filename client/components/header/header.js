//@ts-check
// $("#to-do-list-button").click((e) => {
//     e.preventDefault()
//     if (localStorage.getItem("accessToken")) (
//         $("#main").load("./pages/to-do/to-do.html")
//     ) else {
//         $("#main").load("./pages/sign-in/sign-in.html")
//     }
// })

$("#sign-out-button").click((e) => {
    e.preventDefault()
    logout()
    auth()
    $("#main").load("./pages/sign-in/sign-in.html")
})

auth()
