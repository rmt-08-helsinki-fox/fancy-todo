$(document).ready(() => {
  $("#home-nav").on("click", (e) => {
    e.preventDefault()
    $("#home").show()
  })

  $("#logout-nav").on("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    auth()
  })

  $("#edit-user-nav").on("click", (e) => {
    e.preventDefault()
    getProfile()
    $("#title-sign").text("Edit Profile")
    $("#register").show()
    $("#inputNama").show()
    $("#inputPassword").show()
    $("#inputCity").show()
    $("#email-section-input").show()
    $("#inputEmail").prop("disabled", true)
    $("#home").hide()
    $("#direct-login").hide()
  })
})