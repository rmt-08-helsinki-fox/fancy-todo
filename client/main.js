//@ts-check
$(document).ready(() => {
    $("#header").load("./components/header/header.html")
    $("#main").load("./pages/sign-in/sign-in.html")
    // $("#footer").load("./component/footer.html")
})

// const base_url = "http://127.0.0.1:5500/client/"
const base_url = "http://localhost:3000/"

function auth() {
    if (!localStorage.getItem("accessToken")) {
        $("#sign-out-button").hide()
    } else {
        $("#sign-out-button").show()
    }
}
