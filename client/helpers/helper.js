const baseUrl = 'http://localhost:3000/'
const auth = () => {
  if (!localStorage.getItem("access_token")) {
    $("#sign-out-navbar").hide()
    $("#sign-in-navbar").show()
    $("#sign-up-navbar").show()
    $("#sign-up-page").hide()
    $("#sign-in-page").show()
    $("#addTodo-page").hide()
    $("#todos-table").hide()

  } else {
    $("#sign-out-navbar").show()
    $("#sign-in-navbar").hide()
    $("#sign-up-navbar").hide()
    $("#sign-up-page").hide()
    $("#sign-in-page").hide()
    $("#addTodo-page").hide()
    $("#todos-table").show()
  }
}

const signIn = () => {
  const email = $('#signInEmail').val()
  const password = $('#signInPass').val()

  $.ajax({
    url: baseUrl + 'signIn',
    method: 'POST',
    data: {
      email,
      password
    }
  })
}

module.exports = auth