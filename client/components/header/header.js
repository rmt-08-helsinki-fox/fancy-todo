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

$("#suprise-cat-button").click((e) => {
    e.preventDefault()
    getRandomCatBreeds()
})

showingNarBar()

function showingNarBar() {
    if (!localStorage.getItem("accessToken")) {
        $("#sign-out-button").hide()
        $("#suprise-cat-button").hide()
    } else {
        $("#sign-out-button").show()
        $("#suprise-cat-button").show()
    }
}

// ? FUNCTION HEADER SIGN-OUT
function logout() {
    localStorage.removeItem("accessToken")
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
        console.log("User signed out.")
    })
}

const cat_breeds = document.getElementById("cat_breed")
async function getRandomCatBreeds() {
    try {
        const response = await axios({
            url: base_url + `cat-pictures`,
            method: "get",
        })
        // console.log(response)
        Swal.fire({
            heightAuto: false,
            title: `${response.data.breed}`,
            html: `
            Something for you to get started on your to do! <br>
            Hope it will cheer you up! :3
            `,
            imageUrl: `${response.data.imgUrl}`,
            imageAlt: "Custom image",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            showCloseButton: true,
        })
    } catch (err) {
        throw err.message
    }
}
