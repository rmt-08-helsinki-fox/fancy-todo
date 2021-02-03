const serverUrl = "http://localhost:3000/";

$("#submit-login").click((event) => {
  event.preventDefault();
  const email = $("#login-email").val();
  const password = $("#login-password").val();
  handleLogin(email, password);
});

$("#submit-register").click((event) => {
  event.preventDefault();
  const email = $("#register-email").val();
  const password = $("#register-password").val();
  const city = $("#register-city").val();
  handleRegister(email, password, city);
});

$("#btn-login").click((event) => {
  $("#login-form").show();
  $("#register-form").hide();
});

$("#btn-register").click((event) => {
  $("#login-form").hide();
  $("#register-form").show();
});

$("#btn-logout").click((event) => {
  localStorage.clear();
  $("#login-email").val("");
  $("#login-password").val("");
  $("#error-login").empty();
  auth();
});

const getTodos = () => {
  $.ajax({
    method: "GET",
    url: serverUrl + "todos",
    headers: { token: localStorage.token },
  })
    .done((respone) => {
      console.log(respone);

      respone.data.forEach((el) => {
        let status;
        if (!el.status) {
          status = "Undone";
        } else {
          status = "Done";
        }

        $("#list-todo").append(`	<div class="card" style="width: 20rem;">
        <div class="card-body">
            <h5 class="card-title">${el.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">Sf the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
            <a href="#" class="card-link">Another link</a>
        </div>

    </div>`);
      });
    })
    .fail((err) => {
      console.log("bbbbbbbb");
      console.log(err);
    })
    .always(() => {
      //
    });
};

const handleRegister = (email, password, city) => {
  $.ajax({
    method: "POST",
    url: `${serverUrl}register`,
    data: { email, password, city },
  })
    .done((respone) => {
      $("#success-register").text(`${respone.message}`);
    })
    .fail((err) => {
      console.log(err);
      $("#error-register").text(err.responseJSON.errors[0]);
    })
    .always(() => {
      $("#register-form").trigger("reset");
    });
};

const handleLogin = (email, password) => {
  $.ajax({
    method: "POST",
    url: `${serverUrl}login`,
    data: { email, password },
  })
    .done((respone) => {
      localStorage.setItem("token", respone.token);
      auth();
    })
    .fail((error) => {
      $("#error-login").text(error.responseJSON.error);
    })
    .always(() => {
      $("#login-form").trigger("reset");
    });
};

const auth = () => {
  if (localStorage.token) {
    $("#homepage").show();
    $("#login-form").hide();
    $("#btn-login").hide();
    $("#btn-logout").show();
    $("#btn-register").hide();
    getTodos();
  } else {
    $("#homepage").hide();
    $("#login-form").show();
    $("#btn-login").show();
    $("#btn-logout").hide();
    $("#btn-register").show();
  }
};

$(document).ready(() => {
  $("#register-form").hide();
  auth();
});
