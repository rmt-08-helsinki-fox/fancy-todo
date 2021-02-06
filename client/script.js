$(document).ready(() => {
  auth()
  $("#linkRegister").on("click", (e) => {
      e.preventDefault()
      showRegister()
  })
  $("#linkLogin").on("click", (e) => {
      e.preventDefault()
      auth()
  })
  $("#loginform").on("submit", (e) => {
      e.preventDefault()
      login()
  })
  $("#registerform").on("submit", (e) => {
      e.preventDefault()
      register()
  })
  $("#logout").on("click", (e) => {
      e.preventDefault()
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {
          console.log("User signed out.")
      })
      localStorage.removeItem("access_token")
      Swal.fire({
          icon: "success",
          title: "You have success logout",
          backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    `,
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500,
      })
      auth()
  })
})

const base_url = "http://localhost:3000/"

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  // didOpen: (toast) => {
  //     toast.addEventListener("mouseenter", Swal.stopTimer)
  //     toast.addEventListener("mouseleave", Swal.resumeTimer)
  // },
})

function auth() {
  if (!localStorage.getItem("access_token")) {
      $("#loginform").show()
      $("#registerform").hide()
      $("#mainpage").hide()
      $("#navbar").hide()
  } else {
      $("#loginform").hide()
      $("#registerform").hide()
      $("#mainpage").show()
      $("#navbar").show()
  }
}

function showRegister() {
  $("#loginform").hide()
  $("#registerform").show()
  $("#mainpage").hide()
  $("#navbar").hide()
}

function login() {
  const email = $("#loginemail").val()
  const password = $("#loginpassword").val()
  $.ajax({
      url: base_url + "users/login",
      method: "POST",
      data: {
          email,
          password,
      },
  })
      .done((res) => {
          localStorage.setItem("access_token", res.access_token)
          Toast.fire({
              icon: "success",
              title: "Signed in success!",
          })
          auth()
      })
      .fail((xhr, txt) => {
          console.log(xhr.responseJSON.message, "masukkkkkkkkkkk fail")
          Swal.fire({
              icon: "error",
              title: "Wrong Email or Password",
              heightAuto: false,
          })
          $("#loginform").trigger("reset")
      })
      .always((_) => {
          console.log("always")
          $("#loginform").trigger("reset")
      })
}

function register() {
  const email = $("#registeremail").val()
  const password = $("#registerpassword").val()
  console.log(email, password)
  $.ajax({
      url: base_url + "users/register",
      method: "POST",
      data: {
          email,
          password,
      },
  })
      .done((res) => {
          console.log(res)
          Toast.fire({
              icon: "success",
              title: "Register success! Meaow :3",
          })
          auth()
      })
      .fail((xhr, txt) => {
          console.log(xhr, txt)
          Swal.fire({
              icon: "error",
              title: "Email already registered, please use a different one",
              heightAuto: false,
          })
          $("#registerform").trigger("reset")
      })
      .always((_) => {
          $("#registerform").trigger("reset")
      })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  $.ajax({
      url: base_url + `users/googlelogin`,
      method: "POST",
      data: {
          google_token: id_token,
      },
  })
      .done((res) => {
        localStorage.setItem("access_token", res.access_token)
        Toast.fire({
            icon: "success",
            title: "Signed in with google success!",
        })
        auth()
      })
      .fail((xhr, txt) => {
          console.log(xhr, txt)
      })
    }