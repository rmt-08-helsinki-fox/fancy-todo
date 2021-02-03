const baseUrl = "http://localhost:3000"

$(document).ready(function () {
  checkAuth()
})

function checkAuth() {
  if (localStorage.access_token) {
    $(`#navbar`).show()
    $(`#todolist-page`).show()
    $(`#register-page`).hide()
    $(`#login-page`).hide()
  } else {
    $(`#navbar`).hide()
    $(`#todolist-page`).hide()
    $(`#register-page`).hide()
    $(`#login-page`).show()
  }
}

function showFormRegister() {
  $(`#register-page`).show()
  $(`#login-page`).hide()
  $(`#regis-fullname`).val('')
  $(`#regis-email`).val('')
  $(`#regis-password`).val('')
}

function showFormLogin() {
  $(`#register-page`).hide()
  $(`#login-page`).show()
}

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: `POST`,
    url: `${baseUrl}/user/loginGoogle`,
    data: { id_token }
  })
  .done( response => {
    localStorage.setItem(`access_token`,response.access_token)
    checkAuth()
  })
  .fail(err => {
    alert({message : err.msg});
  })
  .always(() => {
    $(`#login-email`).val('')
    $(`#login-password`).val('')
  })
}

$(`#btn-register`).click((event) => {
  event.preventDefault()
  var fullname = $(`#regis-fullname`).val()
  var email = $(`#regis-email`).val()
  var password = $(`#regis-password`).val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/user/register`,
    data: {
      fullname,
      email,
      password
    }
  })
    .done( response => {
      showFormLogin()
      checkAuth()
    })
    .fail( err => {
      alert({message : err.message})
    })
    .always( () => {
      $(`#regis-email`).val('')
      $(`#regis-fullname`).val('')
      $(`#regis-password`).val('')
      $(`#login-email`).val('')
      $(`#login-password`).val('')
    })
})

$(`#btn-login`).click((event) => {
  event.preventDefault()
  var email = $(`#login-email`).val()
  var password = $(`#login-password`).val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/user/login`,
    data: {
      email,
      password
    }
  })
    .done(response => {
      localStorage.setItem(`access_token`, response.access_token)
      checkAuth()
    })
    .fail( err => {
      alert({message: err.message})
    })
    .always( () => {
      $(`#login-email`).val('')
      $(`#login-password`).val('')
    })
})

$(`#btn-logout`).click((event) => {
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  checkAuth()
})

$(`#link-login`).click((event) => {
  event.preventDefault()
  showFormLogin()
})

$(`#link-register`).click((event) => {
  event.preventDefault()
  showFormRegister()
})