$(document).ready(() => {
  $("#logout-nav").on("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    auth()
  })

  $("#setting-nav").on("click", (e) => {
    e.preventDefault()
    $("#modal-setting").show()
  })
})