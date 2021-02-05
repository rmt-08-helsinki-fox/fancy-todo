//@ts-check
$("#sign-out-button").click((e) => {
    e.preventDefault()
    logout()
    auth()
    Swal.fire({
        icon: "success",
        title: "You have success logout",
        heightAuto: false,
        showConfirmButton: false,
        timer: 1500,
    })
    $("#main").load("./pages/sign-in/sign-in.html")
})

auth()

// ? FUNCTION HEADER SIGN-OUT
function logout() {
    localStorage.removeItem("accessToken")
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
        console.log("User signed out.")
    })
}
