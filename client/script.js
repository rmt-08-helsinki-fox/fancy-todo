
$(document).ready(function () {
  if (!localStorage.access_token) {
    logedOut()
  } else {
    logedIn()
  }
})

function logedOut () {
  $('#toLogin-btn').show()
  $('#toLogout-btn').hide()
  $('.login').show()
  $('.regis').hide()

  $('#toLogin-btn').click(event => {
    event.preventDefault()
    $('.login').show()
    $('.regis').hide()
  })

  $('#toRegis-btn').click(event => {
    event.preventDefault()
    $('.login').hide()
    $('.regis').show()
  })

  $('#login-btn').click(event => {
    event.preventDefault()
  })
}

function logedIn () {
  $('#toLogin-btn').hide()
  $('#toLogout-btn').show()
  $('.login').hide()
  $('.regis').hide()

  $('#toLogout-btn').click(event => {
    event.preventDefault()
    localStorage.removeItem('access_token')
    logedOut()
  })
}