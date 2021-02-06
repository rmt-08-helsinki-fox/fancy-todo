const serverUrl = "http://localhost:3000/";

$(document).ready(() => {
  $("#edit-todo-area").hide();
  $("#add-todo-area").hide();
  $("#register-form").hide();
  auth();
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
    handleRegister(email, password);
  });

  $("#btn-login").click((event) => {
    $("#login-form").show();
    $("#register-form").hide();
    $("#register-email").val("");
    $("#register-password").val("");
    $("#error-login").empty();
    $("#error-register").empty();
    $("#success-register").empty();
  });

  $("#btn-register").click((event) => {
    $("#login-form").hide();
    $("#register-form").show();
    $("#login-email").val("");
    $("#login-password").val("");
    $("#error-login").empty();
    $("#error-login").empty();
  });

  $("#btn-logout").click((event) => {
    localStorage.clear();
    $("#login-email").val("");
    $("#login-password").val("");
    $("#error-login").empty();
    $("#register-email").val("");
    $("#register-password").val("");
    auth();
  });

  $("#add-todo").click((event) => {
    event.preventDefault();
    $("#add-todo-area").show();
    $("#error-add").empty();
    $("#submit-add-todo").click((event) => {
      const title = $("#add-title-todo").val();
      const description = $("#add-description-todo").val();
      let due_date = $("#add-due_date-todo").val();

      let temp = due_date.split("-");
      due_date = `${temp[1]}/${temp[2]}/${temp[0]}`;

      handleAdd(title, description, due_date);
    });
  });

  $("#cancel-add-todo").click((event) => {
    event.preventDefault();
    $("#add-todo-area").hide();
    $("#error-add").empty();
  });
});

const auth = () => {
  if (localStorage.access_token) {
    $("#homepage").show();
    $("#login-form").hide();
    $("#btn-login").hide();
    $("#btn-logout").show();
    $("#btn-register").hide();
    getWeather();
    getTodos();
  } else {
    $("#homepage").hide();
    $("#login-form").show();
    $("#btn-login").show();
    $("#btn-logout").hide();
    $("#btn-register").show();
    $("#list-todo").empty();
  }
};

const getTodos = () => {
  $.ajax({
    method: "GET",
    url: serverUrl + "todos",
    headers: { access_token: localStorage.access_token },
  })
    .done((response) => {
      $("#list-todo").empty();
      $("#homepage-message-succes").empty();
      $("#homepage-message-error").empty();
      response.data.forEach((el) => {
        let status;
        if (!el.status) {
          status = "Undone";
        } else {
          status = "Done";
        }
        $("#list-todo")
          .append(`	<div class="card col-lg-4 cardTodo mx-2 my-2" style="width: 25rem;">
        <div class="card-body">
            <h5 class="card-title h3">${el.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${status}</h6>
            <p class="card-text">${el.description}</p>
            <a href="#" class="card-link btn btn-success" id="markTodo" onclick="handleUpdate(${el.id})">Mark as done</a>
            <a href="#" class="card-link btn btn-primary" id="updateTodo" onclick="handleEdit(${el.id})">Edit</a>
            <a href="#" class="card-link btn btn-danger" id="deleteTodo"  onclick="handleDelete(${el.id})">Delete</a>
        </div>
        
    </div>`);
      });
    })
    .fail((err) => {
      $("#homepage-message-error").empty();
      $("#homepage-message-error").append(`<p>Internal Server Error</p>`);
    });
};

const getWeather = () => {
  let latitude, longitude;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      $.ajax({
        method: "POST",
        url: serverUrl + "weather",
        headers: { access_token: localStorage.access_token },
        data: { latitude, longitude },
      })
        .done((response) => {
          let weatherCurrent = response.weatherCurrent;
          let weatherLoc = response.weatherLoc;
          $("#weather-area").empty();
          $("#weather-area").append(`
  <div class="weather-card">
    <div class="weather-card-header">
      <img src="${weatherCurrent.weather_icons[0]}" alt="icon">
      <div id="weather-region">
        <h4 id="weather-location">${weatherLoc.region}</h4>
        <div>${weatherLoc.localtime}</div>
      </div>
    </div>
    <h1 id="weather-temperature">${weatherCurrent.temperature}&deg;</h1>
    <div id="weather-detail">
      <div id="weather-detail1">
        <div id="weather-cloudcover">
          <h6>Cloudcover</h6>
          <h6>${weatherCurrent.cloudcover}</h6>
        </div>
      </div>
    </div>
  </div>
  `);
        })
        .fail((err) => {
          $("#homepage-message-error").empty();
          $("#homepage-message-error").append(`<p>Internal Server Error</p>`);
        });
    });
  }
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
      localStorage.setItem("access_token", respone.access_token);
      auth();
    })
    .fail((error) => {
      $("#error-login").text(error.responseJSON.error);
    })
    .always(() => {
      $("#login-form").trigger("reset");
    });
};

const handleAdd = (title, description, due_date) => {
  $.ajax({
    method: "POST",
    url: serverUrl + "todos",
    headers: { access_token: localStorage.access_token },
    data: { title, description, due_date },
  })

    .done((response) => {
      $("#add-todo-area").hide();
      $("#homepage-message-succes").empty();
      $("#homepage-message-succes").append("<p>Todo Created</p>");
    })
    .fail((err) => {
      err.responseJSON.errors.forEach((el) => {
        $("#error-add").empty();
        $("#error-add").append(`<p>${el}</p>`);
      });
    })
    .always(() => {
      $("#add-title-todo").val("");
      $("#add-description-todo").val("");
      $("#add-due_date-todo").val("");
      setTimeout(function () {
        auth();
      }, 1000);
    });
};

const handleDelete = (id) => {
  $.ajax({
    method: "DELETE",
    url: serverUrl + `todos/${id}`,
    headers: { access_token: localStorage.access_token },
  })
    .done((response) => {
      $("#homepage-message-succes").append("<p>Todo Deleted</p>");
    })
    .fail((err) => {
      $("#homepage-message-error").empty();
      $("#homepage-message-error").append(`<p>Internal Server Error</p>`);
    })
    .always((_) => {
      setTimeout(function () {
        auth();
      }, 1000);
    });
};

const handleUpdate = (id) => {
  $.ajax({
    method: "PATCH",
    url: serverUrl + `todos/${id}`,
    headers: { access_token: localStorage.access_token },
  })
    .done((response) => {
      $("#homepage-message-succes").append("<p>Todo is done</p>");
    })
    .fail((err) => {
      $("#homepage-message-error").append(`<p>Internal Server Error</p>`);
    })
    .always(() => {
      setTimeout(function () {
        auth();
      }, 1000);
    });
};

const handleEdit = (id) => {
  let todoId = id;
  $("#edit-todo-area").show();

  $(`#submit-edit-todo`).click((event) => {
    event.preventDefault();
    $("#error-edit").empty();
    const title = $("#edit-title-todo").val();
    const description = $("#edit-description-todo").val();
    let due_date = $("#edit-due_date-todo").val();

    let temp = due_date.split("-");
    due_date = `${temp[1]}/${temp[2]}/${temp[0]}`;

    $.ajax({
      method: "PUT",
      url: serverUrl + `todos/${todoId}`,
      data: { title, description, due_date },
      headers: { access_token: localStorage.access_token },
    })
      .done((response) => {
        $("#edit-todo-area").hide();
        $("#error-edit").empty();
        $("#homepage-message-succes").append("<p>Todo's Updated</p>");
      })
      .fail((err) => {
        err.responseJSON.errors.forEach((error) => {
          $("#error-edit").append(error + "<br>");
        });
      })
      .always((_) => {
        $("#edit-title-todo").val("");
        $("#edit-description-todo").val("");
        $("#edit-due_date-todo").val("");
        setTimeout(function () {
          auth();
        }, 1000);
      });
  });

  $("#cancel-edit-todo").click((event) => {
    event.preventDefault();
    $("#error-edit").empty();
    $("#edit-todo-area").hide();
  });
};

// GOOGLE
function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: serverUrl + "google-signin",
    data: { id_token },
  })
    .done((response) => {
      localStorage.setItem("access_token", response.access_token);
      auth();
    })
    .fail((err) => {
      $("#homepage-message-error").empty();
      $("#homepage-message-error").append(`<p>Internal Server Error</p>`);
    });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}
