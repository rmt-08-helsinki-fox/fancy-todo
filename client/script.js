const base_url = "https://sul-fancy-todo.herokuapp.com/";

// jQuery
$(document).ready(() => {
  auth();

  // Button Submit
  $("#register").on("submit", (e) => {
    e.preventDefault();
    register();
  });

  $("#login").on("submit", (e) => {
    e.preventDefault();
    login();
  });

  $("#addTodo").on("submit", (e) => {
    e.preventDefault();
    createTodo();
  });

  // Anchor
  $("#link-login").click((e) => {
    e.preventDefault();
    showLogin();
  });
  $("#link-register").click((e) => {
    e.preventDefault();
    showRegis();
  });
  $("#link-logout").click((e) => {
    e.preventDefault();
    logout();
  });
  $("#link-addTodo").click((e) => {
    e.preventDefault();
    showTodoForm();
  });
  $("#link-back").click((e) => {
    e.preventDefault();
    auth();
  });
});

// Auth
function auth() {
  if (!localStorage.getItem("access_token")) {
    $("#link-login").show(500);
    $("#link-register").show(500);
    $("#logo-homepage").show(500);
    $("#link-logout").hide(500);
    $("#link-back").hide(500);
    $("#form-register").hide(500);
    $("#form-login").hide(500);
    $("#todo-table").hide(500);
    $("#form-add-todo").hide(500);
    $("#form-update-todo").hide(500);
  } else {
    $("#img").empty();
    $("#list-todo").empty();
    $("#list-update").empty();
    $("#empty-message").remove();
    $("#logo-homepage").hide(500);
    $("#form-register").hide(500);
    $("#form-login").hide(500);
    $("#link-logout").show(500);
    $("#link-back").hide(500);
    $("#link-login").hide(500);
    $("#link-register").hide(500);
    $("#todo-table").show(500);
    if (!localStorage.getItem("url_img")) {
      $("#img").empty();
    } else {
      $("#img").append(
        `<img src="${localStorage.getItem(
          "url_img"
        )}"class="card-img-top" alt="status weather" style="width: 2rem;">`
      );
    }
    $("#form-add-todo").hide(500);
    $("#form-update-todo").hide(500);
    getListTodo();
  }
}

// Register
function register() {
  const email = $("#regisEmail").val();
  const password = $("#regisPass").val();
  const location = $("#regisLocation").val();
  $.ajax({
    url: base_url + "/users/register",
    method: "POST",
    data: {
      email,
      password,
      location,
    },
  })
    .done((response) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account created",
        showConfirmButton: false,
        timer: 1000,
      });
      showLogin();
    })
    .fail((xhr, text) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Must be filled",
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(xhr, text);
    })
    .always(() => {
      $("#register").trigger("reset");
    });
}

// Login
function login() {
  const email = $("#loginEmail").val();
  const password = $("#loginPass").val();
  $.ajax({
    url: base_url + "/users/login",
    method: "POST",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      localStorage.setItem("url_img", response.weather.url_img[0]);
      localStorage.setItem("access_token", response.access_token);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Succes login",
        showConfirmButton: false,
        timer: 1000,
      });

      auth();
    })
    .fail((xhr, text) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Wrong email or password",
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(xhr, text);
    })
    .always(() => {
      $("#login").trigger("reset");
    });
}

// HTTP Request
function getListTodo() {
  $.ajax({
    url: base_url + "/todos",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done(({ todos }) => {
      if (todos.length > 0) {
        todos.forEach((el, i) => {
          $("#list-todo").append(`
                <tr class="table-info" >
                  <td>${i + 1}</td>
                  <td>${el.title}</td>
                  <td>${el.description}</td>
                  <td>${el.status}</td>
                  <td>${el.due_date}</td>
                  <td>
                     <a class="btn btn-primary" onclick="remove(${
                       el.id
                     })" href="#">Delete</a>
                     <a class="btn btn-primary" onclick="show(${
                       el.id
                     })" href="#">Update</a>
                     <a class="btn btn-primary" onclick="complete(${
                       el.id
                     })" href="#">Complete</a>
                  </td>
                </tr>
                `);
        });
      } else {
        $("#todo-table").append(
          `<h4 class="text-center" id="empty-message">Todo Data is Empty</h4>`
        );
      }
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    });
}

function createTodo() {
  const title = $("#todoTitle").val();
  const description = $("#todoDesc").val();
  const status = $("#todoStatus").val();
  const due_date = $("#todoDueDate").val();

  $.ajax({
    url: base_url + "/todos",
    method: "POST",
    data: {
      title,
      description,
      status,
      due_date,
    },
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((response) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success create a ToDo",
        showConfirmButton: false,
        timer: 1000,
      });
      $("#img").empty();
      $("#list-todo").empty();
      auth();
    })
    .fail((xhr, text) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Title and Due Date must be filled",
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(xhr, text);
    })
    .always(() => {
      $("#addTodo").trigger("reset");
    });
}

function remove(id) {
  $.ajax({
    url: base_url + "/todos/" + id,
    method: "DELETE",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Todo has been deleted",
        showConfirmButton: false,
        timer: 1000,
      });
      auth();
    })
    .fail((xhr, text) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Not authorized",
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(xhr, text);
    });
}

function update(id) {
  const title = $("#updateTitle").val();
  const description = $("#updateDesc").val();
  const status = $("#updateStatus").val();
  const todoId = id;

  $.ajax({
    url: base_url + "/todos/" + id,
    method: "PUT",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
    data: {
      title,
      description,
      status,
    },
  })
    .done((response) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your todo has been updated",
        showConfirmButton: false,
        timer: 1000,
      });
      auth();
    })
    .fail((xhr, text) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Title must be filled",
        showConfirmButton: false,
        timer: 1000,
      });
      show(todoId);
      console.log(xhr, text);
    })
    .always(() => {
      $("#list-update").empty();
    });
}

function show(id) {
  $("#todo-table").hide(500);
  $.ajax({
    url: base_url + "/todos/" + id,
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((todo) => {
      $("#list-update").append(`
        <h3 class="text-justify">Update Todo</h3>
        <form class="row g-2" id="updateTodo">
        <div class="form-floating mb-2">
        <label class="bg-secondary d-block text-center text-white">Title</label>
        <input 
          type="text"
          class="form-control"
          id="updateTitle"
          value="${todo.title}"/>
        </div>
        <div class="form-floating mb-2">
        <label class="bg-secondary d-block text-center text-white">Description</label>
        <input
          type="text"
          class="form-control"
          id="updateDesc"
          value="${todo.description}"/>
        </div>
        <div class="form-floating mb-2">
        <label class="bg-secondary d-block text-center text-white">Status</label>
        <input
          type="text"
          class="form-control"
          id="updateStatus"
          value="${todo.status}"/>
        </div>
        <div class="col-6">
        <div class="col-12">
        <button 
          type="submit"
          class="btn btn-primary btn-block btn-floating mb-2"
          id="btn-addTodo"
          onclick="update(${todo.id})">Update</button>
        </div>
        </form>
        `);
    })
    .fail((xhr, text) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Not authorized",
        showConfirmButton: false,
        timer: 1000,
      });
      auth();
      console.log(xhr, text);
    });
  $("#form-update-todo").show(1000);
  $("#link-back").show(500);
}

function complete(id) {
  $.ajax({
    url: base_url + "/todos/" + id,
    method: "PATCH",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your ToDo finished",
        showConfirmButton: false,
        timer: 1000,
      });
      auth();
    })
    .fail((xhr, text) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Not authorized",
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(xhr, text);
    });
}

// Other Function
function showLogin() {
  $("#link-register").show();
  $("#form-register").hide(500);
  $("#form-login").show(1500);
}

function showRegis() {
  $("#link-login").show();
  $("#form-login").hide(500);
  $("#form-register").show(1500);
}

function logout() {
  $("#img").empty();
  localStorage.clear();
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Success logout",
    showConfirmButton: false,
    timer: 1000,
  });
  auth();
}

function showTodoForm() {
  $("#todo-table").hide(500);
  $("#form-add-todo").show(1000);
  $("#link-back").show(500);
}

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log(profile, "<<<<<<<<<<<<<<<<");
  // console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log("Name: " + profile.getName());
  // console.log("Image URL: " + profile.getImageUrl());
  // console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: base_url + "/users/loginOAuth",
    method: "POST",
    data: {
      googleToken: id_token,
    },
  })
    .done((response) => {
      localStorage.setItem("access_token", response.access_token);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success login",
        showConfirmButton: false,
        timer: 1000,
      });
      auth();
    })
    .fail((xhr, text) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error login",
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(xhr, text);
    });
}
