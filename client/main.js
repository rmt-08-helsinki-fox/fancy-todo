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

// ? FUNCTION AUTHENTICATION LOG IN USER
function auth() {
    if (!localStorage.getItem("accessToken")) {
        $("#sign-out-button").hide()
    } else {
        $("#sign-out-button").show()
    }
}
