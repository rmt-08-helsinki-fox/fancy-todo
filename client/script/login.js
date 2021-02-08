// login ===========================================================
$("#login-btn").click(function (event) {
  event.preventDefault();
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  $.ajax({
    method: "POST",
    url: `${baseUrl}/login`,
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      localStorage.setItem("access_token", response.access_token);
      successLogin();
      auth();
    })
    .fail((jqXHR, textStatus) => {
      Swal.fire({
        icon: "error",
        title: `${jqXHR.responseJSON.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    })
    .always(() => {
      email = $("#login-email").val("");
      password = $("#login-password").val("");
    });
});

function successLogin() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: "Log in successfully",
  });
}

// logout========================================================
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}

$("#logout-btn").click(function (event) {
  event.preventDefault();
  localStorage.clear();
  signOut();
  auth();
});
