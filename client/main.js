const baseUrl = 'http://localhost:3000/'

$(document).ready(() => {
  auth()
  generateQuotes()

  setInterval(() => {
    generateQuotes()
  }, 8000)

  $('#link-signin').click(event => {
    event.preventDefault()
    generateQuotes()
    $('#signin-form').fadeIn('slow')
    $('#home-page').hide()
    $('#signup-form').hide()
  })

  $('.link-home').click(event => {
    event.preventDefault()
    generateQuotes()
    $('#signin-form').hide()
    $('#home-page').fadeIn('slow')
    $('#signup-form').hide()
  })

  $('#btn-signup').click(event => {
    event.preventDefault()
    $('#home-page').hide()
    $('#signup-form').fadeIn('slow')
  })

  $('#link-signup').click(event => {
    event.preventDefault()
    generateQuotes()
    $('#signin-form').hide()
    $('#home-page').hide()
    $('#signup-form').fadeIn('slow')
  })

  $('#signin-field').on('submit', event => {
    event.preventDefault()
    signin()
  })

  $('#link-signout').click(event => {
    event.preventDefault()
    signout()
    generateQuotes()
  })

  $('#signup-field').on('submit', event => {
    event.preventDefault()
    signup()
  })
})




function auth(params) {
  if(!localStorage.getItem('access_token')) {
    $('#signin-form').hide()
    $('#signup-form').hide()    
    $('#link-todo').hide()
    $('#link-signout').hide()
    $('#link-signin').show()
    $('#link-signup').show()
    $('#btn-signup').show()
    $('#text-home').text("Try to create your todo list today, Sign Up first if you don't have any account.")
  } else {
    $('#home-page').show()
    $('#signin-form').hide()
    $('#signup-form').hide()
    $('#link-todo').show()
    $('#link-signout').show()    
    $('#link-signin').hide()
    $('#link-signup').hide()
    $('#btn-signup').hide()
    $('#text-home').text('Click Add New to set your todo today')
    $('#btn-p').append(`<a href="#" class="btn btn-lg btn-warning fw-bold border-white text-dark" id="add-todo">Add New</a>`)
  }
}

function generateQuotes() {
  $.ajax({
    url: baseUrl,
    method: 'GET'
  })
  .done(response => {
    $('#random-quotes').empty()
    $('#label-quotes').empty()
    $('#random-quotes').html(`<i>${response.advice}</i>`)
    $('#label-quotes').html(`<i>${response.label}</i>`)
  })
  .fail((xhr, text) => {
    console.log(xhr, text)
  })
}

function signin() {
    const email = $('#signin-email').val()
    const password = $('#signin-password').val()
    $.ajax({
      url: baseUrl + 'users' + '/login',
      method: 'POST',
      data: {
        email,
        password
      }
    })
    .done(response => {
      localStorage.setItem('access_token', response.access_token)
      auth()
    })
    .fail((xhr, text) => {
      $('#error-signin').text(xhr.responseJSON.errors)
    })
    .always(_ => {
      $('#signin-field').trigger('reset')
    })
}

function signout() {
  localStorage.clear()
  $('#add-todo').remove()
  auth()
}

function signup() {
  const email = $('#signup-email').val()
  const password = $('#signup-password').val()

  $.ajax({
    url: baseUrl + 'users' + '/register',
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(response => {
    $('#signin-form').fadeIn(2000)
    $('#success-signup').text('SignUp success please sign in to continue')
    $('#signup-form').hide()
  })
  .fail((xhr, text) => {
    console.log(xhr)
  })
  .always(_ => {
      $('#signup-field').trigger('reset')
  })
}