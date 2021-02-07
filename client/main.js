const baseUrl = "http://localhost:3000/"
const btnRegister = $(".btn-register")
const btnLogin = $(".btn-login")
const btnLogout = $(".btn-logout")
const formRegister = $("#register-form")
const formLogin = $("#form-login")
const home = $(".home")
const homeAfter = $("#home-after-login")
const addTodo = $("#add-todo")
const submitRegister = $("#register-submit")
const submitLogin = $("#login-submit")
const btnAddTodo = $("#add-todo")

$(document).ready(() => {
    auth()
})

btnRegister.click(() => {
    pageRegister()
})

btnLogin.click(() => {
    pageLogin()
})

btnAddTodo.click(() => {
  getTodo()
})

btnLogout.click(() => {
  logout()
})

function hideFuture() {
    btnRegister.hide()
    btnLogin.hide()
    btnLogout.hide()
    home.hide()
    addTodo.hide()
    formLogin.hide()
    formRegister.hide()
    homeAfter.hide()
}

function pageRegister() {
  hideFuture()
  formRegister.show()
  home.show()
  btnLogin.show()
  
  submitRegister.off('click').on('click', (event) => {
    event.preventDefault()
    data = {
      email: $("#email-regis").val(),
      password: $("#password-regis").val()
    }
    handleRegister(data)
  })
}

function handleRegister(data) {
  // console.log(data, '<<<<<<<<');
  $.ajax({
    method: 'POST',
    url: `${baseUrl}register`,
    data
  })
  .done(() => {
    formRegister.trigger('reset')
    pageLogin()
  })
  .fail(err => {
    console.log(err, `error register from ajax`);
  })
  .always(() => {
    $("#email").val('')
    $("#password").val('')
  })

}

function pageLogin() {
    hideFuture()
    home.show()
    formLogin.show()
    btnRegister.show()
    homeAfter.hide()

    submitLogin.off('click').on('click', (event) => {
      event.preventDefault()
      data = {
        email: $("#login-email").val(),
        password: $("#login-password").val()
      }
      handleLogin(data)
    })
}

function handleLogin(data) {
  $.ajax({
    method: 'POST',
    url: `${baseUrl}login`,
    data
  })
  .done(res => {
    // console.log(res, '<<<<<');
    localStorage.setItem('access_token', res.access_token)
    formLogin.trigger('reset')
    auth()
  })
  .fail(err => {
    console.log(err, `error login from ajax`);
  })
  .always(() => {
    $("#login-email").val('')
    $("#login-password").val('')
  })
}

// function onSignIn(googleUser) {
//   const id_token = googleUser.getAuthResponse().id_token
//   // console.log(id_token);
//   $.ajax({
//     method: 'POST',
//     url: `${baseUrl}googlelogin`,
//     data:{
//       id_token
//     }
//   })
//   .done(res => {
//     localStorage.setItem('access_token', res.access_token)
//     auth()
//   })
//   .fail(err =>{
//     console.log(`${err},error google login from ajax`);
//   })
//   .always(() => {
//     console.log(`di always`);
//   })
// }

function getTodo() {

}

function auth() {
  if(localStorage.getItem('access_token')) {
    mainPage()
  } else {
    pageLogin()
  }
}

function logout() {
  localStorage.clear()
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    console.log(`User logout from the app.`);
  })
  pageLogin()
}

function mainPage() {
  hideFuture()
  btnLogout.show()
  addTodo.show()
  homeAfter.show()
}



