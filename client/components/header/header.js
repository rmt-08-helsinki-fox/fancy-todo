//@ts-check
$("#sign-out-button").click((e) => {
    e.preventDefault()
    logout()
    auth()
    $("#main").load("./pages/sign-in/sign-in.html")
})

auth()

// ? FUNCTION HEADER SIGN-OUT
function logout() {
    localStorage.removeItem("accessToken")
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
        console.log("User signed out.")
        auth()
    })
}
