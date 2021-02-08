$("#register-btn").click(function (event) {
  event.preventDefault();
  let username = $("#register-username").val();
  let email = $("#register-email").val();
  let password = $("#register-password").val();

  $.ajax({
    method: "POST",
    url: `${baseUrl}/register`,
    data: {
      username,
      email,
      password,
    },
  })
    .done((respose) => {
      $("#register").hide();
      $("#login").fadeIn();
    })
    .fail((jqXHR, textStatus) => {
      let err = jqXHR.responseJSON;
      err.forEach((el) => {
        Swal.fire({
          icon: "error",
          title: `${el.message}`,
          showConfirmButton: false,
          timer: 3000,
        });
      });
    })
    .always(() => {
      $("#register-username").val("");
      $("#register-email").val("");
      $("#register-password").val("");
    });
});
